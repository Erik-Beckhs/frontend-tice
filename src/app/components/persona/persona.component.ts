import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {
  imageLoad:boolean=true;

  constructor() { }

  ngOnInit(): void {
  }

  onFileChange(e){

  }

  updateImage(){

  }
}
