import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-acorrdion',
  templateUrl: './acorrdion.component.html',
  styleUrls: ['./acorrdion.component.scss'],
})
export class AcorrdionComponent implements OnInit {

   @Input()
   name : string;

   @Input()
   description : string;

   @Input()
   image : string;
 
   @Output()
   change : EventEmitter<string> = new EventEmitter<string>();
 

   public isMenuOpen : boolean = false;
   constructor() { }
   ngOnInit() {
   }
 

   public toggleAccordion() : void
   {
       this.isMenuOpen = !this.isMenuOpen;
   }

   public broadcastName(name : string) : void
   {
      this.change.emit(name);
   }
 
 }