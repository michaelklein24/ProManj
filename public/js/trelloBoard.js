let list_items = document.querySelectorAll('.list-item'); //targets all tasks items on page load
let lists = document.querySelectorAll('.list'); //targets all column lists on page load
const trelloBoard = document.querySelectorAll('#trelloBoard')[0].children; //targets trello board container that lists are in
let addTaskButton = document.querySelectorAll('.addTaskButton') //targets all tasks buttons on page load
let deleteListButton = document.querySelectorAll('#deleteListButton');
let container = document.querySelectorAll('#trelloBoard')[0]

const movableTaskText = document.querySelector('#moveableTasksH6');
const movableListText = document.querySelector('#moveableListsH6');

const textToggle = document.querySelector('#editTextToggle'); //targets toggle that will turn on and off text
const toggle = document.querySelector('#draggableToggle');  //targets toggle that will toggle between moveable lists and moveable tasks

let draggedItem = null;

//This will pull the highest id number for list/task and then any new list/task will be given an id after that to ensure no list/task is given the same id
next_list_id = Math.max(...[...lists].map(list => Number(list.getAttribute('data-list-id'))));
next_task_id = Math.max(...[...list_items].map(item => Number(item.getAttribute('data-task-id'))));

//This will give the list the next available position number
next_position = [...lists].length - 1;

const createTask = async (task_id, list_id) => {
    let taskContent = 'Click to enter text';

    const response = await fetch(`api/trello/tasks/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task_id, list_id, taskContent })
    })
    if (response.ok) {
        console.log('task creation POST request has been sent to the server')
    } else {
        console.error(response)
    }
}

const createList = async (position_id, list_id) => {
    let listContent = 'Click to enter text';

    const response = await fetch(`api/trello/lists`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ position_id, list_id, listContent })
    })
    if (response.ok) {
        console.log('list creation POST request has been sent to the server')
    } else {
        console.error(response)
    }
}

const deleteListColumn = async (id) => {
    const response = await fetch(`api/trello/lists/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    if (response.ok) {
        console.log('list deletion DELETE request has been sent to the server')
    } else {
        console.error(response)
    }
}

const updateLists = async (id, list_content, list_position) => {
    const response = await fetch(`api/trello/lists/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: { list_content, list_position, },
    });
    if (response.ok) {
        console.log('list update PUT request has been sent to the server')
    } else {
        console.error(response)
    }
}

// const updateTasks = async (list_id, task_Content) => {
//     const response = await fetch(`api/trello/tasks/`, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: { list_id, task_Content },
//     });
// }

// USER CLICKS ADD NEW LIST AND A NEW LIST APPENDS TO PAGE
const addList = () => {
    next_list_id++;
    next_position++;

    const newList = document.createElement('div');
    newList.innerHTML = `<div class="d-flex justify-content-between align-items-center moveList"><h3 class="text-white listTitle">Click to edit</h3><img src="./img/bin-white.png" id="deleteListButton"></div><div class="taskList"></div><h5 class="text-white addTaskButton"><span class="bold">+</span> Add task</h5>`
    newList.classList.add('list', 'd-flex', 'flex-column', 'gap-2');
    newList.setAttribute('data-list-id', next_list_id);
    newList.setAttribute('data-position', next_position);

    if (toggle.checked == true) {
        newList.setAttribute('draggable', 'true');
    } else {
        newList.setAttribute('draggable', 'false');
    }

    if (textToggle.checked == true) {
        newList.children[0].children[0].setAttribute('contenteditable', 'false')
    } else {
        newList.children[0].children[0].setAttribute('contenteditable', 'true')
    }

    document.querySelector('#trelloBoard').appendChild(newList)

    // ADD EVENT LISTENER TO NEWLY ADDED LIST'S ADD TASK BUTTON
    newList.children[2].addEventListener('click', appendTask)
    newList.children[0].children[1].addEventListener('click', deleteList)

    // IF TOGGLE FOR DRAGGING LISTS IS ENABLED THEN ADD DRAG EVENT LISTENER TO NEWLY ADDED LIST ELEMENT
    // IF TOGGLE FOR DRAGGING LISTS IS DISABLED THEN ADD DRAG EVENT LISTENER TO NEWLY ADDED LIST ELEMENT
    if (toggle.checked == false) {
        makeDraggable()
    } else if (toggle.checked == true) {
        listDrag();
    }

    createList(next_position, next_list_id)
}

// RESPONSIBLE FOR DELETE LIST COLUMN
function deleteList(e) {
    let id = e.target.parentNode.parentNode.getAttribute('data-list-id')
    e.target.parentNode.parentNode.remove()

    deleteListColumn(id)
}


function appendTask(e) {
    next_task_id++ 
    let listID = e.target.parentNode.getAttribute('data-list-id')

    const newTask = document.createElement('div');
    newTask.innerHTML = 'Click to enter text'
    newTask.classList.add('list-item')
    newTask.setAttribute('draggable', 'true');
    newTask.setAttribute('data-list-id', listID)
    newTask.setAttribute('data-task-id', next_task_id)

    if (textToggle.checked == true) {
        newTask.setAttribute('contenteditable', 'false');
    } else {
        newTask.setAttribute('contenteditable', 'true');
    }

    if (toggle.checked == false) {
        newTask.setAttribute('draggable', 'true');
    } else if (toggle.checked == true) {
        newTask.setAttribute('draggable', 'false');
    }

    e.target.previousElementSibling.appendChild(newTask);

    // ENSURES THAT NEW TASK ITEM GETS THE APPROPRIATE EVEN LISTENER
    makeDraggable();
    createTask(next_task_id, listID)
}

function makeDraggable() {
    list_items = document.querySelectorAll('.list-item');
    lists = document.querySelectorAll('.list');

    for (let i = 0; i < list_items.length; i++) {
        const item = list_items[i];

        item.addEventListener('dragstart', function (e) {
            draggedItem = item;
            lists = document.querySelectorAll('.list');

            setTimeout(function () {
                draggedItem.style.display = 'none'
            }, 0)
        });

        item.addEventListener('dragend', function () {
            setTimeout(function () {
                draggedItem.style.display = 'block';
                draggedItem = null;
            })
        }, 0)

        for (let j = 0; j < lists.length; j++) {
            const list = lists[j];

            list.addEventListener('dragover', function (e) {
                e.preventDefault();
            })

            list.addEventListener('dragenter', function (e) {
                e.preventDefault()
                // this.style.backgroundColor = '#37478586'
            })

            list.addEventListener('dragleave', function (e) {
                // this.style.backgroundColor = '#374790'
            })
            list.addEventListener('drop', function (e) {
                // console.log(draggedItem)
                let list_id = this.getAttribute('data-list-id')
                draggedItem.setAttribute('data-list-id', list_id)
                this.children[1].appendChild(draggedItem);
                // this.style.backgroundColor = '#374790'
            })
        }
    }
}

// stopPropagation() TRY THIS !!!!!!!!!!
//NEED TO FIGURE OUT A WAY TO TOGGLE BETWEEN SO OPACITY DOESNT CHANGE WHEN TASKS ARE MOVED!
function listDrag() {
    if (toggle.checked == true) {
        let lists = document.querySelectorAll('.list');
        lists.forEach(list => {
            list.addEventListener('dragstart', () => {
                list.classList.add('dragging')
            });
            list.addEventListener('dragend', () => {
                list.classList.remove('dragging')
                console.log(list.parentNode.children)
                for (let r = 0; r < list.parentNode.children.length; r++) {
                    list.parentNode.children[r].setAttribute('data-position', `${r}`);

                    //USED FOR UPDATING DATABASE WITH NEW POSITIONS
                    let list_id = list.parentNode.children[r].getAttribute('data-list-id');
                    let list_content = list.parentNode.children[r].children[0].children[0].innerHTML;
                    let list_position = list.parentNode.children[r].getAttribute('data-position');
                    // console.log(list_id)
                    // console.log(list_content)
                    // console.log(list_position)
                    updateLists(list_id, list_content, list_position)
                }
            });
        });
        return
    } else {
        return
    }
}

function dropList(e) {
    e.preventDefault()
    const afterElement = getDragAfterElement(container, e.clientX);
    // console.log(afterElement)
    const list = document.querySelector('.dragging');
    // container.appendChild(list)
    if (afterElement == null) {
        container.appendChild(list)
    } else {
        container.insertBefore(list, afterElement)
    }
}

function getDragAfterElement(container, x) {
    const draggableElements = [...container.querySelectorAll('.list:not(.dragging)')]
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect()
        const offset = x - box.left - box.width / 2
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child }
        } else {
            return closest
        }

    }, { offset: Number.NEGATIVE_INFINITY }).element
}

const editTextOn = document.querySelector('#editTextOn');
const editTextOff = document.querySelector('#editTextOff');
// const textToggle = document.querySelector('#editTextToggle');

textToggle.addEventListener('click', () => {
    console.log(lists)
    list_items = document.querySelectorAll('.list-item');
    lists = document.querySelectorAll('.list');
    if (textToggle.checked == true) {
        list_items.forEach(item => item.setAttribute('contenteditable', 'false'))
        lists.forEach(list => list.children[0].children[0].setAttribute('contenteditable', 'false'))
        editTextOn.style.opacity = '50%';
        editTextOff.style.opacity = '100%';
    } else {
        list_items.forEach(item => item.setAttribute('contenteditable', 'true'))
        lists.forEach(list => list.children[0].children[0].setAttribute('contenteditable', 'true'))
        editTextOn.style.opacity = '100%';
        editTextOff.style.opacity = '50%';
    }

})

// EVENT LISTENER FOR TOGGLING DRAG
// IF CHECK == TRUE, THEN DISABLE MOVING TASKS AND ENABLE MOVING LISTS
// IF CHECK == FALSE, THEN ENABLE MOVING TASKS AND DISABLE MOVING LISTS
toggle.addEventListener('click', () => {
    if (toggle.checked == true) {

        movableTaskText.style.opacity = '50%';
        movableListText.style.opacity = '100%';

        lists = document.querySelectorAll('.list');
        // Columns are draggable
        lists.forEach(list => {
            list.setAttribute('draggable', 'true');
        });
        // List_items are NOT draggable
        list_items.forEach(list_item => {
            list_item.setAttribute('draggable', 'false');
        })

        container.addEventListener('dragover', dropList)
        listDrag()
    } else if (toggle.checked == false) {

        movableTaskText.style.opacity = '100%';
        movableListText.style.opacity = '50%';

        // Columns are NOT draggable
        lists.forEach(list => {
            list.setAttribute('draggable', 'false')
        })
        // List_items are draggable
        list_items.forEach(list_item => {
            list_item.setAttribute('draggable', 'true');
        })

        container.removeEventListener('dragover', dropList)
        makeDraggable()
    }
})

// EVENT LISTENER FOR TOGGLING EDIT TEXT
// IF CHECK == TRUE, THEN DISABLE TEXT EDITING
// IF CHECK == FALSE, THEN ENABLE TEXT EDITING
textToggle.addEventListener('click', () => {
    //NEED TO RE-ESTABLISH NODES (list_items and lists) JUST IN CASE ANY NEW ONES WERE ADDED
    list_items = document.querySelectorAll('.list-item');
    lists = document.querySelectorAll('.list');

    if (textToggle.checked == true) {

        editTextOn.style.opacity = '50%';
        editTextOff.style.opacity = '100%';

        list_items.forEach(item => item.setAttribute('contenteditable', 'false'))
        lists.forEach(list => list.children[0].children[0].setAttribute('contenteditable', 'false'))
    } else if (textToggle.checked == false) {

        editTextOn.style.opacity = '100%';
        editTextOff.style.opacity = '50%';

        list_items.forEach(item => item.setAttribute('contenteditable', 'true'))
        lists.forEach(list => list.children[0].children[0].setAttribute('contenteditable', 'true'))
    }

})


listDrag();
makeDraggable();
document.querySelector('#addListButton').addEventListener('click', addList)
addTaskButton.forEach(button => button.addEventListener('click', appendTask))
deleteListButton.forEach(button => button.addEventListener('click', deleteList))