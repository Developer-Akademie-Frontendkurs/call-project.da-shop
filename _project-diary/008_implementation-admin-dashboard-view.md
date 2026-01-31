# Implementation Admin Dashboard View

- [Introduction](#introduction)
- [Creation of the Admin Dashboard View](#creation-of-the-admin-dashboard-view)
- [Implementing Authentication (Login)](#implementing-authentication-login)
  - [Creating the Login View](#creating-the-login-view)
  - [The Authentication Helper](#the-authentication-helper)

## Introduction

In this session, we focus on making the Admin area deeper and more secure. We will implement the main Dashboard view which serves as the landing page for administrators. Crucially, we will also implement a basic authentication mechanism to ensure that only logged-in users can access the admin pages.

## Creation of the Admin Dashboard View

First, we create the dashboard view. This will be the first page an admin sees after logging in.

Create a new file: `src/views/admin/AdminDashboardView/AdminDashboard.js`

```javascript
import AbstractView from '../../AbstractView.js';

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle('Admin Dashboard');
    }

    async getHTML() {
        return /*html*/ `
            <h1>Admin Dashboard</h1>
        `;
    }
}
```

Now, let's update our **Router** in `src/script.js` to map the `/admin` path to this new dashboard.

```javascript
// ... imports
import AdminDashboard from './views/admin/AdminDashboardView/AdminDashboard.js';

// ... inside router configuration
{ path: '/admin', view: AdminDashboard },
{ path: '/admin/login', view: AdminLogin },
// ...
```

We also update the **Admin Layout** (`src/shared/admin-layout.js`) to include a link to the Dashboard in the navigation menu, so we can easily navigate back to it.

```javascript
// Inside src/shared/admin-layout.js
// ...
<nav class="flex flex-col items-center space-y-8">
    <a href="./admin" data-link class="text-2xl font-semibold hover:text-primary transition-colors">Dashboard</a>
    <a href="./" data-link class="text-2xl font-semibold hover:text-primary transition-colors">Shop</a>
// ...
```

## Implementing Authentication (Login)

We need a way to log in. For this training project, we will simulate authentication using a simple browser cookie.

### Creating the Login View

We update `src/views/admin/AdminLoginView/AdminLogin.js`. We add a simple form and a handler that sets a cookie when the "Login" button is clicked.

```javascript
import AbstractView from '../../AbstractView.js';

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle('Login');
        // In a real app, you would bind events differently or use a framework
        // For now, we attach a global listener or handle it after render
    }

    onLogin() {
        // We set a simple cookie to simulate a logged-in state
        // path=/admin ensures it's available for admin routes
        document.cookie = "adminLogin=true; path=/admin";
        window.location.href = '/admin';
    }

    async getHTML() {
        // We attach the event listener after a short delay to ensure DOM is ready
        setTimeout(() => {
            const loginBtn = document.querySelector('#loginBtn');
            if (loginBtn) {
                loginBtn.addEventListener('click', () => this.onLogin());
            }
        }, 0);

        return /*html*/ `
            <section class="flex justify-center items-center w-full min-h-[calc(100vh-180px)]">
                <!-- ... Layout for login card ... -->
                    <h1 class="card-title">da-shop - Admin Login</h1>
                    <form action="" class="flex flex-col gap-4 w-full max-w-xs">
                        <input type="text" placeholder="Username" autocomplete="username" class="input input-bordered w-full max-w-xs" />
                        <input type="password" placeholder="Password" class="input input-bordered w-full max-w-xs" />
                        <div class="card-actions justify-end">
                            <button id="loginBtn" class="btn btn-primary" type="button">Login</button>
                        </div>
                    </form>
                <!-- ... -->
            </section>
        `;
    }
}
```

### The Authentication Helper

To check if a user is logged in, we create a helper function.
Create a new file: `src/views/admin/admin.js`

```javascript
export function isAdminLoggedIn() {
    const cookies = document.cookie.split(';').map(cookie => cookie.trim());
    const adminCookie = cookies.find(cookie => cookie.startsWith('adminLogin='));

    // Check if cookie exists and has value 'true'
    if (!adminCookie || adminCookie.split('=')[1] !== 'true') {
        return false;
    }
    return true;
}
``
