import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { OS, OSDTO } from "src/app/models/os";
import { OsService } from "src/app/services/os.service";

@Component({
  selector: "app-os-description",
  templateUrl: "./os-description.component.html",
  styleUrls: ["./os-description.component.css"],
})
export class OsDescriptionComponent implements OnInit {
  os: OSDTO = {
    id: "",
    dataAbertura: "",
    dataFechamento: "",
    tecnicoDTO: { cpf: "", id: "", nome: "", telefone: "" },
    clienteDTO: { cpf: "", id: "", nome: "", telefone: "" },
    observacoes: "",
    statusId: "",
    prioridadeId: "",
  };

  constructor(
    private service: OsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.os.id = this.route.snapshot.paramMap.get("id");
    this.findById();
  }

  findById(): void {
    this.service.findById(this.os.id).subscribe((resposta) => {
      this.os = resposta;
    });
  }

  return() {
    if (this.os.statusId === "2") {
      this.router.navigate(["../os/closed"]);
    } else {
      this.router.navigate(["../os"]);
    }
  }
}
