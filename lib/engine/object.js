import { Color, Coordinate } from "../graphics/primitive";

export class GameObject {
    constructor(position = Coordinate(0, 0), vertices = [], color = Color(0, 0, 0), velocity = Coordinate(0, 0)) {
        this.position = position;
        this.rotation = 0;
        this.scale = 1;
        this.localVertices = vertices;
        this.color = color;
        this.velocity = velocity;
        this.visible = true;
    }

    getWorldVertices(transform) {
        if (!this.localVertices.length) return [];
        let pts = transform.scale_multiple(this.localVertices, this.scale);
        pts = transform.rotate_multiple(pts, this.rotation);
        return transform.translate_multiple(pts, this.position);
    }

    update(deltaTime = 1) {
        this.position.x += this.velocity.x * deltaTime;
        this.position.y += this.velocity.y * deltaTime;
    }

    draw(graphics) {
        if (!this.visible) return;
        if (this.localVertices.length > 1) {
            const worldPts = this.getWorldVertices(graphics.Transform);
            graphics.Shapes.polygon(worldPts, this.color);
        } else {
            graphics.Pixel.draw_pixel(this.position.x, this.position.y, this.color);
        }
    }
}