import { Component, OnInit } from '@angular/core';
import { Todo } from '../../types/todo';
import { TodosService } from '../../services/todos.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-todos-page',
  templateUrl: './todos-page.component.html',
  styleUrl: './todos-page.component.scss'
})
export class TodosPageComponent implements OnInit {
  _todos: Todo[] = [];
  activeTodos: Todo[] = [];
  errorMessage = '';

  get todos() {
    return this._todos;
  }

  set todos(todos: Todo[]) {
    if (todos === this._todos) {
      return;
    }

    this._todos = todos;
    this.activeTodos = this._todos.filter(todo => !todo.completed);
  }

  constructor(
    private todosService: TodosService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.todosService.todos$
      .subscribe(todos => {
        this.todos = todos;
      });

    this.todosService.loadTodos()
      .subscribe({
        error: () => this.messageService.showMessage('Unable to load todos'),
      });
  }

  trackById = (i: number, todo: Todo) => todo.id;

  addTodo(newTitle: string) {
    this.todosService.createTodo(newTitle)
      .subscribe({
        error: () => this.messageService.showMessage('Unable to add a todo'),
      });
  }

  toggleTodo(todo: Todo) {
    this.todosService.updateTodo({ ...todo, completed: !todo.completed })
      .subscribe({
        error: () => this.messageService.showMessage('Unable to toggle a todo'),
      });
  }

  renameTodo(todo: Todo, title: string) {
    this.todosService.updateTodo({ ...todo, title })
      .subscribe({
        error: () => this.messageService.showMessage('Unable to rename a todo'),
      });
  }

  deleteTodo(todo: Todo) {
    this.todosService.deleteTodo(todo)
      .subscribe({
        error: () => this.messageService.showMessage('Unable to delete a todo'),
      });
  }
}
