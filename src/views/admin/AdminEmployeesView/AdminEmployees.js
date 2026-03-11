import employeeService from '../../../services/employee.service.js';
import AbstractView from '../../AbstractView.js';

export default class extends AbstractView {
    employees = []

    constructor() {
        super();
        this.setTitle('Admin - Employees | DA Shop');
        this.getEmployees();
    }

    async getEmployees() {
        this.employees = await employeeService.loadEmployees();
        this.renderEmployeeList();
    }

    renderEmployeeList() {
        const employeeList = document.getElementById('employee-list');
        employeeList.innerHTML = '';

        if (this.employees.length === 0) {
            employeeList.innerHTML = '<p>No Employees found.</p>';
            return;
        }

        this.employees.forEach(employee => {
            const listEntry = document.createElement('li');
            listEntry.classList.add('list-row', 'min-w-3xl', 'hover:bg-base-300', 'transition-colors');
            listEntry.innerHTML = `
                <div>
                    <img class="size-20 rounded-box" src="https://img.daisyui.com/images/profile/demo/1@94.webp" />
                </div>
                <div>
                    <div class="text-20 font-bold">${employee.first_name} ${employee.last_name}</div>
                    <div class="text-16 font-semibold opacity-60">Username: ${employee.username}</div>
                    <div class="text-16 font-semibold opacity-60">Email: ${employee.email}</div>
                    <div class="text-16 font-semibold opacity-60">Role: ${employee.role}</div>
                    <div class="text-16 font-semibold opacity-60">Superuser: ${employee.superuser}</div>
                </div>
                <button class="btn btn-square btn-ghost">
                    <svg class="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g
                            stroke-linejoin="round"
                            stroke-linecap="round"
                            stroke-width="2"
                            fill="none"
                            stroke="currentColor"
                        >
                            <path d="M6 3L20 12 6 21 6 3z" />
                        </g>
                    </svg>
                </button>
                <button class="btn btn-square btn-ghost">
                    <svg class="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g
                            stroke-linejoin="round"
                            stroke-linecap="round"
                            stroke-width="2"
                            fill="none"
                            stroke="currentColor"
                        >
                            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                        </g>
                    </svg>
                </button>
            `;

            employeeList.appendChild(listEntry);
        });
    }

    async getHTML() {
        return /*html*/ `
            <h1 class="text-center">Employee Management</h1>

            <section class="w-full flex flex-col items-center justify-start gap-6 p-6">
                <ul id="employee-list" class="list bg-base-200 rounded-box shadow-md">

                </ul>
            </section>
        `;
    }
}
