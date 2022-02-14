const noteContainer = document.querySelector('#messagesList');
const addMessageButton = document.querySelector('#addMessageIcon');
const deleteNoteButton = document.querySelectorAll('#deleteNoteButton');
const saveNoteButton = document.querySelectorAll('#saveNoteButton');

async function saveNote() {
    let id = this.parentNode.parentNode.parentNode.getAttribute('data-note-id')
    console.log(id)
    let noteTitle = this.parentNode.previousElementSibling.innerText
    let noteContent = this.parentNode.parentNode.nextElementSibling.children[0].innerText

    const response = await fetch(`api/notes/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ noteTitle, noteContent })
    })
    if (response.ok) {
        console.log('Note data has been sent to the server');
    } else {
        console.error(response)
    }
}

async function deleteNote(id) {
    // let id = this.parentNode.parentNode.parentNode.getAttribute('data-note-id');
    const response = await fetch(`api/notes/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    if (response.ok) {
        console.log(`Delete request for note #${id} has been sent to the server`)
    } else {
        console.error(response)
    }
}

async function createNote() {
    let noteTitle = 'Click to edit'
    let noteContent = 'Click to edit'

    const response = await fetch(`api/notes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: { noteTitle, noteContent },
    })
    if (response.ok) {
        console.log(`New note has been sent to server`)
        appendNote();
    } else {
        alert("Problem connecting to server.  Note will not be created")
        console.error(response)
    }
}

function appendNote() {
    const divEl = document.createElement('div');
    content = `<div class="d-flex justify-content-between align-items-center messageListing collapsible">
    <h3 class="messageContact collapsible" contenteditable='true'>Click to Edit</h3><div class='d-flex gap-3'><img id='saveNoteButton' src="/img/save.png"><img id='deleteNoteButton' src="/img/bin.png"></div></div><div class="noteContent"><h3 contenteditable='true'>Click to edit</h3></div>`
    divEl.innerHTML = content
    divEl.classList.add('d-flex', 'flex-column')

    // ADDS COLLAPSIBLE EVENT LISTENER TO NEWLY ADDED NOTES (NEED!)
    divEl.addEventListener('click', (e) => {
        if (e.target.classList.value.includes('messageListing')) {
            let target = e.target.nextElementSibling
            console.log(target)
            if (!target.style.display) {
                target.style.display = 'block'
                // } else if (target.style.display === 'block') {
                //     target.style.display = 'none'
            } else if (target.style.display === 'none') {
                target.style.display = 'block'
            }
        }
    })

    // ADDS COLLAPSIBLE EVENT LISTENER TO NEWLY ADDED NOTES (NEED!)
    divEl.addEventListener('click', (e) => {
        if (e.target.classList.value.includes('messageListing')) {
            e.target.classList.toggle("active");
            var content = e.target.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        }
    })

    //ADDS DELETE NOTE EVENT LISTENER 
    divEl.addEventListener('click', (e) => {
        if (e.target.getAttribute('id') == 'deleteNoteButton') {
            let deleteNoteBtn = e.target;
            deleteNoteBtn.parentNode.parentNode.parentNode.remove()
        }
        let id = this.parentNode.parentNode.parentNode.getAttribute('data-note-id')
        deleteNote(id)
    })
    noteContainer.appendChild(divEl)
}

// MAKES ALL INITIALLY LOADED NOTES COLLAPSIBLE!!!
let collapsible = document.getElementsByClassName("collapsible");

for (let i = 0; i < collapsible.length; i++) {
    collapsible[i].addEventListener('click', function (e) {
        // console.log(collapsible[i].nextElementSibling)
        if (e.target.classList.value.includes('messageListing')) {
            let target = collapsible[i].nextElementSibling
            if (!target.style.display) {
                target.style.display = 'block'
            } else if (target.style.display === 'none') {
                target.style.display = 'block'
            }
        }
    })
}

for (let i = 0; i < collapsible.length; i++) {
    collapsible[i].addEventListener("click", function (e) {
        if (e.target.classList.value.includes('messageListing')) {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        }
    });
}

//EVENT DELEGATION FOR DELETING ALREADY CREATED NOTES

deleteNoteButton.forEach(button => {
    button.addEventListener('click', (e) => {
        if (e.target.getAttribute('id') == 'deleteNoteButton') {
            let deleteNoteBtn = e.target;
            deleteNoteBtn.parentNode.parentNode.parentNode.remove()
        }
        let id = e.target.parentNode.parentNode.parentNode.getAttribute('data-note-id')
        deleteNote(id)
    })
})

addMessageButton.addEventListener('click', createNote);
saveNoteButton.forEach(button => button.addEventListener('click', saveNote));