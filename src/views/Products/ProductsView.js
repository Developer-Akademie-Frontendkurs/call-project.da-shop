import AbstractView from '../AbstractView.js';

export default class extends AbstractView {
     products = [];

    constructor() {
        super();
        this.setTitle('Home');
        this.getProducts();
    }

    async getProducts() {
        const response = await fetch('http://localhost:3000/products');
        const responseAsJson = await response.json();
        this.products = responseAsJson;
        console.log('products: ', this.products)
        this.renderProducts();
    }

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
