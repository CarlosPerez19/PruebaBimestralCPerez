import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormularioService, form } from '../services/formulario.service';


@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonicModule,CommonModule,ReactiveFormsModule]
})
export class HomePage implements OnInit {
  formulario!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private formularioService: FormularioService
  ) {}

  ngOnInit() {
    this.formulario = this.fb.group({
      nombre: [''],
      apellido: [''],
      fechaNacimiento: [''],
      cedula: [''],
      telefono: [''],
      correo: [''],
      direccion: [''],
      institucion: [''],
      edad: [''],
      genero: ['']
    });
  }

  enviarFormulario() {
    if (this.formulario.invalid) return;

    const data: form = {
      ...this.formulario.value,
      createdAt: Date.now(),
      sender: 'Carlos Pérez' 
    };

    this.formularioService.agregarFormulario(data)
      .then(() => {
        console.log('Formulario enviado correctamente');
        this.formulario.reset();
      })
      .catch(error => {
        console.error('Error al enviar formulario:', error);
      });
  }



}
