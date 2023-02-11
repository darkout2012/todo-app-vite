import html from "./app.html?raw";
import todoStore, { Filters } from "../store/todo.store";
import { renderTodos, renderPending } from "./use-cases";


const ElementIDs = {
    ClearCompletedButton: ".clear-completed",
    TodoList: ".todo-list",
    NewTodoInput: "#new-todo-input",
    TodoFilters: ".filtro",
    PendingCountLabel: "#pending-count",
}


/**
 * 
 * @param {String} elementId 
 */
export const App = (elementId) => {

    const displayTodos = () => {
        const todos = todoStore.getTodos(todoStore.getCurrentFilter());
        renderTodos(ElementIDs.TodoList, todos);
        updatePendingCount();
    }


    const updatePendingCount = () => {
        renderPending(ElementIDs.PendingCountLabel);
    }


    // Cuando la funcion App() se llama
    (() => {
        const app = document.createElement("div");
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodos();
    })();


    // Referencias HTML
    const newDescriptionInput = document.querySelector(ElementIDs.NewTodoInput);
    const todoListUL = document.querySelector(ElementIDs.TodoList);
    const clearCompletedButton = document.querySelector(ElementIDs.ClearCompletedButton);
    const filtersLIs = document.querySelectorAll(ElementIDs.TodoFilters);


    // Listeners
    newDescriptionInput.addEventListener("keyup", (event) => {
        
        // Nos interesan estos metodos para poder lanzar una accion despues de precionar tecla Enter:
        // key: "Enter"
        // keyCode: 13

        if (event.keyCode !== 13) return; // validacion, continuamos programa si precionaron Enter
        if (event.target.value.trim().length === 0) return; // validacion, continuamos si no hay espacios vacios
        // vamos a continuar solo si en "event.target.value" hay algo escrito

        todoStore.addTodo(event.target.value); // con esto obtenemos valor del input

        // Que es "renderizar en programacion?"

        // El renderizado es la representación gráfica del contenido de una página, 
        // es decir, el proceso necesario para mostrar una página web en un navegador.

        // Para renderizar el texto teclaado en el input

        displayTodos(); 
        event.target.value = ""; // vaciamos el input despues de precionar Enter
    });

    todoListUL.addEventListener("click", (event) => {
        const element = event.target.closest("[data-id]"); // closest() возвращает ближайший родительский элемент (или сам элемент)
        todoStore.toggleTodo(element.getAttribute("data-id")); // getAttribute() возвращает значение указанного атрибута элемента
        displayTodos();
    });

    todoListUL.addEventListener('click', (event) => {
        
        const isDestroyElement = event.target.className === "destroy";
        const element = event.target.closest("[data-id]");
        if (!element || !isDestroyElement) return; // validacion, si elemento no existe o no estamos haciendo click en boton destroy 
        todoStore.deleteTodo(element.getAttribute("data-id"));
        displayTodos();
    });

    clearCompletedButton.addEventListener("click", () => {
        
        todoStore.deleteCompleted();
        displayTodos();
    });

    filtersLIs.forEach(element => {
    
        element.addEventListener("click", (element) =>{
            filtersLIs.forEach(el => el.classList.remove("selected"));
            element.target.classList.add("selected");
            switch (element.target.text) {
                case "Todos":
                    todoStore.setFilter(Filters.All)
                break;
                case "Pendientes":
                    todoStore.setFilter(Filters.Pending)
                break;
                case "Completados":
                    todoStore.setFilter(Filters.Completed)
                break;
            }

            displayTodos();

        });
    
    });



}