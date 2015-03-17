///<reference path="Stage.ts" />
///<reference path="Item.ts"/>

module Engine {

    export interface RectItemCtorOpts {
        dims?  : number[];
        pos?   : number[];
        color? : string;
        rot?   : number;
    }

    export class RectItem implements Item {
        _dims  : number[];
        _pos   : number[]; // center
        _rot   : number;
        _color : string;

        constructor(o : RectItemCtorOpts) {
            this._dims  = o.dims  || [1, 1];
            this._pos   = o.pos   || [0, 0];
            this._rot   = o.rot   || 0;
            this._color = o.color || '#FFF';
        }

        render(ctx : CanvasRenderingContext2D) {
            ctx.fillStyle = this._color;

            ctx.save();

            ctx.translate(this._pos[0], this._pos[1]);
            ctx.rotate(this._rot);

            ctx.fillRect(
                -this._dims[0]/2,
                -this._dims[1]/2,
                 this._dims[0],
                 this._dims[1]
            );

            ctx.restore();
        }
    }

}
