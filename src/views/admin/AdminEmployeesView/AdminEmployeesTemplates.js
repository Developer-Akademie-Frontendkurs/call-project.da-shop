class AdminEmployeesTemplates {
    employeeListItemHTML(employee) {
        return /*html*/ `
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
    }

    addEmployeeFormHTML() {
        return /*html*/ `
            <div class="modal-box">
                <div class="flex justify-between items-center">
                    <h3 class="text-lg font-bold">Add employee</h3>
                    <button>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                    </svg>
                    </button>
                </div>

                <form id="add-employee-form" class="flex flex-col gap-4 mt-4">
                    <input type="text" name="first_name" placeholder="First Name" class="input input-bordered w-full" required />
                    <input type="text" name="last_name" placeholder="Last Name" class="input input-bordered w-full" required />
                    <input type="text" name="username" placeholder="Username" class="input input-bordered w-full" required />
                    <input type="email" name="email" placeholder="Email" class="input input-bordered w-full" required />
                    <input type="password" name="password" placeholder="Password" class="input input-bordered w-full" required />
                    <input type="text" name="role" placeholder="Role" class="input input-bordered w-full" required />
                    <div class="form-control w-full">
                        <label class="label">
                            <span class="">Profile Picture</span>
                        </label>
                        <input type="file" name="image" id="employee-image-input" class="file-input file-input-bordered w-full" accept="image/*" />
                    </div>
                    <div class="modal-action">
                        <button type="submit" class="btn btn-primary">Add Employee</button>
                        <button type="button" class="btn btn-ghost" onclick="document.getElementById('employee-dialog').close()">Cancel</button>
                    </div>
                </form>
            </div>
        `;
    }
}

const adminEmployeesTemplates = new AdminEmployeesTemplates();
export default adminEmployeesTemplates;
