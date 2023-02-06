import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api-service.service';

@Component({
  selector: 'procedimentoPage',
  templateUrl: './procedimento.component.html',
})
export class ProcedimentoComponent implements OnInit {
  constructor(private readonly apiServices: ApiService) {}

  procedimentosList: any;


  
  async ngOnInit() {
    this.procedimentosList = await this.apiServices.resgatarProcedimentos()
  }
}
