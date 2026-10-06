export function Color(r, g, b, a) {
    return {
        r: r,
        g: g,
        b: b,
        a: a || 255
    };
}

export function compareColor(color1, color2) {
    if (!color1 || !color2) return false;
    return (
        color1.r === color2.r &&
        color1.g === color2.g &&
        color1.b === color2.b &&
        color1.a === color2.a
    );
}
