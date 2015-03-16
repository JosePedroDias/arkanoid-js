///<reference path="Stage.ts" />
///<reference path="Item.ts"/>

module Engine {

    var PI2 = Math.PI * 2;

    export interface CircleItemCtorOpts {
        r?     : number;
        pos?   : number[];
        color? : string;
    }

    export class CircleItem implements Item {
        _r     : number;
        _pos   : number[]; // center
        _color : string;

        constructor(o : CircleItemCtorOpts) {
            this._r     = o.r     || 1;
            this._pos   = o.pos   || [0, 0];
            this._color = o.color || '#FFF';
        }

        render(ctx : CanvasRenderingContext2D) {
            ctx.fillStyle = this._color;
            ctx.beginPath();
            ctx.arc(this._pos[0], this._pos[1], this._r, 0, PI2);
            ctx.fill();
        }
    }

}
