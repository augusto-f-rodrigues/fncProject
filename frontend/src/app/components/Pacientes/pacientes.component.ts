import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api-service.service';

@Component({
  selector: 'pacientesPage',
  templateUrl: './pacientes.component.html',
})
export class PacientesComponent implements OnInit {
  constructor(private readonly apiServices: ApiService) {}

  pacientesList: any;


  
  async ngOnInit() {
    this.pacientesList = await this.apiServices.resgatarPacientes()
    console.log(this.pacientesList);
  }
}
