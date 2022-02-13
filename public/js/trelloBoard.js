let list_items = document.querySelectorAll('.list-item');
let lists = document.querySelectorAll('.list');
const trelloBoard = document.querySelectorAll('#trelloBoard')[0].children;
let addTaskButton = document.querySelectorAll('.addTaskButton')
let container = document.querySelectorAll('#trelloBoard')[0]

const movableTaskText = document.querySelector('#moveableTasksH6');
const movableListText = document.querySelector('#moveableListsH6');

// toggle.checked == true
// enable List movement and disable item movement
// toggle.checked == false
const toggle = document.querySelector('#draggableToggle');

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

    }
})

let draggedItem = null;

const addList = () => {
    const newList = document.createElement('div');

    newList.innerHTML = `<div class="d-flex justify-content-between align-items-center moveList"><h3 class="text-white listTitle">test</h3><img src="./img/pencil_icon.png" id="editListButton"></div><div class="taskList"></div><h3 class="text-white addTaskButton"><span class="bold">+</span> Add task</h3>`
    newList.classList.add('list', 'd-flex', 'flex-column', 'gap-2')

    if (toggle.checked == true) {
        newList.setAttribute('draggable', 'true');
    } else {
        newList.setAttribute('draggable', 'false');
    }

    document.querySelector('#trelloBoard').appendChild(newList)

    // Allows for event listeners to target these elements since they were a part of the original DOM
    lists = document.querySelectorAll('.list');
    addTaskButton = document.querySelectorAll('.addTaskButton');
    addTaskButton[addTaskButton.length - 1].addEventListener('click', () => {
        const newTask = document.createElement('div');
        newTask.innerHTML = 'Test'
        newTask.classList.add('list-item')
        newTask.setAttribute('draggable', 'true');
        addTaskButton[addTaskButton.length - 1].previousElementSibling.append(newTask)
        list_items = document.querySelectorAll('.list-item')
        console.log(list_items)
        if (toggle.checked == false) {
            makeDraggable()
        }
    })
    if (toggle.checked == true) {
        listDrag();
    }
}

// addTaskButton.addEventListener('click', addTask)
addTask()

function addTask() {
    console.log('click')
    for (let k = 0; k < addTaskButton.length; k++) {
        const taskButton = addTaskButton[k]
        taskButton.addEventListener('click', function () {
            const newTask = document.createElement('div');
            newTask.innerHTML = 'Test'
            newTask.classList.add('list-item')
            newTask.setAttribute('draggable', 'true');
            taskButton.previousElementSibling.append(newTask)
            list_items = document.querySelectorAll('.list-item')
            console.log(list_items)
            if (toggle.checked == false) {
                makeDraggable()
            }
        })
    }
}

function makeDraggable() {
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
                this.children[1].appendChild(draggedItem);
                // this.style.backgroundColor = '#374790'
            })
        }
    }
}

function listDrag() {
    lists.forEach(list => {
        list.addEventListener('dragstart', () => {
            list.classList.add('dragging')
        });
        list.addEventListener('dragend', () => {
            list.classList.remove('dragging')
        });
    });

    lists.forEach(list => {
        list.addEventListener('dragstart', () => {
            list.classList.add('dragging')
        });
        list.addEventListener('dragend', () => {
            list.classList.remove('dragging')
        });
    })

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

listDrag();
makeDraggable();
document.querySelector('#addListButton').addEventListener('click', addList)

const editTextOn = document.querySelector('#editTextOn');
const editTextOff = document.querySelector('#editTextOff');
const textToggle = document.querySelector('#editTextToggle'); 

textToggle.addEventListener('click', () => {
    if(textToggle.checked == true) {
        editTextOn.style.opacity = '50%';
        editTextOff.style.opacity = '100%';
    } else {
        editTextOn.style.opacity = '100%';
        editTextOff.style.opacity = '50%';
    }
    
})







// GET RID OF LATER!!!
// console.log('click')
// const newList = document.createElement('div');
// const newListHeader = document.createElement('div');
// const listTitle = document.createElement('h3');
// const editListButton = document.createElement('img');
// const taskList = document.createElement('div');
// const addTskBtn = document.createElement('h3');

// newList.classList.add('list', 'd-flex', 'flex-column', 'gap-2')
// newList.setAttribute('draggable', 'true');

// newListHeader.classList.add('d-flex','justify-content-between', 'align-items-center', 'moveList');

// listTitle.classList.add('text-white','listTitle');
// listTitle.textContent = 'TEST';

// editListButton.setAttribute('src','./img/pencil_icon.png');
// editListButton.setAttribute('id','editListButton');

// taskList.classList.add('taskList');

// addTskBtn.classList.add('text-white','addTaskButton')
// addTskBtn.textContent = '+ Add task'

// newListHeader.appendChild(listTitle);
// newListHeader.appendChild(editListButton);

// newList.appendChild(newListHeader)
// newList.appendChild(taskList)
// newList.appendChild(addTskBtn)

// trelloBoard[0].appendChild(newList)
// addTaskButton = document.querySelectorAll('.addTaskButton')