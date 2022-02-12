let list_items = document.querySelectorAll('.list-item');
const lists = document.querySelectorAll('.list');
const trelloBoard = document.querySelectorAll('#trelloBoard')[0].children;
const addTaskButton = document.querySelectorAll('.addTaskButton')


let draggedItem = null;




const addList = (listName) => {
    const newList = document.createElement('div');
    newList.innerHTML = `<div class="d-flex justify-content-between align-items-center"><h3 class="text-white listTitle">test</h3><img src="./img/pencil_icon.png" id="editListButton"></div><div class="taskList"> </div><h3 class="text-white"><span class="bold">+</span> Add task</h3>`
    newList.classList.add('list', 'd-flex', 'flex-column', 'gap-2')
    newList.setAttribute('draggable', 'true');
    document.querySelector('#trelloBoard').appendChild(newList)

    newList.style.display = 'block'
    makeDraggable()
}

document.querySelector('#addListButton').addEventListener('click', addList)



for (let k = 0; k < addTaskButton.length; k++) {
    const taskButton = addTaskButton[k]
    taskButton.addEventListener('click', function() {
            const newTask = document.createElement('div');
            newTask.innerHTML = 'Test'
            newTask.classList.add('list-item')
            newTask.setAttribute('draggable','true');    
            taskButton.previousSibling.previousElementSibling.append(newTask)
            list_items = document.querySelectorAll('.list-item')
            makeDraggable()
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
makeDraggable()