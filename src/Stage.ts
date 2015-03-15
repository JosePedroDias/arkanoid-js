///<reference path="Item.ts"/>

class Stage {
    _dims: number[];
    _parent: Element;
    _el: HTMLCanvasElement;
    _ctx: CanvasRenderingContext2D;
    _items: Item[] = [];

    constructor(dims:number[], parent:any) {
        this._dims = dims;
        this._parent = parent || document.body;
        this._el = document.createElement('canvas');
        this._parent.appendChild(this._el);
        this.setDims(this._dims);
        this._ctx = this._el.getContext('2d');
    }

    setDims(dims:number[]) {
        this._el.width = dims[0];
        this._el.height = dims[1];
    }

    addItem(item:Item) {
        this._items.push(item);
    }

    render() {
        this._ctx.clearRect(0, 0, this._dims[0], this._dims[1]);
        this._items.forEach((item:Item) => {
            item.render(this._ctx);
        });
    }
}
