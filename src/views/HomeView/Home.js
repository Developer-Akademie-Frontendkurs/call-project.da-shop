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

            <section class="flex flex-col gap-4 mt-8 text-18">
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos inventore quis quos dolorum totam? Debitis molestiae dignissimos repellendus corporis enim, fuga sapiente impedit dolore a ducimus tempore excepturi. Quasi, magnam.</p>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos inventore quis quos dolorum totam? Debitis molestiae dignissimos repellendus corporis enim, fuga sapiente impedit dolore a ducimus tempore excepturi. Quasi, magnam.</p>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos inventore quis quos dolorum totam? Debitis molestiae dignissimos repellendus corporis enim, fuga sapiente impedit dolore a ducimus tempore excepturi. Quasi, magnam.</p>
                <div class="card bg-base-100 w-96 shadow-sm">
                    <figure>
                        <img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" alt="Shoes" />
                    </figure>
                    <div class="card-body bg-base-300">
                        <h2 class="card-title">Card Title</h2>
                        <p class="text-16 text-stone-700 dark:text-stone-400">A card component has a figure, a body part, and inside body there are title and actions parts</p>
                        <div class="card-actions justify-end">
                            <button class="btn btn-primary">Buy Now</button>
                        </div>
                    </div>
                </div>

                <div class="join join-vertical bg-base-300">
                    <div class="collapse collapse-arrow join-item border-base-300 border">
                        <input type="radio" name="my-accordion-4" checked="checked" />
                        <div class="collapse-title font-semibold">How do I create an account?</div>
                        <div class="collapse-content text-sm">Click the "Sign Up" button in the top right corner and follow the registration process.</div>
                    </div>
                    <div class="collapse collapse-arrow join-item border-base-300 border">
                        <input type="radio" name="my-accordion-4" />
                        <div class="collapse-title font-semibold">I forgot my password. What should I do?</div>
                        <div class="collapse-content text-sm">Click on "Forgot Password" on the login page and follow the instructions sent to your email.</div>
                    </div>
                    <div class="collapse collapse-arrow join-item border-base-300 border">
                        <input type="radio" name="my-accordion-4" />
                        <div class="collapse-title font-semibold">How do I update my profile information?</div>
                        <div class="collapse-content text-sm">Go to "My Account" settings and select "Edit Profile" to make changes.</div>
                    </div>
                </div>
            </section>
            <section id="products-content">

            </section>
        `;
    }
}
