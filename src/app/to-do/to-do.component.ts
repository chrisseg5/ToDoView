import { Component, OnInit } from '@angular/core';
import {ToDo} from "./to-do.model";
import {ToDoService} from "./to-do.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent implements OnInit {
  public todos: ToDo[] = [] ;
  todo : ToDo ;
  newTodoText: string;
  text: string;



  constructor(
    private toDoService: ToDoService
  ) { }

  ngOnInit(): void {
    this.getToDos() ;
    this.todo = new ToDo();
    this.text = '';
  }

  public getToDos() {
    this.toDoService.getTodos().subscribe(
      (response: ToDo[]) => {
        console.log(response);
          this.todos=response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  add() {
    console.log(this.todo);

      this.toDoService.saveTodo(this.todo).subscribe(
        (response) => {

          this.getToDos();
          this.todo = new ToDo();
        },
        (error) => {
          console.error('Error adding todo:', error);
        }
      )


  }

  delete(index: number , id) {

    this.toDoService.deleteToDo(id).subscribe(
      (response) => {
        this.todos.splice(index, 1);
      }
    )
  }


  updateStatus(id: number, done: boolean) {

    console.log(id , done);
    this.toDoService.updateToDoStatus(id,done).subscribe(
      (response) => {
      }
    ).add(() => {
      console.log(done);
      this.getToDos();
    })
  }
}
