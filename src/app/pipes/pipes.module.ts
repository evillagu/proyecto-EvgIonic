import { NgModule } from '@angular/core';
import { FiltroPipe } from './pipe-filter/filtro.pipe';



@NgModule({
  declarations: [ FiltroPipe ],
  exports:[ FiltroPipe ],
  imports: []
})
export class PipeFilterModule { }
