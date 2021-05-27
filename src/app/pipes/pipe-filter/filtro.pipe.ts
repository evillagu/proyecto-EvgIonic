import { Pipe, PipeTransform } from '@angular/core';
import { Products } from 'src/app/models-interfaces/producs';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  text : String = '';

  transform(product: Products[], text: string): Products[] {
    
    console.log(text);
    text = this.text + text;
    if(text.length === 0){
      return product;
    }
    // text.toLocaleLowerCase();
    // return product.filter((filProduc)=>{
    //   return filProduc.genero.toLocaleLowerCase().includes(text);
    // });
    
    
  }

}
