import AbstractView from '../AbstractView.js';

export default class extends AbstractView {
     products = [];

    constructor() {
        super();
        this.setTitle('Home');
    }

    async getHTML() {
        return /*html*/ `
            <section class="hero h-[calc(100vh-64px)]" style="background-image: url(./assets/img/bg-hero.png);">
                <div class="hero-overlay rounded-3xl"></div>
                <div class="hero-content text-neutral-content text-center">
                    <div class="max-w-md">
                    <h1 class="mb-5 text-5xl font-bold">New Season, New You</h1>
                    <p class="mb-5">
                        Discover fresh layers, modern tailoring, and effortless looks for every day—think sharp lines,
                        rich textures, and easy silhouettes that flex from weekday to weekend.
                    </p>
                    <button class="btn btn-primary">Shop now</button>
                    </div>
                </div>
            </section>
            <section class="mt-6">
                <h2 class="h2">New Arrivals</h2>
                <div>
                    <article>
                        <img src="https://picsum.photos/id/1029/200/200" alt="">
                        <h3>Titel</h3>
                    </article>
                </div>

            </section>
        `;
    }
}
