import { Todo } from "../models/Todo";
import { TodoRepository } from "./TodoRepository";

export class ApiTodoRepository implements TodoRepository {
    private apiUrl = "https://69b11abdadac80b427c3fff2.mockapi.io/api/v1/todoItem";

    async getAll(): Promise<Todo[]> {
        const response = await fetch(this.apiUrl);
        if (!response.ok) throw new Error("Помилка завантаження");
        return await response.json();
    }

    async add(todo: Todo): Promise<Todo> {
        const response = await fetch(this.apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(todo),
        });
        if (!response.ok) throw new Error("Помилка сервера");
        return await response.json();
    }

    async update(id: string, data: Partial<Todo>): Promise<Todo> {
        alert("Завдання 1: Реалізуйте метод update в ApiTodoRepository!");
        // Завдання 1 - Оновлення (PUT), поверніть response.json()
        throw new Error("Метод update не реалізовано");
    }

    async remove(id: string): Promise<void> {
        alert("Завдання 2: Реалізуйте метод remove в ApiTodoRepository!");
        // Завдання 2 - DELETE, якщо !response.ok викидайте помилку
        throw new Error("Метод remove не реалізовано");
    }
}