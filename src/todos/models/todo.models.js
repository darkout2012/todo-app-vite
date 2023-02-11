import { v4 as uuid } from "uuid"; // importamos biblioteca de uuid para generar id unicos



export class Todo {
    /**
     * 
     * @param {String} description 
     */
    constructor(description) {
        this.id = uuid(); // generamos id unico mediante metodo uuid
        this.description = description;
        this.done = false;
        this.createdAt = new Date();
    }
}



