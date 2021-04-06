import { Component, OnInit } from '@angular/core';
import { Observable} from 'rxjs';
import { GeneralService } from 'src/app/services/general.service';
import { Navigation} from '../../models-interfaces/navegacion';

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
