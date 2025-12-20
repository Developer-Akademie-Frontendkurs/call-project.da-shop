# Create and set up a Single Page Application (SPA)

- [Description](#description)
- [Expansion of our development setup](#expansion-of-our-development-setup)
  - [Installation lite-server](#installation-lite-server)
  - [Install `concurrently`](#install-concurrently)
    - [What does the npm package `concurrently` do?](#what-does-the-npm-package-concurrently-do)
    - [What is `concurrently` useful for?](#what-is-concurrently-useful-for)
    - [Installation and setup \`concurrently\`\`](#installation-and-setup-concurrently)
- [Conversion of Conversion of our static website into a single-page application (SPA)](#conversion-of-conversion-of-our-static-website-into-a-single-page-application-spa)
  - [JavaScript Modules](#javascript-modules)
    - [How it works](#how-it-works)
    - [Key characteristics](#key-characteristics)
    - [Benefits](#benefits)
    - [Common patterns](#common-patterns)
  - [Adjusting our `index.html` file](#adjusting-our-indexhtml-file)
  - [Creating a router in the `script.js` file](#creating-a-router-in-the-scriptjs-file)
    - [What is a router?](#what-is-a-router)
    - [Core responsibilities](#core-responsibilities)
    - [Benefits of a router in a SPA](#benefits-of-a-router-in-a-spa)
    - [Creating the Router in our SPA](#creating-the-router-in-our-spa)
    - [Integrating the Browser History API](#integrating-the-browser-history-api)
  - [Create an abstract View](#create-an-abstract-view)
    - [What is an abstract View?](#what-is-an-abstract-view)
    - [Creation of the `AbstractView.js` file](#creation-of-the-abstractviewjs-file)
  - [Create a concrete View](#create-a-concrete-view)
    - [What is a concrete view](#what-is-a-concrete-view)
    - [Creation of a concrete view (`HomeView`)](#creation-of-a-concrete-view-homeview)
  - [Modify `script.js` and make views accessible](#modify-scriptjs-and-make-views-accessible)
- [Transfer and reading of URL parameters on client side](#transfer-and-reading-of-url-parameters-on-client-side)
  - [What are URL Parameter and why the are a problem in our application so far?](#what-are-url-parameter-and-why-the-are-a-problem-in-our-application-so-far)
  - [Preparing our application for the use of URL parameters](#preparing-our-application-for-the-use-of-url-parameters)
    - [Prepare our fake backend](#prepare-our-fake-backend)
  - [Processing URL parameters in our frontend](#processing-url-parameters-in-our-frontend)
    - [Creating the required views](#creating-the-required-views)
- [The entire project structure after conversion to SPA](#the-entire-project-structure-after-conversion-to-spa)
- [Epilog](#epilog)
- [Links](#links)

## Description

A Single Page Application (SPA) is a web application that operates with just a single HTML page. Instead of loading an entirely new page from the server for each new view or user interaction, content is dynamically updated directly in the browser.

In this project, the index.html file is loaded once. JavaScript, specifically the script in script.js, then intercepts user clicks on links and changes the URL without reloading the page. Afterward, the required content (e.g., the product list or the "About" page) is fetched from the server, and only a part of the page—the `<main>` section—is replaced. This creates a fluid, fast user experience similar to that of a desktop application.

Advantages:

Fast Loading Times: After the initial page load, only small data packets need to be exchanged, making navigation between views very fast.
Better User Experience: The smooth transitions without noticeable page reloads feel modern and responsive. Simpler Server Architecture: The server often only needs to provide data via an API and no longer has to generate complete HTML pages.
Disadvantages:

Search Engine Optimization (SEO): Since content is loaded dynamically, it can be more difficult for search engines to discover and index all subpages. Increased Complexity in the Frontend: All the logic for controlling views and states resides in the client-side JavaScript, which can quickly become complex in large applications.
Longer Initial Load Time: The first visit often requires loading more JavaScript code than a traditional website.

## Expansion of our development setup

### Installation lite-server

The development server used so far, the Live Server Extension in VS Code, is not suitable for our further purposes, or is very difficult to configure. For this reason, we are switching to the npm package `lite-server` for the rest of the process.

- **Install `lite-server`**

```bash
npm install lite-server --save-dev
```

- **Script to start `lite-server`**

Normally, we would now have to create another script in `package.json` to start this development server.

```json
{
    // ... more code
   "scripts": {
      "dev": "tailwindcss -i ./input.css -o ./src/styles.css --watch",
      "server": "lite-server",
      "backend": "json-server --watch backend/db.json",
      "build": "tailwindcss -i ./input.css -o ./src/styles.css"
    },
    // ... more code
  }
```

- **Now we have two effects that are not yet optimally set up for our development environment.

First, when `lite-server` is started, it always starts at the root level of our project. However, there are no HTML files at this level, so the web browser would always display the folder structure of our project, but we want to see the start page of our project directly.

- **Configuration `lite-server`**

Create a new file at the project root level with the name `bs-config.json`.

```json
{
  "server": {
    "baseDir": "./src",
  }
}
```

Second, the current configuration would mean that  we would have to start our scripts in three different terminals. Not very convenient, right? For this reason, we will install another npm package that allows us to start multiple scripts at the same time with a single command. We will take a closer look at this in the next section.

### Install `concurrently`

#### What does the npm package `concurrently` do?

- “Concurrently” is a small CLI tool that allows you to start and manage multiple commands/processes in parallel in the same
- terminal session. Typical use case: During development, you may want to start a web server, a bundler/watcher, and perhaps a
- test runner at the same time—without opening multiple terminals.

#### What is `concurrently` useful for?

- Parallel launch of dev servers, API servers, watchers, linters, tests, etc.
- Common, clear output with colored prefixes for each process
- Uniform control: Terminate/restart processes with a single command

#### Installation and setup `concurrently``

- **Install `concurrently`**

```bash
npm i -D concurrently
```

- **Configuration for `concurrently`**

Now we can customize the script part of our `package.json` so that we can start and stop multiple scripts at the same time with a single command.

```json
{
    // ... more code
   "scripts": {
      "dev": "concurrently \"tailwindcss -i ./input.css -o ./src/styles.css --watch\" \"lite-server\" \"json-server --watch backend/db.json\"",
      "build": "tailwindcss -i ./input.css -o ./src/styles.css"
    },
    // ... more code
}
```

## Conversion of Conversion of our static website into a single-page application (SPA)

### JavaScript Modules

First, we need to ensure that our `script.js` file is included as a module in our `index.html` file. But what exactly does this mean, and why is it important?

JavaScript modules are single files with their own module scope that explicitly declare what they expose (export) and what they consume (import). You enable the module system in the browser by loading scripts with type="module" or by using import/export within a module.

#### How it works

- Enable in the browser:

```html
<script type="module" src="script.js"></script>
````

- Export from a module:

```js
// utils.js
export function sum(a, b) {
  return a + b;
}
export const PI = 3.14159;
export default class Logger { log(x) { console.log(x); } }
```

- Import in another module:

```js
// main.js
import Logger, { sum, PI } from './utils.js';
const logger = new Logger();
logger.log(sum(2, PI));
```

#### Key characteristics

- Module scope: Declarations are private to the file by default; nothing leaks to window.
- Explicit dependencies: import/export make relationships clear and maintainable.
- Automatic load ordering: The browser resolves and loads dependencies before execution.
- Strict mode: Modules implicitly use "use strict".
- Deferred behavior: Module scripts are effectively deferred (don’t block HTML parsing).
- Single evaluation: Each module URL is evaluated once; subsequent imports share the same instance (singleton-like).
- Top-level await: Allowed in modules for simpler async setup.

#### Benefits

- Better encapsulation: Avoid global namespace pollution and name collisions.
- Maintainability and readability: Clear interfaces and easier refactoring.
- Reusability: Organize code into small, testable units.
- Performance-friendly loading: Native parallel loading, caching, and on-demand fetching; efficient with HTTP/2/3.
- Native browser support: No mandatory build step for modern browsers; tooling optional for bundling/optimization.
- Safer defaults: Strict mode and static structure help tooling (tree shaking, linting, type analysis).

#### Common patterns

- Named exports for multiple utilities:

```js
export function a() {}
export function b() {}
```

- Re-exports for central entry points:

```js
export default function main() {}
```

### Adjusting our `index.html` file

- We adjust our `index.html` file accordingly. In the same step, we add the `data-link` attribute to our navigation items. This is needed to be able to work with the browser history API within our SPA later on.

```html
!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Da-Shop</title>
    <base href="/">
    <link rel="stylesheet" href="styles.css">
    <script type="module" src="script.js"></script>
</head>

<body class="min-h-screen flex flex-col">
    <header class="navbar bg-base-300 shadow-sm">
        <div class="flex-1">
            <a class="btn btn-ghost text-xl">daisyUI</a>
        </div>
        <nav class="flex-none">
            <ul class="menu menu-horizontal px-1">
                <li><a href="./" data-link>Home</a></li>
                <li><a href="./products" data-link>Products</a></li>
                <li><a href="./about" data-link>About</a></li>
                <li><a href="./contact" data-link>Contact</a></li>
            </ul>
        </nav>
    </header>
    <!-- More code>
```

### Creating a router in the `script.js` file

#### What is a router?

A router in a SPA is the logic that maps URL paths (routes) to specific UI views or components—without performing a full page reload. It keeps the URL in sync with what the user sees while staying on a single HTML page.

#### Core responsibilities

- URL → view mapping: Associates paths (e.g., /, /users, /users/42) with render functions/components.
- Navigation without reloads: Uses the History API (pushState, replaceState, popstate) or hash routing (#/path).
- Stateful navigation: Handles browser back/forward correctly.
- Params and query strings: Extracts route params (e.g., :id) and query params (?q=foo).
- Guards and redirects: Optionally intercepts navigation (e.g., auth checks) and performs redirects.
- Lazy loading: Can load views/modules on demand to improve initial load time.

#### Benefits of a router in a SPA

- Fast, fluid navigation without full reloads.
- Clear separation between URLs and UI views.
- Better shareability/deep-linking: Each view has a meaningful URL.
- Foundation for access control (route guards) and async loading.

Note on frameworks: Many frameworks ship routers (e.g., React Router, Vue Router, Angular Router). In vanilla JS you implement the same ideas using the History API or hash routing.

#### Creating the Router in our SPA

- Define the router in `script.js`

```js
// script.js

const router = async () => {
  /*
    Defines an array of route objects. Each object contains a
    URL path (`path`) and an associated function (`view`) that
    is executed when the route matches.
  */
  const routes = [
    { path: '/', view: () => console.log('Viewing Home') },
    { path: '/posts', view: () => console.log('Viewing Posts') },
    { path: '/about', view: () => console.log('Viewing About') },
  ];

  /*
    Iterates over the `routes` array and creates a new array `potentialMatches`.
    For each route, it checks whether its `path` matches the current path in the
    browser address bar (`location.pathname`).
  */
  const potentialMatches = routes.map((route) => {
    return {
      route: route,
      isMatch: location.pathname === route.path,
    };
  });

  /*
    Finds the first object in `potentialMatches` where `isMatch` is `true`.
    The result is stored in the variable `match`.
  */
  const match = potentialMatches.find((potentialMatch) => potentialMatch.isMatch);

  /*
    The following lines are for debugging and output various information
    about the routing process in the developer console.
  */
  console.log('Potential Matches:', potentialMatches);
  console.log('Matched Route:', match);
  console.log('Current Path from MATCH:', match ? match.route.path : 'No match found');
  // Executes the `view` function of the matched route and logs its result.
  console.log('match view:', match.route.view());
  console.log('Current Path from location:', location.pathname);
};
```

It should be noted here that despite the integration of a router, the entire page is still reloaded when a single route is called up.

#### Integrating the Browser History API

- `script.js` (Top of the file)

```js
// script.js
const navigateTo = (url) => {
    // Changes the URL in the address bar without reloading the page.
    history.pushState(null, null, url);
    // Calls the router to update the page content according to the new URL.
    router();
};
// More code ...
```

- `script.js` (After the router function)

```js
// script.js
// Calls the router when the user uses the browser navigation (back/forward).
window.addEventListener('popstate', router);

document.addEventListener('DOMContentLoaded', () => {
  // Captures clicks on the body to handle navigation for links with the 'data-link' attribute.
  document.body.addEventListener('click', (event) => {
    // Checks whether the clicked element has 'data-link'.
    if (event.target.matches('[data-link]')) {
      // Prevents the default link behavior (full page reload).
      event.preventDefault();
      // Performs client-side navigation.
      navigateTo(event.target.href);
    }
  });

  // Calls the router on initial page load to display the correct view.
  router();
});
```

### Create an abstract View

#### What is an abstract View?

An AbstractView is an abstract base class for pages/views in a Single Page Application (SPA). It defines a common interface and basic functionality that all concrete views (e.g., HomeView, AboutView, UserDetailView) should share. This makes the code more consistent, reusable, and easier to maintain.

#### Creation of the `AbstractView.js` file

- create a new folder `views` in the `src` folder
- In this folder create a new file `AbstractView.js`

```js
export default class {
  constructor() { }

  setTitle(title) {
    document.title = title;
  }

  async getHTML() {
    return '';
  }
}
```

**Purpose**

- setTitle(title): Shared helper to set the document’s page title.
- getHTML(): Async method returning the view’s HTML string. It’s empty in the base class and meant to be overridden by subclasses.

**Abstract role**

- The class provides a minimal, common API. Concrete views inherit from it and implement/extend getHTML() (and optionally other methods like initEvents(), getCss(), getData(), etc.).

**Benefits**

- Consistent view contract: The router can rely on every view exposing getHTML() (and optionally using setTitle()).
- Reuse: Shared utilities (title setting, cleanup, event handling) live in one place.
- Extensibility: You can add more shared methods later without touching every view.

### Create a concrete View

#### What is a concrete view

A Concrete View is a specific, fully implemented view class that extends your abstract base (AbstractView). While AbstractView provides the shared interface and utilities (e.g., setTitle, the getHTML signature), a Concrete View supplies the actual content and behavior for a particular page/view in your SPA.

#### Creation of a concrete view (`HomeView`)

- Create a new folder `HomeView` in `<project-root>/src/views`
- Create a new file `Home.js` in the `HomeView` folder

```js
import AbstractView from '../AbstractView.js';

export default class extends AbstractView {
    constructor() {
        super();
        // set the title of the page (view)
        this.setTitle('Home');
    }

    // return the HTML content of the page (view)
    async getHTML() {
        return /*html*/`
            <h1>Welcome to my brand new website</h1>
        `;
    }
}
```

- Inherits from AbstractView: Reuses shared functionality (e.g., setting the document title).
- Sets the page title: The constructor defines the title shown in the browser tab.
- Provides concrete markup: getHTML() returns the HTML to be rendered into the DOM.
- Role in the router: The router instantiates the appropriate Concrete View per route and renders its getHTML() output.

### Modify `script.js` and make views accessible

- Expand the `script.js` file

```js
// script.js

// Top of file
import Home from './views/HomeView/Home.js';

// more code...

const router = async () => {
  /*
    Defines an array of route objects. Each object contains a
    URL path (`path`) and an associated function (`view`) that
    is executed when the route matches.
  */
  const routes = [
    // next line changed
    { path: '/', view: Home },
    { path: '/posts', view: () => console.log('Viewing Posts') },
    { path: '/about', view: () => console.log('Viewing About') },
  ];

  // more code...

  let match = potentialMatches.find((potentialMatch) => potentialMatch.result !== null);

  // two new lines of code
  const view = new match.route.view(getParams(match));
  document.getElementById('content').innerHTML = await view.getHTML();
}

// more code...
```

- All internal links must now have a `data-link` attribute.
- Bind all other pages according to the pattern shown.
- TASK: Create a 404 page on your own. (We will also do this together in one of the next calls.)

## Transfer and reading of URL parameters on client side

### What are URL Parameter and why the are a problem in our application so far?

**What is a URL parameter?**

- A URL parameter (path parameter) is part of the URL path that holds variable values. Example: In /users/42, 42 is a parameter (e.g., :id).
- It’s defined by the path structure (e.g., /users/:id, /posts/:slug) and is different from query parameters (?key=value).

**Why is this a problem in our current application?**

- Our router seems to match only static routes (e.g., /^/users$/) and not dynamic ones with placeholders.
- Result: Routes like /users/42 aren’t recognized, falling back to 404 or the wrong view.
- We also lack a way to extract the parameter (e.g., id = 42) and pass it into the view so it can fetch/render the correct data.
- Back/forward may work, but without proper param matching the content remains incorrect.

### Preparing our application for the use of URL parameters

#### Prepare our fake backend

- Open the `db.json` in the folder `<project-root>/src/backend` and add in the `{}`

```json
  "products": [
    {
      "id": 0,
      "product_name": "Leder-Sneaker",
      "product_short_description": "Bequeme und stylische Sneaker für jeden Tag.",
      "product_description": "Diese hochwertigen Leder-Sneaker vereinen Komfort und Stil. Das Obermaterial aus echtem Leder sorgt für Langlebigkeit und einen edlen Look. Die flexible Gummisohle bietet optimalen Halt und Dämpfung. Perfekt für den Alltag, das Büro oder die Freizeit.",
      "catagory": "Schuhe",
      "price": 129.99
    },
    {
      "id": 1,
      "product_name": "Bio-Baumwoll-T-Shirt",
      "product_short_description": "Weiches und nachhaltiges T-Shirt aus 100% Bio-Baumwolle.",
      "product_description": "Unser klassisches T-Shirt wird aus reiner Bio-Baumwolle hergestellt und bietet ein superweiches Tragegefühl. Der moderne Schnitt passt zu jedem Outfit. Es ist atmungsaktiv, hautfreundlich und wurde unter fairen Bedingungen produziert. Ein Must-Have für jede Garderobe.",
      "catagory": "Bekleidung",
      "price": 29.99
    },
    {
      "id": 2,
      "product_name": "Wollfilzhut",
      "product_short_description": "Eleganter Hut aus 100% Wollfilz.",
      "product_description": "Dieser stilvolle Hut ist der perfekte Begleiter für kühle Tage. Gefertigt aus hochwertigem Wollfilz, schützt er nicht nur vor Wind und Wetter, sondern setzt auch ein modisches Statement. Das zeitlose Design macht ihn zu einem vielseitigen Accessoire für Damen und Herren.",
      "catagory": "Accessoires",
      "price": 79.99
    }
  ]
```

- We have created a new endpoint `products` in our backend.
- We have created three products, each with a unique ID.
- We can retrieve our products at the URL `http://localhost:3000/products`.

### Processing URL parameters in our frontend

#### Creating the required views

- Create a new folder `ProductsView` in `<project-root>/src/views`
- Create a new file `Products.js` in this folder

```js
import AbstractView from '../AbstractView.js';

export default class extends AbstractView {
  products = [];

  constructor() {
    super();
    this.setTitle('Home');
    this.getProducts();
  }

  /**
   * Fetches the list of products from the API and updates the `products` property.
   * Renders the products after fetching.
   * @async
   * @returns {Promise<void>} Resolves when products are fetched and rendered.
   */
  async getProducts() {
    const response = await fetch('http://localhost:3000/products');
    const responseAsJson = await response.json();
    this.products = responseAsJson;
    console.log('products: ', this.products)
    this.renderProducts();
  }

  /**
   * Renders the list of products into the DOM element with the ID 'products-content'.
   * Each product is displayed as a clickable link with its name.
   *
   * @returns {void}
   */
  renderProducts() {
    const productsContainer = document.getElementById('products-content');
    for (let productIndex = 0; productIndex < this.products.length; productIndex++) {
      const product = this.products[productIndex];
      productsContainer.innerHTML += /*html*/`
          <p><a href="./products/${productIndex}" data-link>${product.product_name}</p></a>
      `;
    }
  }

  async getHTML() {
    return /*html*/`
      <h1>Products</h1>
      <p>All our awesome Products</p>
      <section id="products-content">

      </section>
    `;
  }
}
```

- Create a new folder `SingleProductView` in `<project-root>/src/views`
- Create a new file `SingleProduct.js` in this folder

```js
import AbstractView from '../AbstractView.js';

export default class extends AbstractView {
  product = {};
  productId = null;

  constructor(params) {
    super(params);
    console.log('params: ', params);
    this.setTitle('Single Product');
    this.productId = params.id;
  }

  async getHTML() {
    if (!this.product.product_name) {
      await this.getProduct(this.productId);
    }

    return /*html*/`
      <h1>${this.product.product_name}</h1>
      <p>${this.product.product_description}</p>
    `;
  }

    /**
     * Fetches product data from the server by product ID and assigns it to the `product` property.
     *
     * @async
     * @param {string|number} productId - The unique identifier of the product to fetch.
     * @returns {Promise<void>} Resolves when the product data has been fetched and assigned.
     */
    async getProduct(productId) {
      const response = await fetch(`http://localhost:3000/products/${productId}`);
      const responseAsJson = await response.json();
      this.product = responseAsJson;
      console.log('product: ', this.product);
    }
}
```

- Edit the `script.js` file

```js
import Home from './views/HomeView/Home.js';
import Products from './views/Products/ProductsView.js';
import SingleProduct from './views/SingleProduct/SingleProductView.js';

/**
 * Converts a path string with parameters (e.g., "/user/:id") into a regular expression.
 *
 * The generated regex matches the entire path and captures parameter values.
 * - Slashes ("/") are escaped to "\/" for regex compatibility.
 * - Path parameters (e.g., ":id") are replaced with "(.+)" to capture any value.
 * - The regex is anchored to the start (^) and end ($) of the string.
 *
 * @param {string} path - The path pattern, potentially containing parameters prefixed with ":".
 * @returns {RegExp} A regular expression that matches the given path and captures parameter values.
 *
 * @example
 * // Returns /^\/user\/(.+)$/
 * pathToRegex('/user/:id');
 */
const pathToRegex = (path) => new RegExp(`^${path.replace(/\//g, '\\/').replace(/:\w+/g, '(.+)')}$`);

/**
 * Extracts route parameters from a match object.
 *
 * @param {Object} match - The match object containing route and result information.
 * @param {Object} match.route - The route object with a path string containing parameter names (e.g., '/user/:id').
 * @param {string} match.route.path - The route path string with parameter placeholders.
 * @param {Array} match.result - The array of matched values, where the first element is the full match and subsequent elements are parameter values.
 * @returns {Object} An object mapping parameter names to their corresponding values from the match.
 */
const getParams = (match) => {
    const values = match.result.slice(1)
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g).map((result) => result[1]));
    return Object.fromEntries(
        keys.map((key, index) => {
            return [key, values[index]];
        })
    )
}

// more code...

const router = async () => {
    const routes = [
        { path: '/', view: Home },
        { path: '/products', view: Products },
        { path: '/products/:id', view: SingleProduct },
    ];

    const potentialMatches = routes.map((route) => {
        return {
            route: route,
            result: location.pathname.match(pathToRegex(route.path))
        }
    });

    let match = potentialMatches.find((potentialMatch) => potentialMatch.result !== null);

    const view = new match.route.view(getParams(match));
    document.getElementById('content').innerHTML = await view.getHTML();
}

// more code ...

```

- Edit the `index.html` file

```html
!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Da-Shop</title>
    <!-- next line is important -->
    <base href="/">
    <link rel="stylesheet" href="styles.css">
    <script type="module" src="script.js"></script>
</head>

<body class="min-h-screen flex flex-col">
<!-- more code ... -->
```

**What is base href for?**

- The HTML tag sets the base URL used to resolve all relative links and resources on the page (e.g., , , , ).
- When present, relative paths are resolved against this base instead of the current page URL.
- Useful in SPAs or deep links so relative assets still load correctly at paths like /users/42.
- Caution: It affects all relative URLs in the document. A wrong base can break links/resources.

In SPAs, set it to the app root (e.g., ), especially with History API routing.

- Edit the development server configuration file `bs-config.json` to handle URL params

```json
{
  "server": {
    "baseDir": "./src",
    "routes": {
      "/products/:id": "index.html"
    }
  }
}
```

## The entire project structure after conversion to SPA

```text
└── 📁da-shop
  └── 📁_project-diary
    └── 📁assets
      └── 📁img
        ├── npm-init.png
        ├── project-folder-structure.png
    ├── 01_project-planning.md
    ├── 02_project-initializing.md
    ├── 03_create-single-page-application.md
    ├── 04_first-design-steps.md
  └── 📁src
  └── 📁assets
      └── 📁icons
      └── 📁img
  └── 📁backend
      ├── db.json
  └── 📁views
      └── 📁AboutView
          ├── About.js
      └── 📁ContactView
          ├── Contact.js
      └── 📁HomeView
          ├── Home.js
      └── 📁ProductsView
          ├── Products.js
      └── 📁SingleProductView
          ├── SingleProduct.js
      ├── AbstractView.js
    ├── index.html
    ├── script.js
    ├── styles.css
  ├── biome.json
  ├── bs-config.json
  ├── input.css
  ├── package-lock.json
  ├── package.json
  └── README.md
```

## Epilog

Phew, that was quite a lot, wasn't it? The next steps in the development of our project will be easier. Promise!

We will improve some things in further development, e.g., communication with our backend via service files or error handling. At this point, the main focus was on creating a functioning single-page application (SPA).

One last note: some of the code blocks here contain “console.log” statements and very detailed documentation. I recommend that you do not transfer these one-to-one into the code, as this would make the code unreadable. This is only intended to provide a better explanation in this tutorial.

## Links

- [lite-server](https://www.npmjs.com/package/lite-server)
- [concurrently](https://github.com/open-cli-tools/concurrently)
- [Tutorial Video from dcode Part 1](https://www.youtube.com/watch?v=6BozpmSjk-Y&list=PLw5h0DiJ-9PBXb6SnjLxAQH6ecMYz3Wjs)
- [Tutorial Video from dcode Part 2](https://www.youtube.com/watch?v=OstALBk-jTc)
- [JavaScript Guide Modules from MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- [JavaScript Reference import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)
- [JavaScript Reference export](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export)
- [JavaScript Modules from w3schools](https://www.w3schools.com/js/js_modules.asp)
- [Browser History API](https://www.w3schools.home.jscom/js/js_api_history.asp)
