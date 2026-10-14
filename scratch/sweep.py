import urllib.request, json, time, subprocess, socket, base64, os

edge_path = r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
proc = subprocess.Popen([
    edge_path,
    '--headless=new',
    '--remote-debugging-port=9222',
    '--disable-gpu',
    '--no-sandbox',
    'http://localhost:8085/Pertemuan%205/T05_2472041/T05_2472041_03/index.html'
])

time.sleep(1.5)
try:
    tabs = json.loads(urllib.request.urlopen('http://localhost:9222/json').read())
    target = [t for t in tabs if 'T05_2472041_03' in t.get('url', '')][0]
    path = target['webSocketDebuggerUrl'].split('localhost:9222')[1]

    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.connect(('localhost', 9222))

    key = base64.b64encode(os.urandom(16)).decode('ascii')
    handshake = f'GET {path} HTTP/1.1\r\nHost: localhost:9222\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Key: {key}\r\nSec-WebSocket-Version: 13\r\n\r\n'
    s.sendall(handshake.encode())
    resp = s.recv(4096)

    global msg_id
    msg_id = 1
    def send_cmd(method, params=None):
        global msg_id
        cmd = {'id': msg_id, 'method': method}
        if params: cmd['params'] = params
        msg_id += 1
        payload = json.dumps(cmd).encode('utf-8')
        frame = bytearray([0x81])
        length = len(payload)
        if length <= 125: frame.append(0x80 | length)
        elif length <= 65535:
            frame.append(0x80 | 126)
            frame.extend(length.to_bytes(2, 'big'))
        else:
            frame.append(0x80 | 127)
            frame.extend(length.to_bytes(8, 'big'))
        mask = os.urandom(4)
        frame.extend(mask)
        frame.extend(b ^ mask[i % 4] for i, b in enumerate(payload))
        s.sendall(frame)
        return msg_id - 1

    send_cmd('Console.enable')
    send_cmd('Runtime.enable')

    test_code = '''
    (async function() {
        let canvas = document.querySelector('#mycanvas');
        let ctx = canvas.getContext('2d');
        let { GameObject } = await import('../../../lib/engine/object.js');
        let { graphicsLib } = await import('../../../lib/graphics/graphicsLib.js');
        let GrafLib = new graphicsLib(ctx, canvas);
        
        let angle = -18.8247 * Math.PI / 180;
        let cos_a = Math.cos(angle);
        let sin_a = Math.sin(angle);
        
        for (let x = 490; x <= 505; x += 0.25) {
            let y = 465 + (x - 55) * (sin_a / cos_a);
            console.log(`SWEEP_STEP x=${x.toFixed(2)}, y=${y.toFixed(2)}`);
            GrafLib.refreshScreen();
            
            let bullet = new GameObject()
                .setName('bullet')
                .setVertices([GrafLib.Util.Vector2(0, 0)])
                .setRadius(5)
                .setColor(GrafLib.Util.Color(255, 0, 0))
                .setLocalAnchor(GrafLib.Util.Vector2(x, y))
                .setPosition(GrafLib.Util.Vector2(x, y))
                .setFills([
                    GrafLib.Coloring.createFillInfo('BF', [GrafLib.Util.Color(255, 0, 0), GrafLib.Util.Color(255, 0, 0)], GrafLib.Util.Vector2(0, 0))
                ]);
                
            let t0 = performance.now();
            bullet.draw(GrafLib);
            let dt = performance.now() - t0;
            console.log(`  COMPLETED x=${x.toFixed(2)} in ${dt.toFixed(1)}ms`);
        }
        console.log('SWEEP_FINISHED');
        return "DONE";
    })()
    '''
    cmd_id = send_cmd('Runtime.evaluate', {'expression': test_code, 'awaitPromise': True, 'returnByValue': True})

    def recv_msg():
        s.settimeout(3.0)
        hdr = s.recv(2)
        length = hdr[1] & 0x7F
        if length == 126: length = int.from_bytes(s.recv(2), 'big')
        elif length == 127: length = int.from_bytes(s.recv(8), 'big')
        data = bytearray()
        while len(data) < length:
            chunk = s.recv(length - len(data))
            if not chunk: break
            data.extend(chunk)
        return json.loads(data.decode('utf-8'))

    start_t = time.time()
    while time.time() - start_t < 15:
        try:
            m = recv_msg()
            if m:
                if m.get('method') == 'Runtime.consoleAPICalled':
                    print('Console:', [a.get('value') for a in m['params']['args']])
                elif m.get('id') == cmd_id:
                    print('Done:', m)
                    break
        except Exception as e:
            print('Exception waiting:', e)
            break
finally:
    proc.terminate()
