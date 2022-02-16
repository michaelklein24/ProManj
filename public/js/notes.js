const noteContainer = document.querySelector('#messagesList');
const addMessageButton = document.querySelector('#addMessageIcon');
const deleteNoteButton = document.querySelectorAll('#deleteNoteButton');
const saveNoteButton = document.querySelectorAll('#saveNoteButton');

const noteTitle = document.querySelectorAll('.messageContact');
const noteContent = document.querySelectorAll('#note_body');

const check = document.querySelector('.check');
const fill = document.querySelector('.fill');
const path = document.querySelector('.path');

const getNextNoteNumber = async () => {
    let response = await fetch('/api/note/');
    let data = await response.json();
    return Math.max(...data.map(object => Number(object.id))) + 1
};

const user_id = document.querySelector('#helloText').getAttribute('data-user_id')
console.log(user_id);

async function saveNote(id, note_title, note_content) {


    const response = await fetch(`/api/note/${id}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ note_title, note_content })
    })
    if (response.ok) {
        console.log('Note data has been sent to the server');
        addCheckMarkClasses()
    } else {
        console.error(response)
    }
};

async function deleteNote(id) {
    // let id = this.parentNode.parentNode.parentNode.getAttribute('data-note-id');
    const response = await fetch(`/api/note/${id}/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    if (response.ok) {
        console.log(`Delete request for note #${id} has been sent to the server`)
        addCheckMarkClasses()
    } else {
        console.error(response)
    }
};

async function createNote(id) {
    let noteTitle = 'Click to edit'
    let noteContent = 'Click to edit'

    const response = await fetch(`/api/note/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id, note_title: noteTitle, note_content: noteContent, user_id: user_id }),
    })
    if (response.ok) {
        console.log(`New note has been sent to server`)
        addCheckMarkClasses()
    } else {
        console.error(response)
    }
}

// =================================================================================================

function addCheckMarkClasses() {
    check.classList.add('check-complete', 'success');
    fill.classList.add('fill-complete', 'success');
    path.classList.add('path-complete');
}

addCheckMarkClasses()

function removeCheckMarkClasses() {
    check.classList.remove('check-complete', 'success');
    fill.classList.remove('fill-complete', 'success');
    path.classList.remove('path-complete');
}

let typingTimer
let timeLength = 200;

noteTitle.forEach(title => title.addEventListener('keyup', (e) => {
    let id = e.target.parentNode.getAttribute('data-note-id')
    let note_title = e.target.innerHTML
    let note_content = e.target.parentNode.parentNode.children[1].children[0].innerHTML
    removeCheckMarkClasses()

    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {
        saveNote(id, note_title, note_content);
    }, timeLength)
}))

noteTitle.forEach(title => title.addEventListener('keydown', () => {
    clearTimeout(typingTimer)
}));

noteContent.forEach(content => content.addEventListener('keyup', (e) => {
    let id = e.target.parentNode.parentNode.children[0].getAttribute('data-note-id')
    let note_title = e.target.parentNode.parentNode.children[0].children[0].innerHTML
    let note_content = e.target.innerHTML
    removeCheckMarkClasses()

    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {
        saveNote(id, note_title, note_content);
    }, timeLength)
}))

noteContent.forEach(content => content.addEventListener('keydown', () => {
    clearTimeout(typingTimer)
}));

saveNoteButton.forEach(button => button.addEventListener('click', () => {
    let id = this.parentNode.parentNode.parentNode.getAttribute('data-note-id')
    console.log(id)
    let noteTitle = this.parentNode.previousElementSibling.innerText
    let noteContent = this.parentNode.parentNode.nextElementSibling.children[0].innerText
    saveNote
}));


async function appendNote() {
    let noteID = await getNextNoteNumber()
    const divEl = document.createElement('div');
    content = `<div class="d-flex justify-content-between align-items-center messageListing collapsible" data-note-id=${noteID}>
    <h3 class="messageContact collapsible" contenteditable='true'>Click to edit</h3><div class='d-flex gap-3'><img id='deleteNoteButton' src="/img/bin.png"></div></div><div class="noteContent"><h3 contenteditable='true'>Click to edit</h3></div>`
    divEl.innerHTML = content
    divEl.classList.add('d-flex', 'flex-column')

    let newNoteTitle = divEl.children[0].children[0];
    let newNoteContent = divEl.children[1].children[0];
    let newNoteId = divEl.children[0].getAttribute('data-note-id');

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
            // let id = e.target.parentNode.parentNode.getAttribute('data-note-id');
            deleteNoteBtn.parentNode.parentNode.parentNode.remove()
            deleteNote(newNoteId)
        }
    })

    console.log(newNoteTitle)

    newNoteTitle.addEventListener('keyup', (e) => {
        let note_title = e.target.innerHTML
        let note_content = e.target.parentNode.parentNode.children[1].children[0].innerHTML
        removeCheckMarkClasses()

        clearTimeout(typingTimer);
        typingTimer = setTimeout(() => {
            saveNote(newNoteId, note_title, note_content);
        }, timeLength)
    })

    newNoteTitle.addEventListener('keydown', () => {
        clearTimeout(typingTimer)
    });

    newNoteContent.addEventListener('keyup', (e) => {
        let note_title = e.target.innerHTML
        let note_content = e.target.parentNode.parentNode.children[1].children[0].innerHTML
        removeCheckMarkClasses()

        clearTimeout(typingTimer);
        typingTimer = setTimeout(() => {
            saveNote(newNoteId, note_title, note_content);
        }, timeLength)
    })

    newNoteContent.addEventListener('keydown', () => {
        clearTimeout(typingTimer)
    });

    noteContainer.appendChild(divEl)

    createNote(noteID)
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
            let id = e.target.parentNode.parentNode.getAttribute('data-note-id');
            console.log(id)
            deleteNoteBtn.parentNode.parentNode.parentNode.remove()
            deleteNote(id)
        }
    })
})

addMessageButton.addEventListener('click', appendNote);
