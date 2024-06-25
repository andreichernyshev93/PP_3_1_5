async function addNewUser(user) {
    await fetch("/api/admin",
        {method: "POST", headers: {'Content-type': 'application/json'}, body: JSON.stringify(user)})
}

async function newUserForm() {
    const userForm = document.getElementById("newUserForm");

    userForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const username = userForm.querySelector("#username").value;
        const password = userForm.querySelector("#password").value;
        const age = userForm.querySelector("#age").value;
        const email = userForm.querySelector("#email").value;

        const rolesSelected = document.getElementById("role");

        let roles = [];
        for (let option of rolesSelected.selectedOptions) {
            if (option.value === ROLE_USER.id.toString()) {
                roles.push(ROLE_USER);
            } else if (option.value === ROLE_ADMIN.id.toString()) {
                roles.push(ROLE_ADMIN);
            }
        }

        const newUser = {
            username: username,
            password: password,
            age: age,
            email: email,
            roles: roles
        };

        await addNewUser(newUser);
        userForm.reset();

        document.querySelector('a#userTable-tab').click();
        await tableAllUsers();
    });
}
