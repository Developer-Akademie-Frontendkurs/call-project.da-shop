# Create a 404 (Not found) view

- [Crate a new `NotFound` view](#crate-a-new-notfound-view)
- [Configure the router in `script.js` file](#configure-the-router-in-scriptjs-file)
- [Ensure that the 404 view is used correctly](#ensure-that-the-404-view-is-used-correctly)

## Crate a new `NotFound` view

- create a new folder and file in `views` -> `404View/NotFound.js
- fill the file with the following content

```js
import AbstractView from '../AbstractView.js';

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle('404 Not Found');
    }

    async getHTML() {
        return /*html*/ `
            <h1 class="text-36 font-black">404 Content not found!!!</h1>
        `;
    }
}
```

## Configure the router in `script.js` file

- add `404` view to the router

```js
const routes = [
        { path: '/', view: Home },
        { path: '/404', view: NotFound }, // new line
        { path: '/products', view: Products },
        { path: '/products/:id', view: SingleProduct },
        { path: '/about', view: About },
        { path: '/contact', view: Contact },
    ];
```

- don't forget to import the view into `script.js` like the e.g. the `Home` view

## Ensure that the 404 view is used correctly

- If no match exists for a route, navigate to /404

```diff
// old code snippet
- if (!match) {
-     console.error('No matching route found for: ', location.pathname);
-     match = {
-         route: routes[0],
-         result: true,
-     };
- }

// new code snippet
+ if (!match) {
+    navigateTo('/404');
+}
```
