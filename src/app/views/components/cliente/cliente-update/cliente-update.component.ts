import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Cliente } from "src/app/models/cliente";
import { ClienteService } from "src/app/services/cliente.service";

@Component({
  selector: "app-cliente-update",
  templateUrl: "./cliente-update.component.html",
  styleUrls: ["./cliente-update.component.css"],
})
export class ClienteUpdateComponent implements OnInit {
  cliente: Cliente = {
    id: "",
    nome: "",
    cpf: "",
    telefone: "",
  };
  id_tec = ''

  nome = new FormControl("", [Validators.minLength(5)]);
  cpf = new FormControl("", [Validators.minLength(11)]);
  telefone = new FormControl("", [Validators.minLength(11)]);

  constructor(
    private router: Router,
    private service: ClienteService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id_tec = this.route.snapshot.paramMap.get('id')!
    this.findById();
    console.log(this.cliente);
  }

  findById(): void {
    this.service.findById(this.id_tec).subscribe((resposta) => {
      this.cliente = resposta;
      console.log(this.cliente);
    })
  }

  cancel(): void {
    this.router.navigate(["clientes"]);
  }

  update(): void {
    this.service.update(this.cliente).subscribe(
      (resposta) => {
        this.router.navigate(["clientes"]);
        this.service.message("Cliente atualizado com sucesso!");
      },
      (error) => {
        if (error.error.error.match("já cadastrado")) {
          this.service.message(error.error.error);
        } else if (
          error.error.errors[0].message ===
          "invalid Brazilian individual taxpayer registry number (CPF)"
        ) {
          this.service.message("CPF inválido");
        }
      }
    );
  }

  errorValidNome() {
    if (this.nome.invalid) {
      return "O nome deve ter entre 5 e 100 caracteres!";
    }
    return false;
  }
  errorValidCpf() {
    if (this.cpf.invalid) {
      return "O nome deve ter 11 caracteres!";
    }
    return false;
  }
  errorValidTelefone() {
    if (this.telefone.invalid) {
      return "O nome deve ter entre 5 e 100 caracteres!";
    }
    return false;
  }
}
