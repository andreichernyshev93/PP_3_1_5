async function deleteUser(userId) {
    await fetch(`/api/admin/${userId}`, {method: 'DELETE'});
}

const deleteModal = document.getElementById("deleteModal");

async function modalDeleteHandler() {
    await modal(deleteModal);
}

const deleteForm = document.getElementById("modalBodyDelete");
deleteForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const userId = event.target.querySelector("#delete-id").value;

    await deleteUser(userId);
    await tableAllUsers();

    const modalBootstrap = bootstrap.Modal.getInstance(deleteModal);
    modalBootstrap.hide();
})