import { Component } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Tecnico } from "src/app/models/tecnico";
import { TecnicoService } from "src/app/services/tecnico.service";

@Component({
  selector: "app-tecnico-create",
  templateUrl: "./tecnico-create.component.html",
  styleUrls: ["./tecnico-create.component.css"],
})
export class TecnicoCreateComponent {
  tecnico: Tecnico = {
    id: "",
    nome: "",
    cpf: "",
    telefone: "",
  };

  nome = new FormControl("", [Validators.minLength(5)]);
  cpf = new FormControl("", [Validators.minLength(11)]);
  telefone = new FormControl("", [Validators.minLength(11)]);

  constructor(private router: Router, private service: TecnicoService) {}

  cancel(): void {
    this.router.navigate(["tecnicos"]);
  }

  create(): void {
    this.service.create(this.tecnico).subscribe(
      (resposta) => {
        this.router.navigate(["tecnicos"]);
        this.service.message("Técnico criado sucesso!");
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
