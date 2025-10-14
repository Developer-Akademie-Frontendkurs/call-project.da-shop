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
                <p>${product.product_name}</p>
            `;
        }
    }

    async getHTML() {
        return /*html*/ `
            <h1>Welcome to Da-Shop</h1>
            <p>Your one-stop shop for all things stylish and sustainable.</p>
                    <div class="btn btn-secondary">Shop Now</div>
                    <div class="btn btn-primary">Shop Now</div>

            <section class="flex flex-col gap-4 mt-8">
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos inventore quis quos dolorum totam? Debitis molestiae dignissimos repellendus corporis enim, fuga sapiente impedit dolore a ducimus tempore excepturi. Quasi, magnam.</p>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos inventore quis quos dolorum totam? Debitis molestiae dignissimos repellendus corporis enim, fuga sapiente impedit dolore a ducimus tempore excepturi. Quasi, magnam.</p>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos inventore quis quos dolorum totam? Debitis molestiae dignissimos repellendus corporis enim, fuga sapiente impedit dolore a ducimus tempore excepturi. Quasi, magnam.</p>
            </section>
            <section id="products-content">

            </section>
        `;
    }
}
