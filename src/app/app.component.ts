import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
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
export class AppComponent implements OnInit {
  _todos: Todo[] = [];
  activeTodos: Todo[] = [];

  get todos() {
    return this._todos;
  }

  set todos(todos: Todo[]) {
    if (todos === this._todos) {
      return;
    }

    this._todos = todos;
    this.activeTodos = this._todos.filter((todo) => !todo.completed);
  }

  constructor() {}

  ngOnInit(): void {
    this.todos = todosFromServer;
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
