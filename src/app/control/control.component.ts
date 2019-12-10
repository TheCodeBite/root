import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css']
})
export class ControlComponent implements OnInit {
  id_autobus = null;

  user: any;
  admin = false;
  constructor(private _route:ActivatedRoute) { }

  ngOnInit() {
    //this.user = JSON.parse(localStorage.getItem('root_tobailongo'))
    this.user = localStorage.getItem('root_tobailongo')
    console.log("user" + this.user);
    
    if(this.user != null){
      this.admin =true;
    }else{
      window.location.replace('/')
    }

    this.id_autobus = this._route.snapshot.paramMap.get('id');
    console.log("el token es" + this.id_autobus);
  }

}
