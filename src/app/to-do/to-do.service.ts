import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {ToDoConsts} from "./to-do.consts";
import {Observable} from "rxjs";
import {ToDo} from "./to-do.model";

@Injectable({providedIn: 'root'})
export class ToDoService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient,) {
  }
  saveTodo(question) {
    return this.http
      .post(
        this.apiServerUrl + ToDoConsts.saveUrl ,
        question
      );
  }
   getTodos(): Observable<ToDo[]> {
    return this.http.get<ToDo[]>(`${this.apiServerUrl}/all/todos`);
  }

   deleteToDo(id)  {
      return this.http
        .delete(this.apiServerUrl + ToDoConsts.delete + id);
   }

  updateToDoStatus(id: number, done: boolean): Observable<any> {
    const url = `${this.apiServerUrl}/todo/updateStatus/${id}`;
    return this.http.put(url, null, { params: { done: String(done) } });
  }

}

