import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private readonly httpService: HttpClient) {}

  // PACIENTES
  async cadastroPaciente(paciente: Paciente.Request) {
    const response = await lastValueFrom(
      this.httpService.post('http://localhost:8080/api/pacientes', paciente)
    ).catch((e) => throwError(() => new Error(e)));

    return response;
  }

  async resgatarPacientes() {
    const response = await lastValueFrom(this.httpService.get('http://localhost:8080/api/pacientes'));

    return response;
  }

  // PROCEDIMENTOS
  async cadastroProcedimento(procedimento: Procedimento.Request) {
    const response = await lastValueFrom(
      this.httpService.post('http://localhost:8080/api/procedimentos', procedimento)
    ).catch((e) => throwError(() => new Error(e)));

    return response;
  }

  async resgatarProcedimentos() {
    const response = await lastValueFrom(this.httpService.get('http://localhost:8080/api/procedimentos'));

    return response;
  }

  // EXAME
  async cadastroExame(exame: Exame.Request) {
    const response = await lastValueFrom(
      this.httpService.post('http://localhost:8080/api/exames', exame)
    ).catch((e) => throwError(() => new Error(e)));

    return response;
  }

  async resgatarExames() {
    const response = await lastValueFrom(this.httpService.get('http://localhost:8080/api/exames'));

    return response;
  }
}
