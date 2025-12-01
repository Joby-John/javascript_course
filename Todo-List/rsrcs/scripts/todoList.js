
todoList = [];
displayTodo();
function save(todoList){
    localStorage.setItem('todoList', JSON.stringify(todoList));
}

function retrieve(){
    return JSON.parse(localStorage.getItem('todoList'))||[];
}

function addTodo(){
    const todoText = document.querySelector('.todo-text');
    const todoDate = document.querySelector('.todo-date');
    
    let text = todoText.value;
    let date = todoDate.value;

    if(text.trim() !== '' && date.trim() !== ''){
        let todo = {
            text,
            date
        }

        todoList.push(todo);
        save(todoList);
        displayTodo();

    }

    todoText.value = '';
    todoDate.value = '';
    console.log(todoList);
}

function displayTodo(){
    todoList = retrieve();
    const listDiv = document.querySelector('.js-todo-list');
    listDiv.innerHTML = '';

    todoList.forEach((todo, index) => {
        const container = document.createElement('div');
        container.classList.add('todo-item');

        const text = document.createElement('div');
        text.textContent = `${todo.text}`;
        text.classList.add('todo-content');

        const date = document.createElement('div');
        date.textContent = `${todo.date}`;
        date.classList.add('todo-content');


        const delButton = document.createElement('button');
        delButton.textContent = 'Delete';
        delButton.classList.add('del-btn');
        delButton.addEventListener('click', () => {
            deleteTodo(index);
        })

        container.appendChild(text);
        container.appendChild(date);
        container.appendChild(delButton);

        listDiv.appendChild(container);

    });
}

function deleteTodo(index){

    todoList.splice(index, 1);
    save(todoList);
    displayTodo();
}