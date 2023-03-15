import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { Cliente } from "src/app/models/cliente";
import { ClienteService } from "src/app/services/cliente.service";

@Component({
  selector: "app-cliente-read",
  templateUrl: "./cliente-read.component.html",
  styleUrls: ["./cliente-read.component.css"],
})
export class ClienteReadComponent implements AfterViewInit {
  clientes: Cliente[] = [];
  displayedColumns: string[] = ["id", "nome", "cpf", "telefone", "ações"];
  dataSource = new MatTableDataSource<Cliente>(this.clientes);

  constructor(private service: ClienteService, private router: Router) {}
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.findAll();
  }

  findAll(): void {
    this.service.findAll().subscribe((resposta) => {
      this.clientes = resposta;
      this.dataSource = new MatTableDataSource<Cliente>(this.clientes);
      this.dataSource.paginator = this.paginator;
      console.log(this.clientes);
    });
  }

  navigateToCreate(): void {
    this.router.navigate(["clientes/create"]);
  }

  confirmDelete(name: string, id: any) {
    if (confirm("Tem certeza que você deseja deletar o(a): " + name)) {
      this.service.delete(id).subscribe();
      this.service.message("Usuário deletado com sucesso.");  
      this.findAll();
    }    
  }
}
