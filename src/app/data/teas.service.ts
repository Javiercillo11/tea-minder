import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Tea } from '../models/tea.models';

@Injectable({
  providedIn: 'root'
})
export class TeaService {
  private teasUrl = 'http://localhost:3000/teas';

  constructor(private http: HttpClient) { }

  getTeasByUserId(userId: string): Observable<Tea[]> {
    return this.http.get<Tea[]>(this.teasUrl)
      .pipe(
        map(teas => teas.filter(tea => tea.userId === userId))
      );
  }

  getTeas(): Observable<Tea[]> {
    return this.http.get<Tea[]>(this.teasUrl);
  }
  
  getTea(id: string): Observable<Tea> {
    const url = `${this.teasUrl}/${id}`;
    return this.http.get<Tea>(url);
  }

  deleteTea(teaId: string): Observable<any> {
    const url = `${this.teasUrl}/${teaId}`;
    return this.http.delete(url);
  }

  addTea(tea: Tea): Observable<Tea> {
    return this.http.post<Tea>(this.teasUrl, tea);
  }

  updateTea(tea: Tea): Observable<Tea> {
    const url = `${this.teasUrl}/${tea.id}`;
    return this.http.put<Tea>(url, tea);
  }
}
