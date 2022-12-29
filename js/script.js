let form = document.querySelector('form')
let textTask = document.querySelector('form input')
let listTask = document.querySelector('.container ul')
let taskNo = document.querySelector('.taskNo')
//==================================================
// createTask.onclick=function(){
//     console.log(textTask.value)
// }
//renome();


let tasks = [];
if (localStorage.getItem('task')) {
    tasks = JSON.parse(localStorage.getItem('task'))
}
tasks.forEach(function (item) {
    let cssClass = (item.done) ? "editTask" : ""

    let boxTask = ` <li id=${item.id} class="taskList">
    <div class='${cssClass}'>${item.text}</div>
    <div>

        <button class="Yes"></button>
        <button class="No"></button>

    </div>
</li>`
    if (item.text !== '')

        listTask.insertAdjacentHTML('beforeend', boxTask)
    if (tasks.length > 0)
        taskNo.classList.add('displayNone')

})


// saveDataTask();
form.addEventListener('submit', createNewTask)

function createNewTask(event) {

    event.preventDefault()

    let task = {
        id: Date.now(),
        text: textTask.value,
        done: false,

    }
    tasks.push(task);
    let cssClass = (task.done) ? "editTask" : "";


    let boxTask = ` <li id=${task.id} class="taskList">
    <div class='${cssClass}'>${task.text}</div>
    <div>

        <button class="Yes"></button>
        <button class="No"></button>
        
    </div>
</li>`
    if (task.text !== '') {

        listTask.insertAdjacentHTML('beforeend', boxTask)
        saveDataTask();
        textTask.value = '';
        textTask.focus()
        if (tasks.length > 0)
            taskNo.classList.add('displayNone')

    }
}
listTask.addEventListener('click', deleteTask)
function deleteTask(event) {
    let delTask = event.target
    // if(delTask!==event.target.closest('.No')) return
    if (event.target.closest('.No')) {
        let id = event.target.closest('.taskList').id
        tasks = tasks.filter(function (item) {
            if (item.id !== +id)
                return (tasks)
        })
        event.target.closest('.taskList').remove()

    }

    if (tasks.length === 0)
        listTask.classList.remove('displayNone')
    saveDataTask();

}

//=======================================
listTask.addEventListener('click', editTask)
function editTask(event) {
    if (event.target.closest('.Yes')) {
        let parentNode = event.target.closest('.taskList')
        let id = +parentNode.id;
        tasks.find(function (item) {
            if (item.id === id) {
                item.done = !item.done;
                saveDataTask()
            }


        })
        parentNode.querySelector('div').classList.toggle('editTask')
    }

}

function saveDataTask() {
    localStorage.setItem('task', JSON.stringify(tasks))

}

// function renome(){
//     let localTask =  localStorage.getItem('task')
//     listTask.innerHTML = localTask;
// }
