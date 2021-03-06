import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ResourceLoader } from '@angular/compiler';
import Swal from 'sweetalert2'
import { DatabaseService } from '../database/database.service';
declare var jQuery: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  clases: any = [];
  autobuses: any = [];
  rutas: any = [];
  horarios: any = [];
  viajes: any = [];
  historial: any = [];

  autobuses_premier = [];
  autobuses_lite = [];
  autobuses_estandar = [];

  value = 1;
  id_autobus = null;

  editar = false;

  lite = 'btn-secondary'
  premier = 'btn-danger'
  estandar = 'btn-secondary'

  form_clase: FormGroup;
  form_autobus: FormGroup;
  form_lugar: FormGroup;
  form_viajes: FormGroup;
  form_horario: FormGroup;
  form_itinerario: FormGroup;

  prueba = "disable='true'"
  constructor(private fb: FormBuilder, private db: DatabaseService) { }

  ngOnInit() {
    this.db.verHorarios().subscribe(response => {
      this.horarios = response;
    });

    this.db.verClases().subscribe(response => {
      this.clases = response;
    });

    this.db.verLugares().subscribe(response => {
      this.rutas = response;
    });

    this.db.verViajes().subscribe(response => {
      this.viajes = response;
    });

    this.db.verBoletos().subscribe(response => {
      this.historial = response;
    })

    this.db.verAutobuses().subscribe(response => {
      this.autobuses = response;
      this.autobuses_estandar = [];
      this.autobuses_premier = [];
      this.autobuses_lite = [];

      for (let i of this.autobuses) {
        if (i.clase == 1) {
          this.autobuses_estandar.push(i)
        } else if (i.clase == 2) {
          this.autobuses_premier.push(i)
        } else if (i.clase == 3) {
          this.autobuses_lite.push(i)
        }
      }

    })
    //FORMULARIOS
    this.form_lugar = this.fb.group({
      id: [''],
      nombre: ['']
    });

    this.form_horario = this.fb.group({
      id: [''],
      hora: ['']
    })

    this.form_itinerario = this.fb.group({
      fecha_salida: [''],
      fecha_regreso: [''],
      autobus: [''],
      hora: [''],
      viaje: ['']
    });

    this.form_clase = this.fb.group({
      nombre: [''],
      costo: ['']
    });

    this.form_autobus = this.fb.group({
      id:[''],
      estado: [''],
      nombre: [''],
      clase: ['']
    });

    this.form_viajes = this.fb.group({
      id:[''],
      destino: [''],
      origen: [''],
      nombre_origen: [''],
      nombre_destino: [''],
      km: ['']
    });

    //VERIFICACION DEL LOGIN
    /* this.user = localStorage.getItem('root_tobailongo')
    if (this.user != null) {
      this.login = true;
    }

    if (this.login == false) {
      (function ($) {
        $(document).ready(function () {
          $('#exampleModal').modal('show');
        });
      })(jQuery);
    }*/
  }

  //METODOS DE PETICIONES A LA BASE DE DATOS.

  agregarClase() {
    this.db.agregarClase(this.form_clase.value).subscribe(response => {
      Swal.fire(
        'Dato guardado!',
        'Clase agregada con exito!',
        'success'
      )
      this.ngOnInit();
    })
  }

  agregar_autobus() {
    this.db.agregarAutobus(this.form_autobus.value).subscribe(response => {
      Swal.fire(
        'Dato guardado!',
        'Autobus agregado con exito!',
        'success'
      )
      this.ngOnInit();
    })
  }

  agregar_lugar() {
    this.db.agregarLugar(this.form_lugar.value).subscribe(response => {
      console.log(response);
      Swal.fire(
        'Dato guardado!',
        'Lugar agregado con exito!',
        'success'
      )
      this.ngOnInit();
    })
  }

  agregar_ruta() {
    this.db.agregarViaje(this.form_viajes.value).subscribe(response => {
      console.log(response);
      Swal.fire(
        'Dato guardado!',
        'Ruta agregada con exito!',
        'success'
      )
      this.ngOnInit();
    });
  }

  agregar_Hora() {
    console.log(this.form_horario.value);

    this.db.agregarHorario(this.form_horario.value).subscribe(response => {
      console.log(response);
      Swal.fire(
        'Dato guardado!',
        'Horario agregado con exito!',
        'success'
      )
      this.ngOnInit();
    });
  }

  agregar_itinerario() {
    this.form_itinerario.value.autobus = this.id_autobus;
    

    this.db.agregarItinerario(this.form_itinerario.value).subscribe(response => {
      console.log(response);
      Swal.fire(
        'Dato guardado!',
        'Itinerario agregado con exito!',
        'success'
      )
      this.ngOnInit();
    })
  }

  editar_lugar(){
    console.log(this.form_lugar.value.id + " " +this.form_lugar.value);

    this.db.editarLugar(this.form_lugar.value.id, this.form_lugar.value).subscribe(response => {
      console.log(response);
      Swal.fire(
        'Dato Editado!',
        'Lugar editado con exito!',
        'success'
      )
      this.ngOnInit()
      
    });
    
  }

  editar_autobus(){
    this.db.editarAutobus(this.form_autobus.value.id, this.form_autobus.value).subscribe(response => {
      console.log(response);
      Swal.fire(
        'Dato Editado!',
        'Autobus editado con exito!',
        'success'
      )
      this.ngOnInit()
    });
  }

  editar_viaje(){
    this.db.editarViaje(this.form_viajes.value.id, this.form_viajes.value).subscribe(response => {
      console.log(response);
      Swal.fire(
        'Dato Editado!',
        'Viaje editado con exito!',
        'success'
      )
      this.ngOnInit()
      
    })
  }

  editar_hora(){
    this.db.editarHorario(this.form_horario.value.id, this.form_horario.value).subscribe(response => {
      console.log(response);
      Swal.fire(
        'Dato Editado!',
        'Horario editado con exito!',
        'success'
      )
      this.ngOnInit()
    });
  }


  //ACCIONES DE OTROS BOTONES

  btn_historial(id: number){
    this.id_autobus = id;
  }

  btn_itinerario(id: number) {
    this.id_autobus = id;
  }

  choose_btn(value) {
    this.value = value;
    if (value == 1) {
      this.lite = 'btn-secondary';
      this.premier = 'btn-danger';
      this.estandar = 'btn-secondary';
    }

    if (value == 2) {
      this.lite = 'btn-danger';
      this.premier = 'btn-secondary';
      this.estandar = 'btn-secondary';
    }

    if (value == 3) {
      this.lite = 'btn-secondary';
      this.premier = 'btn-secondary';
      this.estandar = 'btn-danger';
    }

  }

  confirm_delete() {
    Swal.fire({
      title: '¿Enviaras al mecanico este autobus?',
      text: "Si envias al mecanico este no podra se utilizado",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Enviarlo',
      cancelButtonText: 'No, Cancelar'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Autobus Enviado',
          'El autobus a sido enviado al mecanico',
          'success'
        )
      }
    })
  }

  agregar(){
    this.editar = false;
  }

  btn_editar_autobus(form: any){
    this.editar = true;
    this.form_autobus.setValue(form);
  }

  btn_editar_lugar(form: any){
    this.editar = true;
    this.form_lugar.setValue(form);
  }

  btn_editar_hora(form: any){
    this.editar = true;
    this.form_horario.setValue(form);
  }

  btn_editar_viaje(form: any){
    this.editar = true;
    this.form_viajes.setValue(form);
  }
}
