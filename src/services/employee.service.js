class EmployeeService {
    employees = [];

    async loadEmployees() {
        console.log('fetching all employees');
        const url = 'http://localhost:8000/employees';
        const response = await fetch(url);
        this.employees = await response.json();
        console.log('Employees: ', this.employees);
        return this.employees;
    }

    async getEmployeeByName(username) {
        await this.loadEmployees();
        const employee = this.employees.find(employee => employee.username === username);
        if (employee) {
            console.log('Employee found: ', employee);
            return employee;
        } else {
            console.error('No employee with that username found');
        }
    }
}

const employeeService = new EmployeeService();
export default employeeService;
