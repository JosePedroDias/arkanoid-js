///<reference path="Item.ts"/>

class RectItem implements Item {
    _dims:number[];
    _pos:number[]; // center
    _color:string;

    constructor(dims, pos, color) {
        this._dims = dims || [10, 10];
        this._pos = pos || [5, 5];
        this._color = color || '#F00';
    }

    render(ctx:CanvasRenderingContext2D) {
        ctx.fillStyle = this._color;
        ctx.fillRect(
            this._pos[0]-this._dims[0]/2,
            this._pos[1]-this._dims[1]/2,
            this._dims[0],
            this._dims[1]
        );
    }
}