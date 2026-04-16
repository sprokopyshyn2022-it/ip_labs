import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoService } from './services/todo';
import { Todo } from './models/todo.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class App implements OnInit {
  USER_ID = 14; // Впишіть свій номер за журналом

  private todoService = inject(TodoService);
  private cdr = inject(ChangeDetectorRef);

  todos: Todo[] = [];
  isLoading = false;
  isEditing = false;
  currentEditId: string | null = null;

  formData: Todo = this.getEmptyForm();

  ngOnInit() {
    this.fetchTodos();
  }

  getEmptyForm(): Todo {
    return {
      userId: this.USER_ID,
      title: '',
      description: '',
      tag: 'Навчання',
      deadline: '',
      isDone: false,
    };
  }

  fetchTodos() {
    this.isLoading = true;
    this.cdr.detectChanges();
    this.todoService.getAll().subscribe({
      next: (data) => {
        this.todos = data.reverse();
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        alert('Не вдалося завантажити завдання.');
        this.isLoading = false;
        this.cdr.detectChanges();
      },
    });
  }

  onSubmit() {
    if (this.isEditing && this.currentEditId) {
      this.todoService.update(this.currentEditId, this.formData).subscribe(() => {
        this.fetchTodos();
        this.resetForm();
        this.cdr.detectChanges();
      });
    } else {
      this.formData.createdAt = Math.floor(Date.now() / 1000);
      this.todoService.add(this.formData).subscribe({
        next: (newTask) => {
          this.todos.unshift(newTask);
          this.resetForm();
          this.cdr.detectChanges();
        },
        error: (err) => alert('Помилка створення.'),
      });
    }
  }

  deleteTask(id: string | undefined) {
    if (!id || !confirm('Видалити цю задачу?')) return;
    this.todoService.remove(id).subscribe(() => {
      this.todos = this.todos.filter((t) => t.id !== id);
      this.cdr.detectChanges();
    });
  }

  toggleDone(task: Todo) {
    const updatedStatus = !task.isDone;
    if (task.id) {
      this.todoService.update(task.id, { isDone: updatedStatus }).subscribe(() => {
        task.isDone = updatedStatus;
        this.cdr.detectChanges();
      });
    }
  }

  editTask(task: Todo) {
    this.isEditing = true;
    this.currentEditId = task.id || null;
    this.formData = { ...task };
    this.cdr.detectChanges();
  }

  resetForm() {
    this.isEditing = false;
    this.currentEditId = null;
    this.formData = this.getEmptyForm();
  }
}
