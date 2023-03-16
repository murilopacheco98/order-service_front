import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Cliente } from "src/app/models/cliente";
import { OS, OSDTO } from "src/app/models/os";
import { Tecnico } from "src/app/models/tecnico";
import { ClienteService } from "src/app/services/cliente.service";
import { OsService } from "src/app/services/os.service";
import { TecnicoService } from "src/app/services/tecnico.service";

@Component({
  selector: "app-os-update",
  templateUrl: "./os-update.component.html",
  styleUrls: ["./os-update.component.css"],
})
export class OsUpdateComponent implements OnInit {
  nameForm: FormGroup = new FormGroup({nameControl: new FormControl()});
  os: OSDTO = {
    id: "",
    dataAbertura: "",
    dataFechamento: "",
    observacoes: "",
    statusId: "",
    prioridadeId: "",
    tecnicoDTO: { cpf: "", id: "", nome: "", telefone: "" },
    clienteDTO: { cpf: "", id: "", nome: "", telefone: "" },
  };

  tecnicos: Tecnico[] = [];
  clientes: Cliente[] = [];

  public osTecnicoId = this.os.tecnicoDTO.id;
  constructor(
    private tecnicoService: TecnicoService,
    private clienteService: ClienteService,
    private service: OsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.os.id = this.route.snapshot.paramMap.get("id");
    this.findbyId();
    this.listarTecnicos();
    this.listarClientes();
  }

  findbyId(): void {
    this.service.findById(this.os.id).subscribe((resposta) => {
      this.os = resposta;
      console.log(this.os);
    });
  }

  update(): void {
    this.service.update({os: this.os, id: this.os.id}).subscribe((resposta) => {
      this.service.message("Atualizado com sucesso!");
      this.router.navigate(["os"]);
    });
  }

  cancel(): void {
    this.router.navigate(["os"]);
  }

  listarTecnicos() {
    this.tecnicoService.findAll().subscribe((resposta: Tecnico[]) => {
      this.tecnicos = resposta;
    });
  }

  listarClientes(): void {
    this.clienteService.findAll().subscribe((resposta) => {
      this.clientes = resposta;
    });
  }

  // converteDados():void {
  //   if(this.os.status == "ABERTO") {
  //     this.os.status = 0;
  //   } else if(this.os.status == "ANDAMENTO") {
  //     this.os.status = 1;
  //   } else {
  //     this.os.status = 2;
  //   }

  //   if(this.os.prioridade == "BAIXA") {
  //     this.os.prioridade = 0;
  //   } else if(this.os.prioridade == "MEDIA") {
  //     this.os.prioridade = 1;
  //   } else {
  //     this.os.prioridade = 2;
  //   }
  // }
}
