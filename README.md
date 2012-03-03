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

Stage 4
===

Now I want to see interaction, so I need a DOM library and a form to send messages.

  0. Install pakmanager

          npm install pakmanager

  0. Create a package

          # just added a console.log (so that the file isn't empty), will convert main index.js later
          touch lib/index.js
          npm init
          # edit package.json to add `domReady`, `bean` (events), `bonzo` (DOM manipulations), and `qwery` (css selection)
          # add "main" as "lib/index" and "lib" as "lib"

  0. Add script tags for `pakmanaged.js` in `index.jade` and `inner.jade`

    These tags must come first so that the latter files have access

  0. Modify build script

          # add at end of build.sh
          pakmanager build

  0. Added button and event handlers to open new iFrames or windows for inner.html instances

Stage 5
===

Send a message from a form

  0. Add form with submit button

    Easy enough, no trickery here

  0. Get the message through the webworker to the peers

    Turns out that `event.ports` is a rabbit hole.
    It's useless.
    It isn't an Array or an Object.
    You can only ever access ports[0].
    It's part of the spec that you can't access ports[i]!
    WTF!?!?!

    So inside the worker I did something like this:

          var channels = [];

          function connect(ev) {
            var newbie = ev.ports[0];
            channels.push(newbie)
            channels.forEach(function (port) {
              if (newbie === port) {
                return;
              }
              port.postMessage('a newcomer has arrived with the message: ' + event.data);
            });
          }

Stage 6
===

Added Desktop Notifications using webkitNotification and mozNotification.

0. Request permission from user

  You can only do this once (without hardcore clearing the cache - so do it right!)

0. Debugging is impossible... but oh well

W00T!

Stage 7
===

Houstin, we have remote control!!!

Can't type from Notifications box, but can Bark!!! Ruff ruff!
