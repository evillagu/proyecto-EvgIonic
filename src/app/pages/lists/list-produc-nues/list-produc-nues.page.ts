import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Places } from 'src/app/models-interfaces/supermarkets';
import { DataService } from 'src/app/services/data.service';
@Component({
  selector: 'app-list-produc-nues',
  templateUrl: './list-produc-nues.page.html',
  styleUrls: ['./list-produc-nues.page.scss'],
})
export class ListProducNuesPage implements OnInit {

  
  dtaServicePlace : Observable<Places[]>;
  
  constructor( private dataService: DataService) { }

  ngOnInit() {
    // this.dtaServicePlace = this.dataService.getData().pipe(map((response) => {
    //   response = response.filter((data) => data.sitio.toLowerCase() !== "general");
    //   return response;
    //   }));
      
  }
  onClickbtn(){
    alert("prueba");
  }

  

}
