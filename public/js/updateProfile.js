// const updateFirstNameInput = document.querySelector('#updateFirstNameInput');
// const updateLastNameInput = document.querySelector('#updateLastNameInput');
// const updateEmailInput = document.querySelector('#updateEmailInput');
// const enterPasswordInput = document.querySelector('#enterPasswordInput');

// const updateProfileSubmitBtn = document.querySelector('#updateProfileSubmit')

// updateProfileSubmitBtn.addEventListener('click', async (e) => {
//     e.preventDefault();

//     // Add if password matches what is in database then update
// })

// const updateProfileHandler = async (e) => {
//     e.preventDefault();
//     const firstName = updateFirstNameInput.value.trim();
//     const lastName = updateLastNameInput.value.trim();
//     const email = updateEmailInput.value.trim();
//     const password = enterPasswordInput.value


//     const response = await fetch(`api/profile/${id}`, {
//         method: 'PUT',  //Or did you PATCH romeo?
//         body: JSON.stringify( {firstName, lastName, email} ),
//         headers: { 'Content-Type': 'application/json' }
//     })
//     const data = await response.json();
//     return data
// }

const $updateButton = document.querySelector('#updateProfileSubmit')


const $updateFirst = document.querySelector('#updateFirstNameInput')
const $updateLast=document.querySelector('#updateLastNameInput')
const $updateEmail=document.querySelector('#updateEmailInput')

const updatedUser = async(e)=>{
    e.preventDefault()
    
    const updateFirst = $updateFirst.value.trim()
    const updateLast =$updateLast.value.trim()
    const updateEmail = $updateEmail.value.trim()

    if(updateFirst && updateLast && updateEmail){
        console.log(updateEmail, updateFirst, updateLast)
    const response = await fetch('/api/users/UDS', {
        method: 'PUT',
        body: JSON.stringify({ updateFirst, updateLast, updateEmail }),
        headers: { 'Content-Type': 'application/json' },
    })
    console.log(response)
    if(response.ok){ 
        document.location.replace('/users')
    }else{
        alert('Failed to create User to project ')
    } 
}


}

$updateButton.addEventListener('click', updatedUser)
