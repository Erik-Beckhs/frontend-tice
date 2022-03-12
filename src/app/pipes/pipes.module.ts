import { NgModule } from '@angular/core';
import { EmptyImgPipe } from './empty-img.pipe';
import { UeducativasPipe } from './ueducativas.pipe';

@NgModule({
  declarations: [
    EmptyImgPipe,
    UeducativasPipe
  ],
  imports: [
    
  ],
  exports:[
    EmptyImgPipe,
    UeducativasPipe
  ]
})
export class PipesModule { }
