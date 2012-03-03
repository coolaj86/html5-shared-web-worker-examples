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
