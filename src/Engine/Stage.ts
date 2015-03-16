///<reference path="Item.ts"/>

// so TS doesn't nag about these properties below
interface Window {
    mozRequestAnimationFrame : Function;
    webkitRequestAnimationFrame : Function;
}

var getNow = function() {
    return (new Date()).valueOf() / 1000;
};

module Engine {

    var raf : Function = (
        window.requestAnimationFrame       ||
        window.mozRequestAnimationFrame    ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame
    );

    interface StageCtorOpts {
        dims?   : number[];
        parent? : Element;
    }

    export class Stage {
        _dims      : number[];
        _parent    : Element;

        //_scale     : boolean = false;
        _el        : HTMLCanvasElement;
        _ctx       : CanvasRenderingContext2D;
        _items     : Item[]  = [];
        _isRunning : boolean = false;
        _onUpdate  : Function;
        _t0        : number;
        _t         : number;
        _dt        : number;

        constructor(o : StageCtorOpts) {
            this._dims   = o.dims   || [400, 300];
            this._parent = o.parent || document.body;

            this._el = document.createElement('canvas');
            this._parent.appendChild(this._el);
            this.setDims(this._dims);
        }

        setDims(dims : number[]) {
            this._el.width  = dims[0];
            this._el.height = dims[1];
            this._el.style.marginLeft = ['-', ~~(dims[0]/2), 'px'].join('');
            this._el.style.marginTop  = ['-', ~~(dims[1]/2), 'px'].join('');
            //this._el.style.transform = ['scale(', 2, ',', 2, ')'].join('');
            this._ctx = this._el.getContext('2d');
        }

        addItem(item : Item) {
            this._items.push(item);
        }

        setOnUpdate(cb : Function) {
            this._onUpdate = cb;
        }

        render() {
            if (this._isRunning) {
                raf( this.render.bind(this) );
            }

            if (this._onUpdate) {
                var t = getNow() - this._t0;
                this._dt = this._dt ? t - this._t : (1 / 60);
                this._t = t;

                this._onUpdate.apply(this);
            }

            this._ctx.clearRect(0, 0, this._dims[0], this._dims[1]);
            this._items.forEach((item:Item) => {
                item.render(this._ctx);
            });
        }

        run() {
            this._t0 = getNow();
            //this._t = 0;
            //this._dt = 1 / 60;
            this._isRunning = true;
            this.render();
        }

        stop() {
            this._isRunning = true;
        }
    }

}
