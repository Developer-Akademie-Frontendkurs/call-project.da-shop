import About from './views/AboutView/About.js';
import Contact from './views/ContactView/Contact.js';
import Home from './views/HomeView/Home.js';
import Products from './views/Products/ProductsView.js';
import SingleProduct from './views/SingleProduct/SingleProductView.js';

const pathToRegex = (path) => new RegExp(`^${path.replace(/\//g, '\\/').replace(/:\w+/g, '(.+)')}$`);

const getParams = (match) => {
    const values = match.result.slice(1)
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g).map((result) => result[1]));
    console.log('🔧 Extracted Params:', { keys: keys, values: values });
    return Object.fromEntries(
        keys.map((key, index) => {
            return [key, values[index]];
        })
    )
}

const navigateTo = (url) => {
    // Ändert die URL in der Adressleiste, ohne die Seite neu zu laden.
    history.pushState(null, null, url);
    // Ruft den Router auf, um den Inhalt der Seite entsprechend der neuen URL zu aktualisieren.
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

    console.log('potential matches: ', potentialMatches);
    console.log('matched route: ', match);
    console.log('current path from match: ', match ? match.route.path : 'no match found');
    // console.log('match view: ', match.route.view());
    console.log('current path from location: ', location.pathname);
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
