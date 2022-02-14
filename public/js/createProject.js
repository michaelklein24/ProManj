const projectNameInput = document.querySelector('#projectNameInput')
const projectDescInput = document.querySelector('#projectDescInput')
const projectEmailInput = document.querySelector('#projectEmailInput') //.value.trim();
const createProjectSubmit = document.querySelector('#createProjectSubmit')

const addEmailButton = document.querySelector('#addEmailButton');

// Contains all emails that will have access to new project
const emails = []

addEmailButton.addEventListener('click', () => {
    let email = projectEmailInput.value.trim();
    emails.push(email)
    console.log(emails)
    appendEmails()
})

function appendEmails() {
    const insertEmailSection = document.querySelectorAll('#emailList');
    let div = document.createElement('div');
    let h6 = document.createElement('h6');
    let button = document.createElement('button');

    button.classList.add('btn-close', 'btn-sm');
    div.classList.add('emailListiing', 'd-flex', 'gap-2', 'align-items-center')

    let content = emails[emails.length - 1];

    h6.innerHTML = content;

    console.log(h6)
    div.appendChild(h6);
    div.appendChild(button);

    insertEmailSection[0].appendChild(div)
}

projectDescInput.addEventListener('keydown', () => {
    let charsRemainingElement = document.querySelector('#charsRemaining');
    let string = projectDescInput.value.length + 1;
    let charsRemaining = (100 - string).toString();
    charsRemainingElement.innerHTML = charsRemaining;
})

//FETCH POST
const createProjectHandler = async (e) => {
    e.preventDefault();
    const name = projectNameInput.value.trim();
    const description = projectDescInput.value.trim();
console.log(name)
console.log(description)

    if (name && description) {
        const response = await fetch('/api/projects', {
            method: 'POST',
            body: JSON.stringify({ name, description, }),
            headers: { 'Content-Type': 'application/json' },
        })
        if(response.ok){
            document.location.replace('/users')
        }else{
            alert('Failed to create project')
        }
    }
}

createProjectSubmit.addEventListener('click', createProjectHandler)
