# Add first admin views

- [Introduction](#introduction)
- [Create the admin area](#create-the-admin-area)
  - [Create the admin folder and the first view](#create-the-admin-folder-and-the-first-view)
  - [Create the admin products view](#create-the-admin-products-view)
  - [Create the admin single product view](#create-the-admin-single-product-view)
- [Add admin views to the router](#add-admin-views-to-the-router)

## Introduction

We want to provide a password-protected area for managing products, orders, employees, etc.

It should be noted that in reality, a different approach would be taken with regard to security aspects such as password security. However, our project is about understanding the basic concepts and how they work.

The first basic views are created here. As the project progresses, we will continue to adapt and improve these views and the basic structure.

## Create the admin area

### Create the admin folder and the first view

- create a new folder `admin` in `./src/views/`
- in this new folder create another folder `AdminLoginView`
- now create a new file `AdminLogin.js`

```js
// ./src/views/admin/AdminLoginView/AdminLogin.js

import AbstractView from '../../AbstractView.js';

export default class extends AbstractView {
    products = [];

    constructor() {
        super();
        this.setTitle('Login');
    }

    async getHTML() {
        return /*html*/ `
           <h1>Login</h1>
           <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis, facere sapiente quasi consectetur eius
           illum expedita iste consequuntur aut molestias neque enim totam. Recusandae pariatur quod nihil officia libero
           obcaecati!</p>
           <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis, facere sapiente quasi consectetur
           eius illum expedita iste consequuntur aut molestias neque enim totam. Recusandae pariatur quod nihil officia
           libero obcaecati!</p>
           `;
    }
}
```

### Create the admin products view

- create a new folder `./src/views/admin/AdminProductsView`
- create a new file in this folder `./src/views/admin/AdminProductsView/AdminProducts.js`

```js
// ./src/views/admin/AdminProductsView/AdminProducts.js

import AbstractView from '../../AbstractView.js';

export default class extends AbstractView {
    products = [];

    constructor() {
        super();
        this.setTitle('Products');
    }

    async getHTML() {
        return /*html*/ `
           <h1>Products</h1>
           <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis, facere sapiente quasi consectetur
           eius illum expedita iste consequuntur aut molestias neque enim totam. Recusandae pariatur quod nihil officia
           libero obcaecati!</p>
           <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis, facere sapiente quasi consectetur eius
           illum expedita iste consequuntur aut molestias neque enim totam. Recusandae pariatur quod nihil officia
           libero obcaecati!</p>
           <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis, facere sapiente quasi consectetur
           eius illum expedita iste consequuntur aut molestias neque enim totam. Recusandae pariatur quod nihil officia
           libero obcaecati!</p>
           `;
    }
}
```

### Create the admin single product view

- create a new folder `./src/views/admin/AdminSingleProductView`
- create a new file in this folder `./src/views/admin/AdminProductsView/AdminSingeProduct.js`

```js
// ./src/views/admin/AdminProductsView/AdminSingleProduct.js

import AbstractView from '../../AbstractView.js';

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle('Single Product');
    }

    async getHTML() {
        return /*html*/ `
           <h1>Single Product</h1>
           <img src="https://picsum.photos/id/1020/600/400" alt="">
           <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis, facere sapiente quasi consectetur
           eius illum expedita iste consequuntur aut molestias neque enim totam. Recusandae pariatur quod nihil officia
           libero obcaecati!</p>
           <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis, facere sapiente quasi consectetur
           eius illum expedita iste consequuntur aut molestias neque enim totam. Recusandae pariatur quod nihil officia
           libero obcaecati!</p>
           <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis, facere sapiente quasi consectetur
           eius illum expedita iste consequuntur aut molestias neque enim totam. Recusandae pariatur quod nihil officia
           libero obcaecati!</p>
           `;
    }
}
```

## Add admin views to the router

```diff
// ./src/script.js

import NotFound from './views/404View/NotFound.js';
import About from './views/AboutView/About.js';
+ import AdminLogin from './views/admin/AdminLoginView/AdminLogin.js';
+ import AdminProducts from './views/admin/AdminProductsView/AdminProducts.js';
+ import AdminSingleProducts from './views/admin/AdminSingleProductView/AdminSingleProduct.js';
import Contact from './views/ContactView/Contact.js';
import Home from './views/HomeView/Home.js';
import Products from './views/ProductsView/Products.js';
import SingleProduct from './views/SingleProductView/SingleProduct.js';

// more code ...

const router = async () => {
    const routes = [
        { path: '/', view: Home },
        { path: '/404', view: NotFound },
        { path: '/products', view: Products },
        { path: '/products/:id', view: SingleProduct },
        { path: '/about', view: About },
        { path: '/contact', view: Contact },
+       { path: '/admin/', view: AdminLogin },
+       { path: '/admin/products', view: AdminProducts },
+       { path: '/admin/products/:id', view: AdminSingleProducts },
    ];

    const potentialMatches = routes.map((route) => {
        return {
            route: route,
            result: location.pathname.match(pathToRegex(route.path)),
        };
    });
```
