import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { Tecnico } from "src/app/models/tecnico";
import { TecnicoService } from "src/app/services/tecnico.service";

@Component({
  selector: "app-tecnico-read",
  templateUrl: "./tecnico-read.component.html",
  styleUrls: ["./tecnico-read.component.css"],
})
export class TecnicoReadComponent implements AfterViewInit {
  tecnicos: Tecnico[] = [];
  displayedColumns: string[] = ["id", "nome", "cpf", "telefone", "ações"];
  dataSource = new MatTableDataSource<Tecnico>(this.tecnicos);

  constructor(private service: TecnicoService, private router: Router) {}
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.findAll();
  }

  findAll(): void {
    this.service.findAll().subscribe((resposta) => {
      this.tecnicos = resposta;
      this.dataSource = new MatTableDataSource<Tecnico>(this.tecnicos);
      this.dataSource.paginator = this.paginator;
      console.log(this.tecnicos);
    });
  }

  navigateToCreate(): void {
    this.router.navigate(["tecnicos/create"]);
  }
  
  async confirmDelete(name: string, id: any) {
    if (confirm("Tem certeza que você deseja deletar o(a): " + name)) {
      this.tecnicos.splice(
        this.tecnicos.findIndex((item) => item.id === id),
        1
      );
      
      (await this.service.delete(id)).subscribe();
      this.service.message("Usuário deletado com sucesso.");
    }
    window.location.reload();
  }
}
