import About from './views/AboutView/About.js';
import Contact from './views/ContactView/Contact.js';
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
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g).map((result) => result[1]));
    return Object.fromEntries(
        keys.map((key, index) => {
            return [key, values[index]];
        })
    );
};

const navigateTo = (url) => {
    history.pushState(null, null, url);
    router();
};

const router = async () => {
    const routes = [
        { path: '/', view: Home },
        { path: '/products', view: Products },
        { path: '/products/:id', view: SingleProduct },
        { path: '/about', view: About },
        { path: '/contact', view: Contact },
    ];

    const potentialMatches = routes.map((route) => {
        return {
            route: route,
            result: location.pathname.match(pathToRegex(route.path))
        }
    });

    let match = potentialMatches.find((potentialMatch) => potentialMatch.result !== null);

    if (!match) {
        console.error('No matching route found for: ', location.pathname);
        match = {
            route: routes[0],
            result: true
        }
    }

    const view = new match.route.view(getParams(match));
    document.getElementById('content').innerHTML = await view.getHTML();
}

window.addEventListener('popstate', router)

document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('click', (event) => {
        if (event.target.matches('[data-link]')) {
            event.preventDefault();
            navigateTo(event.target.href);
        }
    });
});

router();
