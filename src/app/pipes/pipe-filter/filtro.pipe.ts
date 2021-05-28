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

  //   textFilter = '';
  // filterTipo(event) {
  //   const filterText = event.target.value;
  //   this.textFilter = filterText;
  // }

    // <ion-toolbar>
    //     <ion-searchbar class="margin-top__10px" placeholder="buscar tipo....." (ionChange)="filterTipo($event)" [debounce]="250" showCancelButton="always" animated color="tertiary" type="country-name">
    //     </ion-searchbar>
    // </ion-toolbar> 
    // <ion-card class="card-text-filter" *ngFor="let dtaService of dtaServicePlace | async">
    //     <ion-list *ngFor="let dta; let i=index of dtaService.products | filtro: textFilter">
    //         <div class="displayFlex-row displayFlex-row__justi-around display-none">
    //             <ion-label>{{dta.genero}}</ion-label>
    //             <ion-avatar>
    //                 <img src={{dta.icon}}>
    //             </ion-avatar>
    //         </div>
    //     </ion-list>

    // </ion-card>
    
    
  }

}
