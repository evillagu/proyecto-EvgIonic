import { Component, OnInit } from '@angular/core';
import { Observable} from 'rxjs';
import { Navigation } from 'src/app/models-interfaces/navegacion';
import { GeneralService } from 'src/app/services/general.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  navegacion : Observable<Navigation[]>;
  constructor(private dataService : GeneralService) {}

  ngOnInit(): void {
    this.navegacion = this.dataService.getRedirecTo();
  }
}
