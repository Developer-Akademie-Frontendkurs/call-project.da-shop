import AbstractView from '../AbstractView.js';

export default class extends AbstractView {
    products = [];

    constructor() {
        super();
        this.setTitle('Home');
        this.loadNewsletterSection();
    }

    loadNewsletterSection() {
        const footer = document.querySelector('footer.footer');
        const newsletterSection = document.createElement('section');
        newsletterSection.classList.add('bg-base-200');
        newsletterSection.innerHTML = /*html*/ `
            <div class="max-w-[1440px] mx-auto py-20 px-8">
                <h2 class="mb-4">Newsletter</h2>
                <div>
                    <p>Subscribe to our newsletter to receive the latest updates and offers.</p>
                    <form class="mt-4 flex flex-col sm:flex-row gap-4">
                        <input type="email" placeholder="Enter your email" class="input input-bordered w-full sm:w-auto flex-1" required />
                        <label class="flex items-center gap-2">
                            <input type="checkbox" required class="checkbox checkbox-primary" />
                            <span>
                                I accept the <a href="/privacy-policy" class="link link-primary" target="_blank">privacy policy</a>
                            </span>
                        </label>
                        <button type="submit" class="btn btn-accent">Subscribe</button>
                    </form>
                </div>
            </div>
        `;
        footer.insertAdjacentElement('beforebegin', newsletterSection);
    }

    async getHTML() {
        return /*html*/ `
            <section class="hero h-[calc(100vh-128px)] rounded-3xl" style="background-image: url(./assets/img/bg-hero.png);">
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

            <section class="mt-8 mb-16">
                <h2 class="mb-4">Sale</h2>
                <div id="special-offers" class="flex flex-row-reverse gap-10">
                    <article class="card w-96">
                        <figure class="rounded-lg">
                            <img src="https://picsum.photos/id/598/600/400" alt="">
                        </figure>
                        <div class="card-body py-2 pt-2 px-2">
                            <h2 class="card-title">Card Title</h2>
                            <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                            <div class="card-actions justify-end">
                                <button class="btn btn-primary">Buy Now</button>
                            </div>
                        </div>
                    </article>
                    <article class="card w-96">
                        <figure class="rounded-lg">
                            <img src="https://picsum.photos/id/642/600/400" alt="">
                        </figure>
                        <div class="card-body py-2 pt-2 px-2">
                            <h2 class="card-title">Card Title</h2>
                            <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                            <div class="card-actions justify-end">
                                <button class="btn btn-primary">Buy Now</button>
                            </div>
                        </div>
                    </article>
                    <article class="card w-96">
                        <figure class="rounded-lg">
                            <img src="https://picsum.photos/id/743/600/400" alt="">
                        </figure>
                        <div class="card-body py-2 pt-2 px-2">
                            <h2 class="card-title">Card Title</h2>
                            <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                            <div class="card-actions items-center justify-end pt-2">
                                <button class="btn btn-primary">Buy Now</button>
                                <p class="text-xl text-right"><span class="text-base-content text-lg line-through"></span> 19,99 €</p>
                            </div>
                        </div>

                    </article>
                    <article class="card w-96">
                        <figure class="rounded-lg">
                            <img src="https://picsum.photos/id/1020/600/400" alt="">
                        </figure>
                        <div class="card-body p-2">
                            <h2 class="card-title">Card Title</h2>
                            <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                            <div class="card-actions items-center pt-2">
                                <button class="btn btn-primary">Buy Now</button>
                                <p class="text-error dark:text-success text-xl text-right"><span class="text-base-content text-lg line-through">29,99 €</span> 19,99 €</p>
                            </div>
                        </div>
                    </article>
                </div>
            </section>

            <section class="mb-16">
                <h2 class="mb-4">Our Commitment</h2>
                <p class="mb-4">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio deserunt voluptatum debitis assumenda vel modi sit non, autem nemo, quisquam accusantium iusto?
                    Reiciendis pariatur id quae rerum commodi magni provident! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur beatae, fuga quos illo d
                    ignissimos, adipisci quibusdam quam sequi dolorum soluta veritatis rem repellendus nisi fugit debitis, vel deleniti reprehenderit doloremque?</p>
                <div class="flex justify-between gap-8">
                    <div class="card w-96 bg-base-200 card-lg shadow-sm">
                        <div class="card-body">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M9.669.864 8 0 6.331.864l-1.858.282-.842 1.68-1.337 1.32L2.6 6l-.306 1.854 1.337 1.32.842 1.68 1.858.282L8 12l1.669-.864 1.858-.282.842-1.68 1.337-1.32L13.4 6l.306-1.854-1.337-1.32-.842-1.68zm1.196 1.193.684 1.365 1.086 1.072L12.387 6l.248 1.506-1.086 1.072-.684 1.365-1.51.229L8 10.874l-1.355-.702-1.51-.229-.684-1.365-1.086-1.072L3.614 6l-.25-1.506 1.087-1.072.684-1.365 1.51-.229L8 1.126l1.356.702z"/>
                                <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1z"/>
                            </svg>
                            <h2 class="card-title">Large Card</h2>
                            <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                        </div>
                    </div>

                    <div class="card w-96 bg-base-200 card-lg shadow-sm">
                        <div class="card-body">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-cart-check" viewBox="0 0 16 16">
                                <path d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0z"/>
                                <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
                            </svg>
                            <h2 class="card-title">Large Card</h2>
                            <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                        </div>
                    </div>

                    <div class="card w-96 bg-base-200 card-lg shadow-sm">
                        <div class="card-body">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-people" viewBox="0 0 16 16">
                                <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4"/>
                            </svg>
                            <h2 class="card-title">Large Card</h2>
                            <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                        </div>
                    </div>
                </div>
            </section>

            <section class="mb-16">
                <h2 class="mb-4">New Arrivals</h2>
                <div id="new-arrivals" class="flex gap-8">
                    <article class="card bg-base-300 w-96 shadow-sm">
                        <figure>
                            <img src="https://picsum.photos/id/598/600/400" alt="">
                        </figure>
                        <div class="card-body">
                            <h2 class="card-title">Card Title</h2>
                            <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                            <div class="card-actions justify-end">
                                <button class="btn btn-primary">Buy Now</button>
                            </div>
                        </div>
                    </article>
                    <article class="card bg-base-300 w-96 shadow-sm">
                        <figure>
                            <img src="https://picsum.photos/id/642/600/400" alt="">
                        </figure>
                        <div class="card-body">
                            <h2 class="card-title">Card Title</h2>
                            <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                            <div class="card-actions justify-end">
                                <button class="btn btn-primary">Buy Now</button>
                            </div>
                        </div>
                    </article>
                    <article class="card bg-base-300 w-96 shadow-sm">
                        <figure>
                            <img src="https://picsum.photos/id/743/600/400" alt="">
                        </figure>
                        <div class="card-body">
                            <h2 class="card-title">Card Title</h2>
                            <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                            <div class="card-actions justify-end">
                                <button class="btn btn-primary">Buy Now</button>
                            </div>
                        </div>
                    </article>
                    <article class="card bg-base-300 w-96 shadow-sm">
                        <figure>
                            <img src="https://picsum.photos/id/1020/600/400" alt="">
                        </figure>
                        <div class="card-body">
                            <h2 class="card-title">Card Title</h2>
                            <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                            <div class="card-actions justify-end">
                                <button class="btn btn-primary">Buy Now</button>
                            </div>
                        </div>
                    </article>
                </div>
            </section>
        `;
    }
}
