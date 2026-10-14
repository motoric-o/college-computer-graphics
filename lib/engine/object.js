import { Color, Vector2 } from "../graphics/primitive/index.js";
import { layerStack } from "./stacks/layerStack.js";

export class GameObject {
    constructor() {
        this.name = "";
        this.id = "";
        this.position = Vector2(0, 0);
        this.velocity = Vector2(0, 0);
        this.angVelocity = 0;
        this.fills = [];
        this.localVertices = [];
        this.localAnchor = Vector2(0, 0);
        this.radius = 0;
        this.color = Color(0, 0, 0);
        this.rotation = 0;
        this.scale = 1;
        this.visible = true;
        this.parent = null;
        this.children = [];
    }
    
    setName(name) {
        this.name = name;
        return this;
    }
    
    setFills(fills) {
        for (let fill of fills) {
            this.fills.push(fill);
        }
        return this;
    }

    setPosition(coord) {
        this.position = Vector2(coord.x, coord.y);
        return this;
    }

    setVelocity(vec) {
        this.velocity = vec;
        return this;
    }

    setAngVelocity(velocity) {
        this.angVelocity = velocity;
        return this;
    }

    setVertices(vertices) {
        this.localVertices = vertices;
        return this;
    }

    setLocalAnchor(coord) {
        this.localAnchor = coord;
        return this;
    }

    setRadius(radius) {
        this.radius = radius;
        return this;
    }

    setColor(color) {
        this.color = color;
        return this;
    }

    setRotation(theta) {
        this.rotation = theta;
        return this;
    }

    setScale(scale) {
        this.scale = scale;
        return this;
    }

    setVisible(visible) {
        this.visible = visible;
        return this;
    }

    setId(layer) {
        this.id = `${layer}-${layerStack[layer].length}`;
        if (this.name != "") {
            this.id += `-${this.name}`
        }
        return this;
    }

    updateFill(index, fillInfo) {
        this.fills[index] = fillInfo;
    }
    
    getShapeType() {
        if (this.radius > 0) {
            return "circle";
        }

        if (this.localVertices.length > 2) {
            return "polygon";
        } else if (this.localVertices.length == 2) {
            return "line";
        }

        if (this.localVertices.length == 1 && this.radius == 0) {
            return "pixel";
        }

        return "empty";
    }

    getUpdatedVertices(transform) {
        if (!this.localVertices.length) return [];
        let vertices = transform.scale_multiple(this.localVertices, this.scale);
        vertices = transform.rotate_multiple(vertices, this.rotation);
        return transform.translate_multiple(vertices, this.position);
    }

    update(deltaTime) {
        this.position.x += this.velocity.x * deltaTime;
        this.position.y += this.velocity.y * deltaTime;
        this.localAnchor.x += this.velocity.x * deltaTime;
        this.localAnchor.y += this.velocity.y * deltaTime;
        this.rotation += this.angVelocity * deltaTime;
    }

    draw(graphics) {
        if (!this.visible) return;
        if (this.getShapeType() == "circle") {
            graphics.Shapes.polar_circle(this.position, this.radius, this.color);
            if (this.fills.length > 0) {
                for (let fill of this.fills) {
                    graphics.Coloring.fillFromInfo(fill, this.localAnchor);
                }
            }
        } else if (this.getShapeType() == "polygon" || this.getShapeType() == "line") {
            const vertices = this.getUpdatedVertices(graphics.Transform);
            graphics.Shapes.polygon(vertices, this.color);
            if (this.fills.length > 0) {
                for (let fill of this.fills) {
                    graphics.Coloring.fillFromInfo(fill, this.localAnchor);
                }
            }
        } else {
            graphics.Pixel.draw_pixel(this.position.x, this.position.y, this.color);
        }
    }
}