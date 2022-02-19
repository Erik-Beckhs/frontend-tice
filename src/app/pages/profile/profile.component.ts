import { Component, OnInit } from '@angular/core';
//import swal from 'sweetalert';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  imageLoad:boolean=true;
  imageTemp:any;
  file:any;

  usuario:any = {
    grado:'ssegundo',
    nombre: 'Angel',
    apellidos: 'Quispe',
    usuario:'aquispe',
    correo:'aquispe@gmail.com',
    rol:"admin",
    img:""
  };

  constructor() { }

  ngOnInit(): void {

  }

  guardaUsuario(){
    //console.log('holaaaa');
    console.log(this.usuario);
  }
  
  updateImage(){
    // let file:object={
    //   img:this.imageTemp
    // };
    // let idContact:any = this.contact.id;
    // this._contact.updateImage(file, idContact);
    // .subscribe(res=>{
    //   this._contact.getSupplierAssocContact(this.contact.id).subscribe((resp)=>
    //   {
    //     //console.log(resp)
    //     this._contact.setContact(resp);
    //     this._contact.notificacion.emit =  resp;
    //     //console.log('Datos actualizados');
    //     //refrescar la pagina
    //       this.router.navigateByUrl('/cot-principal', { skipLocationChange: true }).then(() => {
    //       this.router.navigate(['/pages/profile']);
    //     }); 
    //   }
    // )
    // })
  }

  onFileChange(event:any) {
    this.file=event.target.files[0];
    if(!event){
      this.file = null
      return ;
    }

    if(this.file.type.indexOf('image')<0){
      //swal("HANSA Business", "Sólo puede elegir archivos de tipo imagen", "error");
      alert("Solo puede elegir archivos de tipo imagen");
      this.file=null;
      return ;
    }

    this.imageLoad=this.file;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(this.file);
    reader.onloadend = ()=>{
      //console.log(reader.result)
      this.imageTemp = reader.result;
    }
  }

}
