let list_items = document.querySelectorAll('.list-item');
let lists = document.querySelectorAll('.list');
const trelloBoard = document.querySelectorAll('#trelloBoard')[0].children;
let addTaskButton = document.querySelectorAll('.addTaskButton')
let container = document.querySelectorAll('#trelloBoard')[0]

let listMoveSection = document.querySelectorAll('.moveList')
console.log(listMoveSection)

let draggedItem = null;

// console.log(addTaskButton)

console.log(lists)

const addList = (listName) => {
    const newList = document.createElement('div');
    newList.innerHTML = `<div class="d-flex justify-content-between align-items-center"><h3 class="text-white listTitle">test</h3><img src="./img/pencil_icon.png" id="editListButton"></div><div class="taskList"> </div><h3 class="text-white addTaskButton"><span class="bold">+</span> Add task</h3>`
    newList.classList.add('list', 'd-flex', 'flex-column', 'gap-2')
    newList.setAttribute('draggable', 'true');
    document.querySelector('#trelloBoard').appendChild(newList)

    newList.style.display = 'block'
    lists = document.querySelectorAll('.list')
    addTaskButton = document.querySelectorAll('.addTaskButton')
    console.log(lists)
    makeDraggable()
    listDrag()


}

document.querySelector('#addListButton').addEventListener('click', addList)



for (let k = 0; k < addTaskButton.length; k++) {
    const taskButton = addTaskButton[k]
    taskButton.addEventListener('click', function () {
        const newTask = document.createElement('div');
        newTask.innerHTML = 'Test'
        newTask.classList.add('list-item')
        newTask.setAttribute('draggable', 'true');
        // console.log(taskButton.previousSibling.previousElementSibling)
        taskButton.previousSibling.previousElementSibling.append(newTask)
        list_items = document.querySelectorAll('.list-item')
        // makeDraggable()
    })
}


function makeDraggable() {

    for (let i = 0; i < list_items.length; i++) {
        const item = list_items[i];

        item.addEventListener('dragstart', function (e) {
            draggedItem = item;
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
                this.style.backgroundColor = '#37478586'
            })

            list.addEventListener('dragleave', function (e) {
                this.style.backgroundColor = '#374790'
            })
            list.addEventListener('drop', function (e) {
                this.children[1].appendChild(draggedItem);
                this.style.backgroundColor = '#374790'
            })
        }
    }
}

// makeDraggable()

console.log(listMoveSection)


function listDrag() {
    lists.forEach(list => {
        list.addEventListener('dragstart', () => {
            list.classList.add('dragging')
        })

        list.addEventListener('dragend', () => {
            list.classList.remove('dragging')
        })
        // list.addEventListener('drop', ()=> {
        //     list.classList.remove('dragging')
        // })
    })
}

listDrag();
container.addEventListener('dragover', e => {
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
})


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