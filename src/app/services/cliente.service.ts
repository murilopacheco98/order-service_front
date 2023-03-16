import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable } from "rxjs";
import { environment } from "src/environments/environments";
import { Cliente } from "../models/cliente";

@Injectable({
  providedIn: "root",
})
export class ClienteService {
  baseUrl: String = environment.baseUrl;

  constructor(private http: HttpClient, private snack: MatSnackBar) {}

  findAll(): Observable<Cliente[]> {
    const url = this.baseUrl + "/api/cliente";
    return this.http.get<Cliente[]>(url);
  }

  findById(id: any): Observable<Cliente> {
    const url = this.baseUrl + "/api/cliente/" + id;
    return this.http.get<Cliente>(url);
  }

  create(cliente: Cliente): Observable<Cliente> {
    const url = this.baseUrl + "/api/cliente";
    return this.http.post<Cliente>(url, cliente);
  }

  update(cliente: Cliente): Observable<Cliente> {
    const url = this.baseUrl + "/api/cliente/" + cliente.id;
    return this.http.put<Cliente>(url, cliente);
  }

  async delete(id: any): Promise<Observable<void>> {
    const url =  this.baseUrl + "./api/cliente/" + id;
    return await this.http.delete<void>(url);
  }

  message(msg: String): void {
    this.snack.open(`${msg}`, "OK", {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 3000,
    });
  }
}
