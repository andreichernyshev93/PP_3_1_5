async function editUser(user) {
    await fetch("/api/admin",
        {method: "PATCH", headers: {'Content-type': 'application/json'}, body: JSON.stringify(user)})
}

const editModal = document.getElementById("editModal");

async function modalEditHandler() {
    await modal(editModal);
}

async function getUserById(userId) {
    const response = await fetch(`/api/admin/${userId}`);
    return await response.json();
}

async function modal(modal) {
    modal.addEventListener("show.bs.modal", async function (event) {

        const userId = event.relatedTarget.dataset.userId;

        const user = await getUserById(userId);

        const modalBody = modal.querySelector(".modal-body");

        const idInput = modalBody.querySelector("input[data-user-id='id']");
        const usernameInput = modalBody.querySelector("input[data-user-id='username']");
        const passwordInput = modalBody.querySelector("input[data-user-id='password']");
        const ageInput = modalBody.querySelector("input[data-user-id='age']");
        const emailInput = modalBody.querySelector("input[data-user-id='email']");

        if (passwordInput !== null) {
            passwordInput.value = user.password;
        }

        idInput.value = user.id;
        usernameInput.value = user.username;
        // passwordInput.value = '';
        ageInput.value = user.age;
        emailInput.value = user.email;

        let rolesSelect = HTMLSelectElement;

        let rolesSelectDelete = modalBody.querySelector("select[data-user-id='delete-role']");
        let rolesSelectEdit = modalBody.querySelector("select[data-user-id='edit-role']");
        let userRolesHTML = "";

        if (rolesSelectDelete !== null) {
            rolesSelect = rolesSelectDelete;
            for (let i = 0; i < user.roles.length; i++) {
                userRolesHTML +=
                    `<option value="${user.roles[i].name}">${user.roles[i].substring(5)}</option>`;
            }
        } else if (rolesSelectEdit !== null) {
            rolesSelect = rolesSelectEdit;
            userRolesHTML +=
                `<option value="ROLE_USER">USER</option>
                     <option value="ROLE_ADMIN">ADMIN</option>`
        }

        rolesSelect.innerHTML = userRolesHTML;
    })
}

editModal.addEventListener("submit", async function (event) {
    event.preventDefault();

    const rolesSelected = document.getElementById("edit-role");
    let roles = [];
    for (let option of rolesSelected.selectedOptions) {
        if (option.value === ROLE_USER.name) {
            roles.push(ROLE_USER);
        } else if (option.value === ROLE_ADMIN.name) {
            roles.push(ROLE_ADMIN);
        }
    }

    let user = {
        id: document.getElementById("edit-id").value,
        username: document.getElementById("edit-username").value,
        password: document.getElementById("edit-password").value,
        age: document.getElementById("edit-age").value,
        email: document.getElementById("edit-email").value,
        roles: roles
    }

    await editUser(user);
    await tableAllUsers();

    const modalBootstrap = bootstrap.Modal.getInstance(editModal);
    modalBootstrap.hide();
})
