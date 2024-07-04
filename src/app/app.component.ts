import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Todo } from './types/todo';

const todosFromServer = [
  { id: 1, title: 'TypeScript', completed: true },
  { id: 2, title: 'React', completed: false },
  { id: 3, title: 'Angular', completed: true },
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  todos: Todo[] = todosFromServer;

  get activeTodos() {
    return this.todos.filter((todo) => !todo.completed);
  }

  trackById(i: number, todo: Todo) {
    return todo.id;
  }

  addTodo(newTitle: string) {
    const newTodo: Todo = {
      id: Date.now(),
      title: newTitle,
      completed: false,
    };

    this.todos = [...this.todos, newTodo];
  }

  toggleTodo(todoId: number) {
    this.todos = this.todos.map((todo) =>
      todo.id !== todoId ? todo : { ...todo, completed: !todo.completed }
    );
  }

  renameTodo(todoId: number, title: string) {
    this.todos = this.todos.map((todo) =>
      todo.id !== todoId ? todo : { ...todo, title }
    );
  }

  deleteTodo(todoId: number) {
    this.todos = this.todos.filter((todo) => todo.id !== todoId);
  }
}
