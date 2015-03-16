///<reference path="Item.ts"/>

// so TS doesn't nag about these properties below
interface Window {
    mozRequestAnimationFrame : Function;
    webkitRequestAnimationFrame : Function;
}

module Engine {

    var raf : Function = (window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame);

    interface StageCtorOpts {
        dims?   : number[];
        parent? : Element;
    }

    export class Stage {
        _dims      : number[];
        _parent    : Element;
        _el        : HTMLCanvasElement;
        _ctx       : CanvasRenderingContext2D;
        _items     : Item[]  = [];
        _isRunning : boolean = false;

        constructor(o : StageCtorOpts) {
            this._dims   = o.dims   || [400, 300];
            this._parent = o.parent || document.body;

            this._el = document.createElement('canvas');
            this._parent.appendChild(this._el);
            this.setDims(this._dims);
        }

        setDims(dims:number[]) {
            this._el.width  = dims[0];
            this._el.height = dims[1];
            this._ctx = this._el.getContext('2d');
        }

        addItem(item:Item) {
            this._items.push(item);
        }

        render() {
            if (this._isRunning) {
                raf( this.render.bind(this) );
            }

            this._ctx.clearRect(0, 0, this._dims[0], this._dims[1]);
            this._items.forEach((item:Item) => {
                item.render(this._ctx);
            });
        }

        run() {
            this._isRunning = true;
            this.render();
        }

        stop() {
            this._isRunning = true;
        }
    }

}
