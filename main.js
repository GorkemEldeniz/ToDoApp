const form = document.querySelector('form')
let todoList = document.querySelector('.todoList')
const input = document.querySelector('form > input[type="text"]')


window.addEventListener('DOMContentLoaded',e => {
    let todos = JSON.parse(localStorage.getItem('todos')) || []
    form.addEventListener('submit', e => {
        e.preventDefault()
        //veriler al
        const data = {...Object.fromEntries(new FormData(e.target)),checked : false, time : Date.now(), id:todos.length}
        todos.push(data)
        localStorage.setItem('todos',JSON.stringify(todos))
        displayTodos()
        input.value = ''    
    })
    displayTodos()
    function displayTodos(){
        
        todoList = document.querySelector('.todoList')
        todoList.innerHTML = ''
        todos.forEach(el => {
            const todo = document.createElement('div')
            todo.classList.add('todo')
        
            const span = document.createElement('span')
            span.innerHTML= `<input value = ${el.task} readonly type='text'/>`
            
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

            checkbox.addEventListener('input',e => {
                span.children[0].classList.toggle('checked',checkbox.checked)
                todos.forEach(todo => {
                    if(todo == el) {
                        todo.checked = checkbox.checked
                    }
                })
                localStorage.setItem('todos',JSON.stringify(todos))
            })

            deleteBtn.addEventListener('click' ,e => {
                e.preventDefault()
                todos = todos.filter(t => t != el)
                localStorage.setItem('todos',JSON.stringify(todos))
                displayTodos()
            })


            editBtn.addEventListener('click', e => {
                e.preventDefault()
                span.children[0].removeAttribute('readonly')
                span.children[0].focus()
                span.children[0].addEventListener('blur',e => {
                    todos.map(todo => {
                        if(todo == el) {
                            el.task = e.target.value 
                        }
                    })
                    localStorage.setItem('todos',JSON.stringify(todos))
                    span.children[0].setAttribute('readonly',true)
                    displayTodos()
                })
            })
        })
        
        //delete section


    }
})

