import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { OS, OSDTO } from '../models/os';

@Injectable({
  providedIn: 'root'
})
export class OsService {

  baseUrl: String = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private snack: MatSnackBar) { }

  findAll(): Observable<OSDTO[]> {
    const url = this.baseUrl + "/api/order-service";
    return this.http.get<OSDTO[]>(url);
  }

  findById(id : any):Observable<OSDTO>{
    const url = `${this.baseUrl}/api/order-service/${id}`;
    return this.http.get<OSDTO>(url);
  }

  create(os: OSDTO): Observable<OS> {
    const url = this.baseUrl + "/api/order-service";
    return this.http.post<OS>(url, os);
  }

  update(props: {os: OSDTO, id: any}):Observable<OSDTO> {
    const url = `${this.baseUrl}/api/order-service/` + props.id;
    return this.http.put<OSDTO>(url, props.os);
  }

  async delete(id: any): Promise<Observable<void>> {
    const url = this.baseUrl + "./api/order-service/" + id;
    return await this.http.delete<void>(url);
  }

  message(msg: String): void {
    this.snack.open(`${msg}`, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 4000
    })
  }
}
