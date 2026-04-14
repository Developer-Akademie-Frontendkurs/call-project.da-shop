import employeeService from '../../../services/employee.service.js';
import AbstractView from '../../AbstractView.js';
import adminEmployeesTemplates from './AdminEmployeesTemplates.js';

export default class extends AbstractView {
    employees = []

    constructor() {
        super();
        this.setTitle('Admin - Employees | DA Shop');
        this.onInit();
    }

    async onInit() {
        await this.getEmployees();
        this.renderEmployeeList();
        this.setEventListeners();
    }

    setEventListeners() {
        const addEmployeeBtn = document.getElementById('add-employee-btn');
        addEmployeeBtn.addEventListener('click', () => {
            console.log('Add employee button clicked');
            const employeeDianlog = document.getElementById('employee-dialog');
            employeeDianlog.innerHTML = adminEmployeesTemplates.addEmployeeFormHTML();
            employeeDianlog.showModal();
        });
    }

    async getEmployees() {
        this.employees = await employeeService.loadEmployees();
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
            listEntry.innerHTML = adminEmployeesTemplates.employeeListItemHTML(employee);

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

            <div class="fab bottom-20 right-8">
                <div class="tooltip tooltip-neutral" data-tip="Add employee">
                    <button id="add-employee-btn" class="btn btn-xl btn-circle btn-primary">+</button>
                </div>
            </div>

            <dialog id="employee-dialog" class="modal">
                Das ist ein Test
            </dialog>
        `;
    }
}
