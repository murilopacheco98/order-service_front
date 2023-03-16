import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { OS, OSDTO } from 'src/app/models/os';
import { ClienteService } from 'src/app/services/cliente.service';
import { OsService } from 'src/app/services/os.service';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-os-read',
  templateUrl: './os-read.component.html',
  styleUrls: ['./os-read.component.css']
})
export class OsReadComponent implements AfterViewInit {

  lista: OSDTO[] = [];

  displayedColumns: string[] = ['tecnico', 'cliente', 'abertura', 'prioridade', 'status', 'action'];
  dataSource = new MatTableDataSource<OSDTO>(this.lista);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private service : OsService,
    private router : Router,
    private tecnicoService: TecnicoService,
    private clienteService: ClienteService) {}

  ngAfterViewInit() {
    this.findAll();
  }

  findAll():void {
    this.service.findAll().subscribe((resposta) => {
      resposta.forEach(x => {
        if(x.statusId != "2") {
          x.prioridadeId = this.prioridade(x.prioridadeId);
          x.statusId = this.status(x.statusId);
          this.lista.push(x);
        }
      })
      
      console.log(this.lista);
      this.dataSource = new MatTableDataSource<OSDTO>(this.lista);
      this.dataSource.paginator = this.paginator;
    })
  }

  navigateToCreate():void {
    this.router.navigate(['os/create'])
  }

  prioridade(x : any) {
    if(x == '0') {
      return 'baixa'
    } else if(x == '1') {
      return 'media'
    } else {
      return 'alta'
    }
  }

  status(x : any) {
    if(x == '0') {
      return 'Aberto'
    } else if(x == '1') {
      return 'Em andamento'
    } else {
      return 'Encerrado'
    }
  }
}