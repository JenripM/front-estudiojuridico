import {
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild,
  inject,
} from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { NgxLoadingModule, ngxLoadingAnimationTypes } from "ngx-loading";
import { trigger, style, transition, animate } from "@angular/animations";
import { DataService } from "../../data.service";
import { CommonModule } from "@angular/common";
import { ConvertTextToHtmlPipe } from "../../convert-text-to-html.pipe";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { GeminiConfig } from "../../chat-form";
import { API_KEY_CONF } from "../../../config";
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ClienteData, PredictService } from "./predict.service";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { Chart } from "chart.js";
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexNonAxisChartSeries, ApexResponsive, ApexTitleSubtitle, ApexXAxis, NgApexchartsModule } from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  title: ApexTitleSubtitle;
  responsive: ApexResponsive[];
  dataLabels: ApexDataLabels;
};
@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    NgxLoadingModule,
    ConvertTextToHtmlPipe,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    HttpClientModule,
    MatSnackBarModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgApexchartsModule
  ],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.scss",
  animations: [
    trigger("typeWritterEffect", [
      transition(":enter", [
        style({ opacity: 0 }),
        animate("2s", style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class AppDashboardComponent  implements OnInit {
  @ViewChild("messagesContainer") private messagesContainer!: ElementRef;
  private dataService = inject(DataService);
  public messagesHistory: { role: string; parts: string }[] = [];
  public userMessage!: string | null;
  public loading = false;
  public loadingTemplate!: TemplateRef<any>;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loadingConfig = {
    animationType: ngxLoadingAnimationTypes.circleSwish,
    primaryColour: "#ffffff",
    secondaryColour: "#ccc",
    tertiaryColour: "#dd0031",
    backdropBorderRadius: "3px",
  };
  public gQuestions = [
    
  ];
  public bQuestions = [
   
  ];
  tipoCasoOptions: string[] = ['Civil', 'Penal', 'Laboral', 'Mercantil', 'Administrativo', 'Ambiental'];
  generoOptions: string[] = ['Masculino', 'Femenino'];

  public characterSelection = [
    {
      id: 0,
      value: "Rosales y Asociados",
    },
    {
      id: 1,
      value: "Gemini",
    },
  ];

  temperatureOptions = [
    { value: 0.2, label: "Low Creativity" },
    { value: 0.5, label: "Moderate Creativity" },
    { value: 0.9, label: "High Creativity" },
  ];

  modelOptions = [
    { label: "Gemini v1.0.0-Pro (Basic)", value: "gemini-1.0-pro" },
    { label: "Gemini v1.0.0-Pro-001 (Updated)", value: "gemini-1.0-pro-001" },
    {
      label: "Gemini v1.5 (Experimental)",
      value: "gemini-1.5-pro",
      disabled: true,
    },
  ];

  chatForm = new FormGroup({
    apiKey: new FormControl(API_KEY_CONF || ""),
    temperature: new FormControl(this.temperatureOptions[2].value),
    bot: new FormControl(this.characterSelection[0]),
    model: new FormControl(this.modelOptions[0].value),
  });
  apiData: any[] = []; // Para almacenar los datos obtenidos de la API
  sendMessage(message: string) {
    if (!message || this.loading) return;
    setTimeout(() => this.scrollToBottom(), 0);
    this.loading = true;

    // Agregar el mensaje del usuario al historial
    this.messagesHistory.push(
      {
        role: 'user',
        parts: message,
      },
      {
        role: 'model',
        parts: '',
      }
    );

    // Si los datos no están cargados, cargarlos desde la API
    if (this.apiData.length === 0) {
      this.predictService.getPredicciones().subscribe({
        next: (data: any) => {
          this.loading = false;
          this.apiData = data; // Guardar los datos en la variable
          this.processMessage(message);
        },
        error: (error) => {
          this.loading = false;
          console.error('Error fetching data:', error);
          this.messagesHistory.push({
            role: 'model',
            parts: 'Lo siento, hubo un problema al obtener los datos. Intenta nuevamente.',
          });
          setTimeout(() => this.scrollToBottom(), 0);
        },
      });
    } else {
      // Si los datos ya están cargados, procesar el mensaje directamente
      this.processMessage(message);
    }
  }

  processMessage(message: string) {
    // Procesar el mensaje basado en los datos de la API
    let response: string;

    // Preguntas específicas
    if (message.toLowerCase().includes('casos civiles mas recientes')) {
      // Filtrar y ordenar los datos de la API
      const casosMercantiles = this.apiData.filter((item: any) => item.tipoCaso === 'Civil');
      const casosOrdenados = casosMercantiles.sort((a: any, b: any) => b.prediccion - a.prediccion);
      response = `Datos procesados: ${JSON.stringify(casosOrdenados, null, 2)}`;
    }
    else if (message.toLowerCase().includes('casos penales mas recientes')) {
      // Filtrar y ordenar los datos de la API
      const casosMercantiles = this.apiData.filter((item: any) => item.tipoCaso === 'Penal');
      const casosOrdenados = casosMercantiles.sort((a: any, b: any) => b.prediccion - a.prediccion);
      response = `Datos procesados: ${JSON.stringify(casosOrdenados, null, 2)}`;
     }
     else if (message.toLowerCase().includes('casos mercantiles mas recientes')) {
      // Filtrar y ordenar los datos de la API
      const casosMercantiles = this.apiData.filter((item: any) => item.tipoCaso === 'Mercantil');
      const casosOrdenados = casosMercantiles.sort((a: any, b: any) => b.prediccion - a.prediccion);
      response = `Datos procesados: ${JSON.stringify(casosOrdenados, null, 2)}`;
     } 
     else if (message.toLowerCase().includes('casos administrativos mas recientes')) {
      // Filtrar y ordenar los datos de la API
      const casosMercantiles = this.apiData.filter((item: any) => item.tipoCaso === 'Administrativo');
      const casosOrdenados = casosMercantiles.sort((a: any, b: any) => b.prediccion - a.prediccion);
      response = `Datos procesados: ${JSON.stringify(casosOrdenados, null, 2)}`;
     }  else if (message.toLowerCase().includes('caso con mayor prediccion')) {
      // Encontrar el caso con la mayor predicción
      const casoMaxPrediccion = this.apiData.reduce((max: any, item: any) => (item.prediccion > max.prediccion ? item : max), this.apiData[0]);
      response = `Caso con mayor predicción: ${JSON.stringify(casoMaxPrediccion, null, 2)}`;
    } else if (message.toLowerCase().includes('total de casos')) {
      // Contar el número total de casos
      const totalCasos = this.apiData.length;
      response = `Total de casos: ${totalCasos}`;
    } else if (message.toLowerCase().includes('casos por genero')) {
      // Contar casos por género
      const casosPorGenero = this.apiData.reduce((acc: any, item: any) => {
        acc[item.genero] = (acc[item.genero] || 0) + 1;
        return acc;
      }, {});
      response = `Casos por género: ${JSON.stringify(casosPorGenero, null, 2)}`;
    } else if (message.toLowerCase().includes('casos por rango de edad')) {
      const casosPorRangoEdad = this.apiData.reduce((acc: any, item: any) => {
        if (item.edad < 20) acc['Menores de 20'] = (acc['Menores de 20'] || 0) + 1;
        else if (item.edad >= 20 && item.edad < 30) acc['20-29'] = (acc['20-29'] || 0) + 1;
        else if (item.edad >= 30 && item.edad < 40) acc['30-39'] = (acc['30-39'] || 0) + 1;
        else if (item.edad >= 40 && item.edad < 50) acc['40-49'] = (acc['40-49'] || 0) + 1;
        else acc['50 y más'] = (acc['50 y más'] || 0) + 1;
        return acc;
      }, {});
      response = `Casos por rango de edad: ${JSON.stringify(casosPorRangoEdad, null, 2)}`;
    }
     else if (message.toLowerCase().includes('casos por tipo de caso')) {
      // Contar casos por tipo de caso
      const casosPorTipo = this.apiData.reduce((acc: any, item: any) => {
        acc[item.tipoCaso] = (acc[item.tipoCaso] || 0) + 1;
        return acc;
      }, {});
      response = `Casos por tipo de caso: ${JSON.stringify(casosPorTipo, null, 2)}`;
    } else {
      response = 'No entiendo la pregunta. Por favor, pregunta algo sobre los casos o los datos disponibles.';
    }

    // Agregar la respuesta al historial de mensajes
    this.messagesHistory = this.messagesHistory.slice(0, -2);
    this.messagesHistory.push(
      {
        role: 'user',
        parts: message,
      },
      {
        role: 'model',
        parts: response,
      }
    );

    this.loading = false;
    setTimeout(() => this.scrollToBottom(), 0);
  }

  scrollToBottom(): void {
    try {
      this.messagesContainer.nativeElement.scrollTop =
        this.messagesContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  ngAfterViewInit() {
    this.scrollToBottom();
  }
  predictForm: FormGroup;
  predictionResult: number | null = null; // Propiedad para el resultado

  constructor(private fb: FormBuilder, private predictService: PredictService, private snackBar: MatSnackBar,    private http: HttpClient // Asegúrate de que HttpClient esté inyectado
  ) {
    this.predictForm = this.fb.group({
      id_cliente: ['', Validators.required],
      edad: ['', Validators.required],
      genero: ['', Validators.required],
      tipo_caso: ['', Validators.required],
      fecha_inicio: ['', Validators.required],
      fecha_cierre: ['', Validators.required],
      ultima_actividad: ['', Validators.required]
    });
    this.chartOptions = {
      series: [0, 0], // Inicialmente sin datos
      chart: {
        type: 'pie',
        height: 350
      },
      title: {
        text: 'Distribución de Predicciones'
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }
      ],
      labels: ['No Deserta', 'Si Deserta'], // Etiquetas para las leyendas
      dataLabels: {
        enabled: true
      }
    };
  }


  predictionMessage: string | null = null; // Propiedad para el mensaje
  predictionR: number | null = null; // Propiedad para el resultado
  onSubmit(): void {
    if (this.predictForm.valid) {
      const formData = this.predictForm.value;
      const payload = {
        id_cliente: [formData.id_cliente],
        edad: [formData.edad],
        genero: [formData.genero],
        tipo_caso: [formData.tipo_caso],
        fecha_inicio: [formData.dias_inicio],
        fecha_cierre: [formData.dias_cierre],
        ultima_actividad: [formData.dias_ultima_actividad]
      };

      this.predictService.predict(payload).subscribe(
        response => {
          // Actualiza el mensaje basado en el resultado
          this.predictionR=response.prediction;
          this.predictionMessage = response.prediction === 0 ? 'No desertará' : 'Desertará';
        },
        error => {
          console.error('Error al hacer la predicción:', error);
          this.predictionMessage = 'Error al realizar la predicción';
        }
      );
    }
  }

  registerData(): void {
      const formData = this.predictForm.value;
      const payload = {
        idCliente: formData.id_cliente,
        edad: formData.edad,
        genero: formData.genero,
        tipoCaso: formData.tipo_caso,
        fechaInicio: formData.fecha_inicio,
        fechaCierre: formData.fecha_cierre,
        ultimaActividad: formData.ultima_actividad,
        prediccion: this.predictionR // Incluye el resultado de la predicción en el payload
      };

      this.http.post<any>('https://back-estudiojuridico.onrender.com/api/v1/prediccion/save', payload)
        .subscribe(
          response => {
            console.log('Datos registrados exitosamente:', response);
            this.snackBar.open('Datos registrados exitosamente', 'Cerrar', {
              duration: 3000,
            });
          },
          error => {
            console.error('Error al registrar los datos:', error);
            this.snackBar.open('Error al registrar los datos. Por favor, intenta nuevamente.', 'Cerrar', {
              duration: 3000,
            });
          }
        );
 
  }

  
  registerData2(): void {
    // Datos de prueba para enviar a la API
    const payload = {
      idCliente: 1423, // Valor de prueba
      edad: 25, // Valor de prueba
      genero: 'Masculino', // Valor de prueba
      tipoCaso: 'Tipo de Caso Ejemplo', // Valor de prueba
      fechaInicio: '2024-01-01', // Valor de prueba
      fechaCierre: '2024-12-31', // Valor de prueba
      ultimaActividad: '2024-08-04', // Valor de prueba
      prediccion: 1 // Valor de prueba para la predicción
    };
  
    this.http.post<any>('https://back-estudiojuridico.onrender.com/api/v1/prediccion/save', payload)
      .subscribe(
        response => {
          console.log('Datos registrados exitosamente:', response);
          this.snackBar.open('Datos registrados exitosamente', 'Cerrar', {
            duration: 3000,
          });
        },
        error => {
          console.error('Error al registrar los datos:', error);
          this.snackBar.open('Error al registrar los datos. Por favor, intenta nuevamente.', 'Cerrar', {
            duration: 3000,
          });
        }
      );
  }

  chart: any;

  ngOnInit(): void {
    this.fetchData();

  }
  public chartOptions: ChartOptions;
  fetchData() {
    this.http.get<any[]>('https://back-estudiojuridico.onrender.com/api/v1/prediccion/all').subscribe(data => {
      // Contar las predicciones de 1 y 0
      const countPred1 = data.filter(item => item.prediccion === 1).length;
      const countPred0 = data.filter(item => item.prediccion === 0).length;

      // Actualizar las opciones del gráfico con los datos obtenidos
      this.chartOptions = {
        ...this.chartOptions,
        series: [countPred0, countPred1],
      };
    });
  }

}
