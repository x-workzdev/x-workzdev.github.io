import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable} from 'rxjs';
import { CreateTicketService } from './createTicket.service';
import { TicketDetails } from './TicketDetails';


@Component({
  templateUrl: './createTicket.component.html',
  styleUrls: ['./createTicket.component.scss']
})
export class CreateTicketComponent implements OnInit {

  private ticketDetails = new TicketDetails();
  CuurentcompanyName:any;
  constructor(private createTicketService : CreateTicketService, private router : Router) { }

  ngOnInit() {
    this.CuurentcompanyName = sessionStorage.getItem("companyName");
  }
    createTicketForm = new FormGroup({
    companyName: new FormControl('' , Validators.required),
    model: new FormControl('' , Validators.required),
    serialNo: new FormControl('', Validators.required),
    mcType : new FormControl('' , Validators.required),
    problem : new FormControl('' , Validators.required),
    clientComment: new FormControl(),
  });

CreateTicket(createTicket)
  {
      this.ticketDetails.companyName = this.CuurentcompanyName;
      this.ticketDetails.model = this.Model.value;
      this.ticketDetails.serialNo = this.SerialNo.value;
      this.ticketDetails.mcType = this.McType.value;
      this.ticketDetails.problem = this.Problem.value;
      this.ticketDetails.clientComment = this.ClientComment.value;
      
      console.log('client comment =='+this.ticketDetails.clientComment)
      this.createTicketService.sendCreateTicketDetails(this.ticketDetails).subscribe(
        response => {
          var records = JSON.stringify(response)     
          console.log("Response ="+records);
         
          var statusCode = response.body.statusCode;
          console.log('Response Code ='+statusCode);

          if(statusCode==201){
           alert(response.body.message);
           this.router.navigate(['/tickets', response]);
           }

           else if (statusCode == 200) {
           alert(response.body.message);
           this.router.navigate(['/tickets', response]);
           }
          else
          {
           alert(response.body.message);
           this.router.navigate(['/createTicket']);
          }
         error =>((error: any) => {
           console.log("Error in authentication");
           if (error.status === 500) {
               return Observable.throw(new Error(error.status));
           }
           else if (error.status === 400) {
               return Observable.throw(new Error(error.status));
           }
           else if (error.status === 409) {
               return Observable.throw(new Error(error.status));
           }
           else if (error.status === 406) {
               return Observable.throw(new Error(error.status));
              }
            });
          }
        );
    }

  get CompanyName(){
    return this.createTicketForm.get('companyName');
  }
  get Model(){
    return this.createTicketForm.get('model');
  }
  get SerialNo(){
    return this.createTicketForm.get('serialNo');
  }
  get McType(){
    return this.createTicketForm.get('mcType');
  }
  get Problem(){
    return this.createTicketForm.get('problem');
  }

  get ClientComment(){
    return this.createTicketForm.get('clientComment');
  }
}