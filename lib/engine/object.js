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
        this.hitbox = null;
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

    updatePosition(coord) {
        this.position = Vector2(coord.x, coord.y);
    }

    updateRotation(theta) {
        this.rotation = theta;
    }

    updateScale(scale) {
        this.scale = scale;
    }

    addChild(child) {
        this.children.push(child);
        if (child.parent != null) {
            child.parent.removeChild(this.id);
        }
        child.setParent(this);
    }

    removeChild(id) {
        for (let i = 0; i < this.children.length; i++) {
            if (this.children[i].id == id) {
                this.children.splice(i, 1);
            }
        }
    }

    setParent(parent) {
        if (this.parent != null) {
            this.parent.removeChild(this.id);
        }
        this.parent = parent;
        parent.addChild(this);
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
        this.rotation += this.angVelocity * deltaTime;
    }

    getBounds() {
        let minX;
        let maxX;
        let minY;
        let maxY;


        if (this.getShapeType() == 'circle') {
            minX = this.position.x - this.radius + 1;
            maxX = this.position.x + this.radius - 1;
            minY = this.position.y - this.radius + 1;
            maxY = this.position.y + this.radius - 1;
        } else if (this.getShapeType() == 'polygon') {
            for (let i = 0; i < this.localVertices.length; i++) {
                let vertex = this.localVertices[i];
                if (i == 0) {
                    minX = this.position.x + vertex.x;
                    maxX = this.position.x + vertex.x;
                    minY = this.position.y + vertex.y;
                    maxY = this.position.y + vertex.y;
                }

                minX = Math.min(minX, this.position.x + vertex.x);
                maxX = Math.max(maxX, this.position.x + vertex.x);
                minY = Math.min(minY, this.position.y + vertex.y);
                maxY = Math.max(maxY, this.position.y + vertex.y);
            }
        }

        return {
            minX: minX,
            maxX: maxX,
            minY: minY,
            maxY: maxY
        }
    }

    checkBounds(graphics) {
        const bounds = this.getBounds();

        let minX = bounds.minX;
        let maxX = bounds.maxX;
        let minY = bounds.minY;
        let maxY = bounds.maxY;

        let hit = {
            top: false,
            bottom: false,
            left: false,
            right: false
        }

        if (minX < 0 || minX > graphics.width-1) {
            hit.right = true;
        }

        if (maxX > graphics.width-1 || maxX < 0) {
            hit.left = true;
        }

        if (minY < 0 || minY > graphics.height-1) {
            hit.bottom = true;
        }

        if (maxY > graphics.height-1 || maxY < 0) {
            hit.top = true;
        }

        return hit;
    }

    checkCollision(object) {
        const bounds = this.getBounds();
        const objBounds = object.getBounds();

        let minX = bounds.minX;
        let maxX = bounds.maxX;
        let minY = bounds.minY;
        let maxY = bounds.maxY;

        let objMinX = objBounds.minX;
        let objMaxX = objBounds.maxX;
        let objMinY = objBounds.minY;
        let objMaxY = objBounds.maxY;

        let hit = {
            top: false,
            bottom: false,
            left: false,
            right: false
        }

        if (objMinX >= maxX) {
            hit.right = true;
        }

        if (objMaxX >= minX) {
            hit.left = true;
        }

        if (objMinY >= maxY) {
            hit.top = true;
        }

        if (objMaxY <= minY) {
            hit.bottom = true;
        }
    }

    draw(graphics) {
        if (!this.visible) return;
        
        const hit = this.checkBounds(graphics);
        const bounds = this.getBounds();
        let x;
        let y;

        if ((hit.top && hit.bottom) || (hit.left && hit.right)) {
            this.visible = false;
            return;
        }

        if (!graphics.Pixel.in_bounds(this.position.x, this.position.y)) {
            x = 0;
            y = 0;

            if (this.position.x > graphics.width) {
                x = this.position.x - graphics.width;
            }

            if (this.position.x < 0) {
                x = this.position.x;
            }

            if (this.position.y > graphics.height) {
                y = this.position.y - graphics.height + 1;
            }

            if (this.position.y < 0) {
                y = this.position.y;
            }

            for (let i = 0; i < this.fills.length; i++) {
                const info = graphics.Coloring.createFillInfo(this.fills[i].fillType, this.fills[i].colors, Vector2(x, y));
                this.updateFill(i, info);
            }
        }
        
        if (this.getShapeType() == "circle") {
            graphics.Shapes.polar_circle(this.position, this.radius, this.color);

            if (this.fills.length > 0) {
                for (let fill of this.fills) {
                    graphics.Coloring.fillFromInfo(fill, this.position, bounds);
                }
            }
        } else if (this.getShapeType() == "polygon" || this.getShapeType() == "line") {
            const vertices = this.getUpdatedVertices(graphics.Transform);
            graphics.Shapes.polygon(vertices, this.color);

            if (this.fills.length > 0) {
                for (let fill of this.fills) {
                    graphics.Coloring.fillFromInfo(fill, this.position, bounds);
                }
            }
        } else {
            graphics.Pixel.draw_pixel(this.position.x, this.position.y, this.color);
        }
    }
}