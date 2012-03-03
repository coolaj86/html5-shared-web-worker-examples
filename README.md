Stage 1
===


  0. Take a look at the examples here:

    * <http://www.whatwg.org/specs/web-apps/current-work/multipage/workers.html#examples-4>
    * <http://www.whatwg.org/demos/workers/shared/003/test.html>

  0. Copy and paste the 3 pages from the spec example:

          mkdir shared-worker-example
          cd shared-worker-example
          touch test.js
          touch index.html
          touch inner.html

  0. Use some sort of static file server, this won't work from your filesystem

          npm install served 8888 &
          # open index.html in a browser

Cool. It works.

Stage 2
===

Without adding any functionality, I want to refactor the code.

  0. Refactor

          # move script from index.html to index.js
          touch index.js 

          # move script from inner.html to index.js
          touch inner.js

          # rename indescriptive 'test.js'
          mv test.js shared-worker.js

  0. De-html

          # convert html to jade
          html2jade index.html
          html2jade inner.html

  0. Create build system

          build.sh:

          rm *.html
          jade *.jade

  0. Test

          # open index.html in a browser

Cool. It still works.

Stage 3
===

The examples have really crummy javascript examples. Rewrite!

  0. strict mode

    Everything gets wrapped in a strict-mode closure for safe-keeping

          (function () {
            "use strict";

            ... previous content goes here ...
          }());

  0. No magic globals

    They broke strict mode by using `onconnect =` rather than `self.onconnect =`. Fixed

  0. No magic events

    `onmessage` automatically invokes `port.start()`. That's just weird.

    All events updated to use `addEventListener`

Awesome. Not broken yet.
