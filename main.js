const form = document.querySelector('form')
let todoList = document.querySelector('.todoList')
const input = document.querySelector('form > input[type="text"]')

let todos = []
window.addEventListener('DOMContentLoaded',e => {
    form.addEventListener('submit', e => {
        e.preventDefault()
        //veriler al
        const data = {...Object.fromEntries(new FormData(e.target)),checked : false, time : Date.now(), id:todos.length}
        todos.push(data)
        displayTodos()
        input.value = ''    
    })

    function displayTodos(){
        
        todoList = document.querySelector('.todoList')
        todoList.innerHTML = ''
        todos.forEach(el => {
            const todo = document.createElement('div')
            todo.classList.add('todo')
        
            const span = document.createElement('span')
            span.textContent = el.task
        
            const actionDiv = document.createElement('div')
            actionDiv.classList.add('actions')
        
            const checkbox = document.createElement('input')
            checkbox.type = 'checkbox'
            checkbox.value = el.checked
        
            const deleteBtn = document.createElement('button')
            deleteBtn.classList.add('delete-btn')
            deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>'
    
            const editBtn = document.createElement('button')
            editBtn.classList.add('edit-btn')    
            editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>'
    
            //append
            actionDiv.appendChild(checkbox)
            actionDiv.appendChild(deleteBtn)
            actionDiv.appendChild(editBtn)
        
            todo.appendChild(span)
            todo.appendChild(actionDiv)
        
            todoList.appendChild(todo)

            checkbox.addEventListener('checked',e => {
                if(!el.checked) el.checked = true
                else el.checked = false
                span.classList.toggle('checked',el.checked)
            })

            deleteBtn.addEventListener('click' ,e => {
                todos = todos.filter(t => t != el)
                displayTodos()
            })
        })
        
        //delete section


    }
})

