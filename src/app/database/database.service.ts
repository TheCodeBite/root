import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  url = 'https://runliteapi.herokuapp.com/api/v1/';
  constructor(private http: HttpClient) { }

  //Clases
  agregarClase(clase: any){ return this.http.post(this.url + 'clases/', clase); }

  verClases(){ return this.http.get(this.url + 'clases/'); }

  editarClase(id: number, clase: any){ return this.http.put(this.http + 'clases/' + id + '/', clase); }


  //Autobuses
  agregarAutobus(autobus: any){ return this.http.post(this.url + 'autobuses/', autobus); }

  verAutobuses(){ return this.http.get(this.url + 'autobuses/'); }

  editarAutobus(id: number, autobus: any){ return this.http.put(this.url + 'autobuses/' + id + '/', autobus); }


  //Lugares
  agregarLugar(lugar: any){ return this.http.post(this.url + 'lugares/', lugar) }

  verLugares(){ return this.http.get(this.url + 'lugares/'); }

  editarLugar(id: number, lugar: any) { return this.http.put(this.url + 'lugares/' + id + '/', lugar) }


  //Viajes
  agregarViaje(viaje: any){ return this.http.post(this.url + 'viajes/', viaje); }

  verViajes(){ return this.http.get(this.url + 'viajes/'); }

  editarViaje(id: number, viaje: any){ return this.http.put(this.url + 'viajes/' + id + '/', viaje); }

  //HORARIO
  agregarHorario(horario: any){ return this.http.post(this.url + 'horas/', horario); }

  verHorarios(){ return this.http.get(this.url + 'horas/'); }

  editarHorario(id: number, horario: any){ return this.http.put(this.url + 'horas/' + id + '/', horario); }


  //Intinerario
  agregarItinerario(itinerario: any){ return this.http.post(this.url + 'itinerario/', itinerario); }

  verItinerarios(){ return this.http.get(this.url + 'itinerario/'); }

  editarItinerario(id: number, intinerario: any){ this.http.put(this.url + 'itinerario/' + id +'/', intinerario); }
}
