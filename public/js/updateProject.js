const updateFirstNameInput = document.querySelector('#updateFirstNameInput');
const updateLastNameInput = document.querySelector('#updateLastNameInput');
const updateEmailInput = document.querySelector('#updateEmailInput');
const enterPasswordInput = document.querySelector('#enterPasswordInput');

const updateProfileSubmitBtn = document.querySelector('#updateProfileSubmit')

updateProfileSubmitBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    // Add if password matches what is in database then update
})

const updateProfileHandler = async (e) => {
    e.preventDefault();
    const firstName = updateFirstNameInput.value.trim();
    const lastName = updateLastNameInput.value.trim();
    const email = updateEmailInput.value.trim();
    const password = enterPasswordInput.value


    const response 
    const data = await response.json();
    return data= await fetch(`api/profile/${id}`, {
        method: 'PUT',  //Or did you PATCH romeo?
        body: JSON.stringify( {firstName, lastName, email} ),
        headers: { 'Content-Type': 'application/json' }
    })
}