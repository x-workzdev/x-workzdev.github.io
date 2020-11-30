import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client-app';
  userId:string;
  companyName:any;
  condition=false;
  
  constructor(private router : Router) { }
  
  countChangedHandler(event:boolean){
    this.condition=event
    console.log("Success Event Handling="+this.condition);
    if(this.condition){
    this.userId = sessionStorage.getItem("currentUser");
    this.companyName = sessionStorage.getItem("companyName");
    console.log('current user='+this.userId);
  }
  }

  logout()
  { 
   this.condition=false;
   window.sessionStorage.removeItem("currentUser");
   this.router.navigate(['/login']);
   }
 
  
}
