import { Todo } from "../models/todo.models";






/**
 * 
 * @param {Todo} todo 
 */
export const createTodoHTML = (todo) => {
    if (!todo) throw new Error ("A TODO object is required");


    const {done, description, id} = todo; // desestructuramos el objeto para en vez de escribir "todo.done" escribiremos "done"



    // Como tenemos el codigo dentro del elemento "li" y aparte estamos creando un elemnto "li" entonces 
    // eliminamos este "li" y sus atributos y aparte vamos asignarle al elemento "li" creado sus atributos correspondientes
    const html = `
        <div class="view">
            <input class="toggle" type="checkbox" ${done ? "checked" : ""}>
            <label>${description}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    `;

    const liElement = document.createElement("li");
    liElement.setAttribute("data-id", id);
    if (todo.done)
        liElement.classList.add("completed");
    liElement.innerHTML = html;

    return liElement;

}