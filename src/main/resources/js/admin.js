document.addEventListener('DOMContentLoaded', async function () {
    await showUsernameNavbar()
    await tableAllUsers();
    await tableCurrentUser();
    await modalEditHandler();
    await modalDeleteHandler();
    await newUserForm();
});

async function dataAboutCurrentUser() {
    const response = await fetch("/api/user")
    return await response.json();
}

async function dataAboutAllUsers() {
    const response = await fetch("/api/admin");
    return await response.json();
}

const ROLE_USER = {id: 2, name: "ROLE_USER"};
const ROLE_ADMIN = {id: 1, name: "ROLE_ADMIN"};

async function showUsernameNavbar() {
    const currentUsernameNavbar = document.getElementById("currentUsernameNavbar");
    const currentUser = await dataAboutCurrentUser();
    currentUsernameNavbar.innerHTML =
        `<strong>${currentUser.username}</strong>
                 with roles: 
                 ${currentUser.roles.map(role => role.name.substring(5)).join(' ')}`;
}

async function tableAllUsers() {
    const usersTable = document.getElementById("usersTable");
    const users = await dataAboutAllUsers();

    let usersHTML = "";
    for (let user of users) {
        usersHTML += `
            <tr>
                <td>${user.id}</td>
                <td>${user.username}</td>
                <td>${user.age}</td>
                <td>${user.email}</td>
                <td>${user.roles.map(role => role.name.substring(5)).join(' ')}</td>
                <td>
                    <button class="btn btn-sm btn-info text-white" data-bs-toggle="modal" data-bs-target="#editModal"
                            data-user-id="${user.id}">Edit</button>
                </td>
                <td>
                    <button class="btn btn-sm btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal"
                            data-user-id="${user.id}">Delete</button>
                </td>
            </tr>`;
    }
    usersTable.innerHTML = usersHTML;
}

async function tableCurrentUser() {
    const currentUserTable = document.getElementById("currentUser");
    const currentUser = await dataAboutCurrentUser();

    let currentUserHTML = "";
    currentUserHTML += `
        <tr>
            <td>${currentUser.id}</td>
            <td>${currentUser.username}</td>
            <td>${currentUser.age}</td>
            <td>${currentUser.email}</td>
            <td>${currentUser.roles.map(role => role.name.substring(5)).join(' ')}</td>
            <td>
        </tr>`
    currentUserTable.innerHTML = currentUserHTML;
}


