import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api-service.service';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'cadastro',
  templateUrl: './cadastro.component.html',
})
export class CadastroComponent implements OnInit {
  constructor(
    private readonly validationServices: ValidationService,
    private readonly apiServices: ApiService
  ) {}

  procedures = ['Selecione uma opção', 'Paciente', 'Procedimento', 'Exame'];

  pacientesList: any;
  procedimentosList: any;

  selected: Cadastro.Procedures;
  procedureSelected: boolean = false;

  mostraPacienteBlock: boolean = false;
  mostraProcedimentoBlock: boolean = false;
  mostraExameBlock: boolean = false;

  formatDate: string = '';
  
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

  async disponibilityDate(date: string){
    const strToDate = new Date(date)
    strToDate.setDate(strToDate.getDate() + 1);
   
    const biggestTerm = await this.validationServices.calcBiggestTerm(strToDate);

    this.formatDate = this.validationServices.formatDate(biggestTerm);
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
        const paciente: string = form?.form?.value?.paciente;
        const procedimento: string = form?.form?.value?.procedimento;
        const coleta: string = form?.form?.value?.coleta.toString();
        const resultado: string = form?.form?.value?.resultado.toString();

        await this.apiServices.cadastroExame({
          procedimento,
          paciente,
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

  async ngOnInit() {
    this.pacientesList = await this.apiServices.resgatarPacientes()
    this.procedimentosList = await this.apiServices.resgatarProcedimentos()
  }
}
