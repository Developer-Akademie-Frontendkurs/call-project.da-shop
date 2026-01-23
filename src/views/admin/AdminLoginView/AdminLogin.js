import AbstractView from '../../AbstractView.js';

export default class extends AbstractView {
    products = [];

    constructor() {
        super();
        this.setTitle('Login');
    }

    onLogin() {
        document.cookie = "admin=true; path=/";
        window.location.href = '/admin';
    }

    async getHTML() {
        setTimeout(() => {
            const loginBtn = document.getElementById('loginBtn');
            loginBtn.addEventListener('click', () => this.onLogin());
        }, 0);

        return /*html*/ `
            <section class="flex justify-center items-center w-full min-h-[calc(100vh-180px)]">
                <div class="card lg:card-side bg-base-200 max-w-[900px] min-h-[600px] shadow-sm">
                    <figure class="w-full lg:w-4/10">
                        <img class="w-full object-cover"
                        src="../../../assets/img/admin-login.jpg"
                        alt="Admin Login" />
                    </figure>
                    <div class="card-body flex items-center justify-center gap-6">
                        <h1 class="card-title">da-shop - Admin Login</h1>
                        <input type="text" placeholder="Username" class="input input-bordered w-full max-w-xs" />
                        <input type="password" placeholder="Password" class="input input-bordered w-full max-w-xs" />
                        <div class="card-actions justify-end">
                            <button id="loginBtn" class="btn btn-primary">Login</button>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }
}
