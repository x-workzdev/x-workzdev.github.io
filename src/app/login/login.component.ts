import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginDetails } from './LoginDetails';
import { Router } from '@angular/router';
import { Observable, Observer, of, observable } from 'rxjs';
import { EventEmitter } from '@angular/core';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  clientResponseDetails:any;
  currentClient:any;
  user:String;
 displayValue=false;
 @Output() countChanged: EventEmitter<any> = new EventEmitter();
  private loginDetail = new LoginDetails();

  constructor(private loginService : LoginService, private router : Router) { }

  ngOnInit() {
  }

  loginForm = new FormGroup({
    emailId : new FormControl('',[Validators.required,Validators.email]),
    password : new FormControl('' , [Validators.required , Validators.minLength(3) ])
  });

  Login(LoginInformation)
  {
       this.loginDetail.emailId = this.EmailId.value;
       this.loginDetail.password = this.Password.value;

      this.loginService.sendloginDetails(this.loginDetail).subscribe(
        (response) => {

             if(response !=null){
             var records = JSON.stringify(response)     
             console.log("Response ="+records);
             
             if(response.body.object !=null && response.body != null){
             this.clientResponseDetails = response.body.object
             sessionStorage.setItem("companyName",this.clientResponseDetails.companyName);
            }                 
            
             var statusCode = response.body.statusCode;
             console.log('Response Code ='+statusCode);

             if(statusCode==201){
              alert(response.body.message);
              this.router.navigate(['/profile', response]);
              }

              else if (statusCode == 200) {
               this.displayValue=true
               this.countChanged.emit(this.displayValue);
                 
              sessionStorage.setItem("currentUser", this.EmailId.value); 
              this.user = this.EmailId.value;
              alert(response.body.message);
              this.router.navigate(['/profile', response]);
              }
             else
             {
              alert(response.body.message);
              this.router.navigate(['/login']);
             }
          }  
            error =>((error: any) => {
              console.log("Error in authentication");
              if (error.statusCode === 500) {
                  return Observable.throw(new Error(error.statusCode));
              }
              else if (error.statusCode === 400) {
                  return Observable.throw(new Error(error.statusCode));
              }
              else if (error.statusCode === 409) {
                  return Observable.throw(new Error(error.statusCode));
              }
              else if (error.statusCode === 406) {
                  return Observable.throw(new Error(error.statusCode));
              }
          });
       }
      );
  }

  logout() 
    { 
    sessionStorage.removeItem('emailId');
     this.router.navigate(['/login']);
   }

  get EmailId(){
      return this.loginForm.get('emailId');
  }

  get Password(){
      return this.loginForm.get('password');
  }

}

