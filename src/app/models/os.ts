import { Cliente } from "./cliente";
import { Tecnico } from "./tecnico";

export interface OS {
  id?: any;
  dataAbertura?: any;
  dataFechamento?: any;
  prioridade: any;
  observacoes: String;
  status: any;
  tecnico: any;
  cliente: any;
}

// export interface OSDTO {
//   id?: any;
//   dataAbertura?: any;
//   dataFechamento?: any;
//   prioridadeId: any;
//   observacoes: String;
//   statusId: any;
//   tecnicoId: any;
//   clienteId: any;
// }

export interface OSDTO {
  id?: any;
  dataAbertura?: any;
  dataFechamento?: any;
  prioridadeId: any;
  observacoes: String;
  statusId: any;
  tecnicoDTO: Tecnico;
  clienteDTO: Cliente;
}
