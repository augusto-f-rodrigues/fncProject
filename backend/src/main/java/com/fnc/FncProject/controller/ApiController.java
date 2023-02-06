package com.fnc.FncProject.controller;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin("http://localhost:4200")
public class ApiController {

    public List listaPacientes = new ArrayList<Object>();
    public List listaProcedimentos = new ArrayList<Object>();
    public List listaExames = new ArrayList<Object>();

    @GetMapping("/pacientes")
    public List getPacientes(){
        return listaPacientes;
    }

    @PostMapping("/pacientes")
    public Object createPaciente(@RequestBody Object paciente){
        listaPacientes.add(paciente);
        return paciente;
    }

    @GetMapping("/procedimentos")
    public List getProcedimentos(){
        return listaProcedimentos;
    }

    @PostMapping("/procedimentos")
    public Object createProcedimento(@RequestBody Object procedimento){
        listaProcedimentos.add(procedimento);
        return procedimento;
    }

    @GetMapping("/exames")
    public List getExames(){
        return listaExames;
    }

    @PostMapping("/exames")
    public Object createExames(@RequestBody Object exame){
        listaExames.add(exame);
        return exame;
    }

}
