export class Cliente {
    id: number;
    nombre: string;
    apellido: string;
    correoElectronico: string;
    direccion : string;
    telefono: string;
    deserto: number;
  
    constructor(id: number, nombre: string, apellido: string, correoElectronico: string,direccion:string, telefono: string, deserto:number) {
      this.id = id;
      this.nombre = nombre;
      this.apellido = apellido;
      this.correoElectronico = correoElectronico;
      this.direccion = direccion;
      this.telefono = telefono;
      this.deserto = deserto;
    }
  }