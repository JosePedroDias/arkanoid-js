///<reference path="Item.ts"/>

var PI2 = Math.PI * 2;

class CircleItem implements Item {
    _r:number;
    _pos:number[]; // center
    _color:string;

    constructor(r, pos, color) {
        this._r = r || 10;
        this._pos = pos || [5, 5];
        this._color = color || '#F00';
    }

    render(ctx:CanvasRenderingContext2D) {
        ctx.fillStyle = this._color;
        ctx.beginPath();
        ctx.arc(this._pos[0], this._pos[1], this._r, 0, PI2);
        ctx.fill();
    }
}