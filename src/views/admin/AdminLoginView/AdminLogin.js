import AbstractView from '../../AbstractView.js';
import employeeService from '../../../services/employee.service.js';

export default class extends AbstractView {
    products = [];

    constructor() {
        super();
        this.setTitle('Login | DA Shop Admin');
        window.login = this.onLogin.bind(this);
    }

    onLogin() {
        console.log('Login button clicked');
        if (this.validateEmployeeData()) {
            document.cookie = "admin=true; path=/";
            window.location.href = '/admin';
        }
    }

    validateEmployeeData() {
        const loginData = document.forms['loginForm'];
        const username = loginData['username'].value;
        const password = loginData['password'].value;
        const employee = employeeService.getEmployeeByName(username);

        if (!username || !password) {
            this.showErrorMessage('Please enter both username and password');
            return false;
        }
        if (!employee) {
            this.showErrorMessage('Invalid username or password');
            return false;
        }
        return true
    }

    showErrorMessage(message) {
        const errorMessageDiv = document.getElementById('errorMessage');
        errorMessageDiv.textContent = message;
        errorMessageDiv.classList.add('text-red-500', 'font-semibold');
    }

    async getHTML() {
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
                        <form name="loginForm" onsubmit="event.preventDefault(); login();" class="flex flex-col gap-4 w-full max-w-xs">
                            <input name="username" type="text" placeholder="Username" autocomplete="username" class="input input-bordered w-full max-w-xs" />
                            <input name="password" type="password" placeholder="Password" class="input input-bordered w-full max-w-xs" />
                            <div class="card-actions w-full justify-between items-center flex-nowrap">
                                <p id="errorMessage"></p>
                                <button id="loginBtn" class="btn btn-primary" type="submit">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        `;
    }
}
