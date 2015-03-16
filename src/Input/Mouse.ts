module Input {

    export class Mouse {
        _pos : number[] = [0, 0];
        _off : number[] = [0, 0];
        _el  : Element;

        constructor(el : Element) {
            this._el = el;
            window.addEventListener('mousemove', this._onMouse.bind(this));
        }

        setup() {
            var o = this._el.getBoundingClientRect();
            this._off[0] = o.left;
            this._off[1] = o.top;
        }

        _onMouse(ev) {
            this._pos[0] = ev.clientX - this._off[0];
            this._pos[1] = ev.clientY - this._off[1];
            //console.log(this._pos.join(' | '));
        }

    }

}


