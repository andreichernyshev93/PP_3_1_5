document.addEventListener('DOMContentLoaded', async function () {
    await showUsernameNavbar()
    await tableCurrentUser();
});

async function dataAboutCurrentUser() {
    const response = await fetch("/api/user")
    return await response.json();
}

async function showUsernameNavbar() {
    const currentUsernameNavbar = document.getElementById("currentUsernameNavbar");
    const currentUser = await dataAboutCurrentUser();
    currentUsernameNavbar.innerHTML =
        `<strong>${currentUser.username}</strong>
                 with roles: 
                 ${currentUser.roles.map(role => role.name.substring(5)).join(' ')}`;
}

async function tableCurrentUser() {
    const currentUserTable = document.getElementById("usersTable");
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