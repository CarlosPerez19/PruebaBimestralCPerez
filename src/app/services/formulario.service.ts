import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, query, orderBy } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface form {
  nombre: string;
  apellido: string;
  fechaNacimiento: Date;
  cedula: string;
  telefono: string;
  correo: string;
  direccion: string;
  institucion: string;
  genero:string
  edad: number;
  createdAt: number;
  sender: string;
}

@Injectable({
  providedIn: 'root'
})
export class FormularioService {
  constructor(private firestore: Firestore) {}

  agregarFormulario(data: form): Promise<any> {
    const formularioRef = collection(this.firestore, 'formularios');
    return addDoc(formularioRef, data);
  }

  obtenerFormularios(): Observable<form[]> {
    const formularioRef = collection(this.firestore, 'formularios');
    const q = query(formularioRef, orderBy('createdAt', 'desc'));
    return collectionData(q, { idField: 'id' }) as Observable<form[]>;
  }
}
