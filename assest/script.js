let todos = [ { id: 1, text: "تصميم واجهة المستخدم الجديدة", completed: true }, { id: 2, text: "مراجعة كتابة الكود وإصلاح الأخطاء", completed: false }, { id: 3, text: "تسليم المشروع النهائي للعميل", completed: false } ];
let currentFilter = 'all';
const todoForm = document.getElementById('todo-form'); const todoInput = document.getElementById('todo-input'); const todoList = document.getElementById('todo-list'); const searchInput = document.getElementById('search-input'); const itemsLeft = document.getElementById('items-left'); const clearCompletedBtn = document.getElementById('clear-completed-btn'); const filterBtns = document.querySelectorAll('.filter-btn');
document.addEventListener('DOMContentLoaded', () => {LocalStorage const savedTodos = localStorage.getItem('custom_todos'); if (savedTodos) { todos = JSON.parse(savedTodos); } renderTodos(); });
todoForm.addEventListener('submit', (e) => { e.preventDefault(); const text = todoInput.value.trim(); if (text !== '') { todos.push({ id: Date.now(), text: text, completed: false }); todoInput.value = ''; saveAndRender(); } });
function renderTodos() { todoList.innerHTML = '';
const searchValue = searchInput.value.toLowerCase();

const filteredTodos = todos.filter(todo => {
    const matchesFilter = 
        currentFilter === 'all' ? true :
        currentFilter === 'active' ? !todo.completed :
        todo.completed;

    const matchesSearch = todo.text.toLowerCase().includes(searchValue);

    return matchesFilter && matchesSearch;
});

filteredTodos.forEach(todo => {
    const li = document.createElement('li');
    li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
    
    li.innerHTML = `
        <button class="delete-btn" onclick="deleteTodo(${todo.id})" title="حذف">
            <i class="fa-regular fa-trash-can"></i>
        </button>
        <span class="todo-text">${escapeHTML(todo.text)}</span>
        <div class="custom-checkbox" onclick="toggleTodo(${todo.id})">
            <i class="fa-solid fa-check"></i>
        </div>
    `;

    todoList.appendChild(li);
});

updateCounter();
}
function toggleTodo(id) { todos = todos.map(todo => { if (todo.id === id) todo.completed = !todo.completed; return todo; }); saveAndRender(); }
function deleteTodo(id) { todos = todos.filter(todo => todo.id !== id); saveAndRender(); }
filterBtns.forEach(btn => { btn.addEventListener('click', () => { filterBtns.forEach(b => b.classList.remove('active')); btn.classList.add('active'); currentFilter = btn.dataset.filter; renderTodos(); }); });
searchInput.addEventListener('input', renderTodos);
clearCompletedBtn.addEventListener('click', () => { todos = todos.filter(todo => !todo.completed); saveAndRender(); });
function updateCounter() { const activeCount = todos.filter(todo => !todo.completed).length; itemsLeft.textContent = { activeCount} ; }
function saveAndRender() { localStorage.setItem('custom_todos', JSON.stringify(todos)); renderTodos(); }
