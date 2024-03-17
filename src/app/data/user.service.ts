import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl = '../../../assets/db.json';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<any[]>(this.usersUrl)
      .pipe(
        map(response => {
          if ('users' in response) {
            return response.users as User[];
          } else {
            throw new Error('No se encontró la propiedad "users" en la respuesta del servidor.');
          }
        })
      );
  }

  login(email: string, password: string): Observable<{ user: User | undefined, id: string | undefined }> {
    return this.getUsers().pipe(
      map(users => {
        const user = users.find(u => u.email === email && u.password === password);
        return { user, id: user ? user.id : undefined };
      })
    );
  }
}
