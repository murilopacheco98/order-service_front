import { Component } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Cliente } from "src/app/models/cliente";
import { ClienteService } from "src/app/services/cliente.service";

@Component({
  selector: "app-cliente-create",
  templateUrl: "./cliente-create.component.html",
  styleUrls: ["./cliente-create.component.css"],
})
export class ClienteCreateComponent {
  cliente: Cliente = {
    id: "",
    nome: "",
    cpf: "",
    telefone: "",
  };

  nome = new FormControl("", [Validators.minLength(5)]);
  cpf = new FormControl("", [Validators.minLength(11)]);
  telefone = new FormControl("", [Validators.minLength(11)]);

  constructor(private router: Router, private service: ClienteService) {}

  cancel(): void {
    this.router.navigate(["cliente"]);
  }

  create(): void {
    this.service.create(this.cliente).subscribe(
      (resposta) => {
        this.router.navigate(["cliente"]);
        this.service.message("Cliente criado sucesso!");
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
      return "O nome deve ter entre 5 e 100 caracteres!"
    } 
    return false;
  }
  errorValidCpf() {
    if (this.cpf.invalid) {
      return "O nome deve ter 11 caracteres!"
    } 
    return false;
  }
  errorValidTelefone() {
    if (this.telefone.invalid) {
      return "O nome deve ter entre 5 e 100 caracteres!"
    } 
    return false;
  }
}
