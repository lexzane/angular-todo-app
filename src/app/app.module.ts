import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodoComponent } from './components/todo/todo.component';
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { MessageComponent } from './components/message/message.component';
import { TodosPageComponent } from './pages/todos-page/todos-page.component';
import { RouterModule, Routes } from '@angular/router';
import { AboutPageComponent } from './about/about-page/about-page.component';

const routes: Routes = [
  { path: 'todos', component: TodosPageComponent },
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then(m => m.AboutModule),
  },
  { path: '**', redirectTo: '/todos', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    TodoFormComponent,
    MessageComponent,
    TodosPageComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())],
  bootstrap: [AppComponent],
})
export class AppModule {}
