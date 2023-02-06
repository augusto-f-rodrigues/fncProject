import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from 'src/app/services/api-service.service';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'cadastro',
  templateUrl: './cadastro.component.html',
})
export class CadastroComponent {
  constructor(
    private readonly validationServices: ValidationService,
    private readonly apiServices: ApiService
  ) {}

  resetForm(my_form: NgForm) {
    my_form.resetForm();
  }

  procedures = ['Selecione uma opção', 'Paciente', 'Procedimento', 'Exame'];

  selected: Cadastro.Procedures;

  mostraPacienteBlock: boolean = false;
  mostraProcedimentoBlock: boolean = false;
  mostraExameBlock: boolean = false;

  procedureSelected: boolean = false;

  onSelected(value: string): void {
    this.selected = value;

    switch (value) {
      case 'Paciente':
        this.mostraPacienteBlock = true;
        this.mostraExameBlock = false;
        this.mostraProcedimentoBlock = false;
        break;

      case 'Exame':
        this.mostraPacienteBlock = false;
        this.mostraExameBlock = true;
        this.mostraProcedimentoBlock = false;
        break;

      case 'Procedimento':
        this.mostraPacienteBlock = false;
        this.mostraExameBlock = false;
        this.mostraProcedimentoBlock = true;
        break;

      default:
        this.mostraPacienteBlock = false;
        this.mostraExameBlock = false;
        this.mostraProcedimentoBlock = false;
        break;
    }

    this.procedureSelected =
      this.mostraPacienteBlock ||
      this.mostraProcedimentoBlock ||
      this.mostraExameBlock;
  }

  async onSubmit(form: any) {
    switch (this.selected) {
      case 'Paciente':
        const nomePc: string = form?.form?.value?.nome;
        const cpf: string = form?.form?.value?.cpf;
        const email: string = form?.form?.value?.email;

        const testaCPF = this.validationServices.testaCPF(cpf.toString());
        testaCPF ? null : alert('Cpf inserido inválido.');

        await this.apiServices.cadastroPaciente({ nome: nomePc, cpf, email });

        alert('Paciente criado com sucesso.');
        form.resetForm();
        break;

      case 'Procedimento':
        const codigo: string = form?.form?.value?.codigo.toString();
        const nomePr: string = form?.form?.value?.nome;
        const prazo: string = form?.form?.value?.prazo.toString();

        await this.apiServices.cadastroProcedimento({
          codigo,
          nome: nomePr,
          prazo,
        });

        alert('Procedimento criado com sucesso.');
        form.resetForm();
        break;

      case 'Exame':
        const codigoEx: string = form?.form?.value?.codigo.toString();
        const nomeEx: string = form?.form?.value?.nome;
        const coleta: string = form?.form?.value?.coleta.toString();
        const resultado: string = form?.form?.value?.resultado.toString();

        await this.apiServices.cadastroExame({
          codigo: codigoEx,
          nome: nomeEx,
          coleta,
          resultado,
        });

        alert('Exame criado com sucesso.');
        form.resetForm();
        break;

      default:
        break;
    }
  }
}
