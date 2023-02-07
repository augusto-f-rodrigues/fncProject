import { Injectable } from '@angular/core';
import { ApiService } from './api-service.service';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  constructor(private readonly apiServices: ApiService) {}

  testaCPF(strCPF: string): boolean {
    var Soma;
    var Resto;
    Soma = 0;
    if (strCPF == '00000000000') return false;

    for (let i = 1; i <= 9; i++)
      Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if (Resto == 10 || Resto == 11) Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10))) return false;

    Soma = 0;
    for (let i = 1; i <= 10; i++)
      Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if (Resto == 10 || Resto == 11) Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11))) return false;

    return true;
  }

  formatDate(date: Date) {
    let day, month, year;

    day = date.getDate();
    month = date.getMonth() + 1;
    year = date.getFullYear();

    day = day.toString().padStart(2, '0');

    month = month.toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  async calcBiggestTerm(date: Date) {
    const procedimentosList = await this.apiServices.resgatarProcedimentos();

    const maiorPrazo = procedimentosList
      .map((el) => +el.prazo)
      .reduce((a, b) => Math.max(a, b), 0);

    date.setDate(date.getDate() + maiorPrazo);

    console.log(date);

    return date;
  }

  async checkCpf(cpf: string): Promise<boolean> {
    const pacientesList: Paciente.Request[] =
      await this.apiServices.resgatarPacientes();
    if (pacientesList.find((el) => el.cpf === cpf)) {
      alert('Cpf já existe na base de dados.');
      return true;
    } else {
      return false;
    }
  }

  async checkEmail(email: string): Promise<boolean> {
    const pacientesList: Paciente.Request[] =
      await this.apiServices.resgatarPacientes();
    if (pacientesList.find((el) => el.email === email)) {
      alert('Email já existe na base de dados.');
      return true;
    } else {
      return false;
    }
  }
}
