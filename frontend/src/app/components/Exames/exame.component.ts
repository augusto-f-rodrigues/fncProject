import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api-service.service';

@Component({
  selector: 'examePage',
  templateUrl: './exame.component.html',
})
export class ExameComponent implements OnInit {
  constructor(private readonly apiServices: ApiService) {}

  examesList: any;

  async ngOnInit() {
    this.examesList = await this.apiServices.resgatarExames()
  }
}
