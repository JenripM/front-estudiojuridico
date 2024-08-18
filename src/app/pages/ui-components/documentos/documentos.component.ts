import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

export interface Documento {
  idDocumento: number;
  nombreArchivo: string;
  tipo: string;
  caso: {
    id: number;
    descripcion: string;
    estado: string;
    cliente: {
      nombres: string;
    }
  };
}

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.scss']
})
export class AppDocumentosComponent implements OnInit {
  displayedColumns: string[] = ['idDocumento', 'tipo', 'caso', 'actions'];
  dataSource: MatTableDataSource<Documento>;
  documentoUrl: SafeResourceUrl | undefined;
  isPdf: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {
    this.dataSource = new MatTableDataSource<Documento>([]);
  }

  ngOnInit(): void {
    this.obtenerDocumentos();
  }

  obtenerDocumentos() {
    this.http.get<Documento[]>('https://back-estudiojuridico.onrender.com/api/v1/documento/all')
      .subscribe(documentos => {
        this.dataSource.data = documentos;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, error => {
        console.error('Error al obtener los Documentos:', error);
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  redirectToDocument(nombreArchivo: string, tipo: string) {
    let url: string = '';
    
    if (!nombreArchivo) {
        console.error('El nombre del archivo está vacío');
        return;
    }

    console.log('Tipo de archivo:', tipo);

    if (tipo === 'PDF') {
        url = `https://front-estudiojuridico.vercel.app/assets/documentos/${nombreArchivo}`;
    } else if (tipo === 'DOC' || tipo === 'XLS') {
        // Usa Google Docs Viewer para archivos docx y xls
        url = `https://docs.google.com/gview?url=https://front-estudiojuridico.vercel.app/assets/documentos/${nombreArchivo}&embedded=true`;
    } else if (tipo === 'jpg' || tipo === 'png') {
        // Para imágenes, solo muestra la URL directamente
        url = `https://front-estudiojuridico.vercel.app/assets/documentos/${nombreArchivo}`;
    } else {
        console.error('Tipo de archivo no soportado');
        return;
    }
    window.open(url, '_blank');
}

}
