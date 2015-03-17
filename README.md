# Arkanoid

Giving several tech a try.

Attempting a clean arkanoid implementation.
Using typescript, canvas rendering and box2d for physics.
Using WebStorm for development.



## How to compile into JS and use

1. install typescript and run it:

    [sudo] npm install -g typescript
    tsc -t ES5 --removeComments --sourcemap src/Arkanoid/main.ts --out build/main.js

2. serve dir with something:

    python - SimpleHTTPServer

3. visit the [demo page](http://127.0.01:8000/demo.html)



## Used

* canvas - <https://simon.html5.org/dump/html5-canvas-cheat-sheet.html>
* box2d - <http://box2d.org/manual.pdf>
* typescript - <http://www.typescriptlang.org/Handbook>



## TODO

* make blocks destroyable (fix kill!)
* sfx
* display score
