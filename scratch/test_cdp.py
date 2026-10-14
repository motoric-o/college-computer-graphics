import subprocess, time, json, urllib.request, socket, base64, os, sys

def main():
        edge_path = r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
        proc = subprocess.Popen([
            edge_path,
            '--headless=new',
            '--remote-debugging-port=9222',
            '--disable-gpu',
            '--no-sandbox',
            'http://localhost:8085/Pertemuan%205/T05_2472041/T05_2472041_03/index.html'
        ])
        
        print('Started Edge PID:', proc.pid)
        try:
            # Wait for debugging port
            time.sleep(1.5)
            tabs = json.loads(urllib.request.urlopen('http://localhost:9222/json').read())
            target = None
            for t in tabs:
                if 'T05_2472041_03' in t.get('url', ''):
                    target = t
                    break
            
            if not target:
                print('Could not find target tab. Tabs:', tabs)
                return

            ws_url = target['webSocketDebuggerUrl']
            print('WS URL:', ws_url)
            
            path = ws_url.split('localhost:9222')[1]
            
            s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            s.connect(('localhost', 9222))
            
            key = base64.b64encode(os.urandom(16)).decode('ascii')
            handshake = (
                f"GET {path} HTTP/1.1\r\n"
                f"Host: localhost:9222\r\n"
                f"Upgrade: websocket\r\n"
                f"Connection: Upgrade\r\n"
                f"Sec-WebSocket-Key: {key}\r\n"
                f"Sec-WebSocket-Version: 13\r\n\r\n"
            )
            s.sendall(handshake.encode())
            resp = s.recv(4096)
            print('Handshake response status:', resp.split(b'\r\n')[0].decode())
            
            msg_id = 1
            def send_cmd(method, params=None):
                nonlocal msg_id
                cmd = {'id': msg_id, 'method': method}
                if params:
                    cmd['params'] = params
                msg_id += 1
                payload = json.dumps(cmd).encode('utf-8')
                frame = bytearray()
                frame.append(0x81)
                length = len(payload)
                if length <= 125:
                    frame.append(0x80 | length)
                elif length <= 65535:
                    frame.append(0x80 | 126)
                    frame.extend(length.to_bytes(2, 'big'))
                else:
                    frame.append(0x80 | 127)
                    frame.extend(length.to_bytes(8, 'big'))
                mask = os.urandom(4)
                frame.extend(mask)
                masked_payload = bytes(b ^ mask[i % 4] for i, b in enumerate(payload))
                frame.extend(masked_payload)
                s.sendall(frame)
                return msg_id - 1

            def recv_msg(timeout=2.0):
                s.settimeout(timeout)
                try:
                    hdr = s.recv(2)
                    if not hdr or len(hdr) < 2:
                        return None
                    length = hdr[1] & 0x7F
                    if length == 126:
                        length = int.from_bytes(s.recv(2), 'big')
                    elif length == 127:
                        length = int.from_bytes(s.recv(8), 'big')
                    data = bytearray()
                    while len(data) < length:
                        chunk = s.recv(length - len(data))
                        if not chunk: break
                        data.extend(chunk)
                    return json.loads(data.decode('utf-8'))
                except Exception as e:
                    return None

            # Enable Runtime, Console, Debugger
            send_cmd('Runtime.enable')
            send_cmd('Console.enable')
            send_cmd('Debugger.enable')
            
            print('Testing shooting towards (495, 315)...')
            test_script = '''
            (async function() {
                let canvas = document.querySelector("#mycanvas");
                
                function fire(type, x, y) {
                    let evt = new MouseEvent(type, {
                        clientX: canvas.getBoundingClientRect().left + x,
                        clientY: canvas.getBoundingClientRect().top + y,
                        bubbles: true
                    });
                    Object.defineProperty(evt, 'offsetX', { get: () => x });
                    Object.defineProperty(evt, 'offsetY', { get: () => y });
                    canvas.dispatchEvent(evt);
                }

                // Aim towards (495, 315) like in user's screenshot
                fire('mousemove', 495, 315);
                
                // Shoot 8 bullets with 180ms delay
                for (let i = 0; i < 8; i++) {
                    console.log(`SHOOT #${i}`);
                    fire('click', 495, 315);
                    await new Promise(r => setTimeout(r, 180));
                }
                
                // wait 3 seconds to see if bullets reach right wall and freeze
                console.log('Waiting 3000ms for bullets to impact wall...');
                await new Promise(r => setTimeout(r, 3000));
                console.log('SUCCESS: All bullets processed without freeze!');
                return "ALL_DONE";
            })()
            '''
            cmd_id = send_cmd('Runtime.evaluate', {'expression': test_script, 'awaitPromise': True, 'returnByValue': True})
            
            # Wait 3 seconds, then PAUSE debugger to catch the freeze!
            time.sleep(3.0)
            print('Sending Debugger.pause to catch the freeze...')
            send_cmd('Debugger.pause')
            
            start_t = time.time()
            while time.time() - start_t < 10:
                m = recv_msg(0.5)
                if m:
                    if m.get('method') == 'Debugger.paused':
                        print('=== CAPTURED FREEZE IN DEBUGGER! ===')
                        frames = m['params'].get('callFrames', [])
                        for i, f in enumerate(frames[:10]):
                            loc = f.get('location', {})
                            print(f"  Frame #{i}: {f.get('functionName')} @ {f.get('url')}:{loc.get('lineNumber')}:{loc.get('columnNumber')}")
                        
                        # Evaluate on Frame #1 (floodFill / boundaryFill)
                        if len(frames) > 1:
                            frame_id = frames[1]['callFrameId']
                            eval_expr = '''({
                                coordinate: coordinate,
                                stack_len: typeof stack !== "undefined" ? stack.length : null,
                                visited_count: typeof visited_count !== "undefined" ? visited_count : null,
                                dot: typeof dot !== "undefined" ? dot : null
                            })'''
                            eval_id = send_cmd('Debugger.evaluateOnCallFrame', {
                                'callFrameId': frame_id,
                                'expression': eval_expr,
                                'returnByValue': True
                            })
                            while True:
                                eval_res = recv_msg(2.0)
                                if not eval_res: break
                                if eval_res.get('id') == eval_id:
                                    print('eval_res raw:', json.dumps(eval_res, indent=2))
                                    break

                        send_cmd('Debugger.resume')
                        break
                    elif m.get('method') == 'Console.messageAdded':
                        print('Console:', m['params']['message']['text'])
                    elif 'method' in m and m['method'] == 'Runtime.consoleAPICalled':
                        print('Console API:', [a.get('value') for a in m['params']['args']])
        finally:
            proc.terminate()

if __name__ == '__main__':
    main()
