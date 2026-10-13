export class PhysicsEngine {
    constructor(tickRate = 1/60, graphics) {
        this.isRunning = false;
        this.previous = 0;
        this.accumulation = 0;
        this.tickRate = tickRate;
        this.animationFrameId = null;
        this.objects = [];
        this.graphics = graphics;
    }

    start() {
        if (this.isRunning) { return }

        this.isRunning = true;
        this.previous = performance.now();
        this.animationFrameId = requestAnimationFrame((timestamp) => this.tick(timestamp));
    }

    stop() {
        this.isRunning = false;
        cancelAnimationFrame(this.animationFrameId);
        this.animationFrameId = null;
    }

    tick(timestamp) {
        let delta = (timestamp - this.previous) / 1000;
        this.previous = timestamp;
        
        if (delta > 0.25) { delta = 0.25 };

        this.accumulation += delta;

        while (this.accumulation >= this.tickRate) {
            this.update(this.tickRate);
            this.accumulation -= this.tickRate;
        }

        this.render();

        if (this.isRunning) {
            this.animationFrameId = requestAnimationFrame((timestamp) => this.tick(timestamp));
        }
    }

    update(tickRate) {
        for (let object of this.objects) {
            object.update(tickRate);
        }
    }

    render() {
        if (!this.graphics) return;

        this.graphics.refreshScreen();

        for (let obj of this.objects) {
            obj.draw(this.graphics);
        }

        this.graphics.putImageData();
    }

    addObject(obj) {
        this.objects.push(obj);
    }
}