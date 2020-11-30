import { Component, OnInit } from '@angular/core';
import { GadgetService } from './gadgets.service';
import {FormControl,FormGroup,Validators} from '@angular/forms';
import { from, Observable, Subject } from 'rxjs';
import { GadgetDetails } from './GadgetsDetails';
import { Router } from '@angular/router';
import { TicketDetails } from '../createTicket/TicketDetails';
import {Location} from '@angular/common'
import { CreateTicketService } from '../createTicket/createTicket.service';

@Component({
  selector: 'app-gadgets',
  templateUrl: './gadgets.component.html',
  styleUrls: ['./gadgets.component.scss']
})
export class ViewGadgetsComponent implements OnInit {
  currentUser:string;
  private ticketDetails = new TicketDetails();
  constructor(private gadgetService: GadgetService,private createTicketService : CreateTicketService, public router : Router, public location: Location) { }

  gadgetsArray: any[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any>= new Subject();


  gadgets: Observable<GadgetService[]>;
  gadget : GadgetDetails = new GadgetDetails();
  deleteMessage=false;
  gadgetlist:any;
  isTicketRaised = false;  
  currentCompanyName:string;

  gadgetform=new FormGroup({
    emailId: new FormControl('' , Validators.required),
    model: new FormControl('' , Validators.required),
    serialNo: new FormControl('', Validators.required),
    mcType : new FormControl('' , Validators.required),
    dateOfAssigne : new FormControl('' , Validators.required),
    status : new FormControl('' , Validators.required),
    companyName :new FormControl('' , Validators.required),
    problem : new FormControl(),
    clientComment: new FormControl(),
    complaintid: new FormControl(),
  });

  GadgetSelected(gadget:any){
      console.log(gadget);
      this.gadget = gadget;
  }

  CreateTicket(createTicket){
    this.ticketDetails.companyName = this.CompanyName.value;
    this.ticketDetails.model = this.Model.value;
    this.ticketDetails.serialNo = this.SerialNo.value;
    this.ticketDetails.mcType = this.McType.value;
    this.ticketDetails.problem = this.Problem.value;
    this.ticketDetails.clientComment = this.ClientComment.value;

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
         this.isTicketRaised = true;
         console.log('ticket raised='+this.isTicketRaised);
         //this.router.navigate(['/tickets']);
         }
        else
        {
         alert(response.body.message);
         //this.router.navigate(['/createTicket']);
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

  ngOnInit() {
    this.isTicketRaised=false;
    this.dtOptions = {
      pageLength: 10,
      stateSave:true,
      lengthMenu:[[10, 20, 30, -1], [10, 20, 30, "All"]],
      processing: true
      };  
      this.currentCompanyName = sessionStorage.getItem("companyName");
      console.log('companyName in tickets='+this.currentCompanyName);
    this.gadgetService.getGadgetsList(this.currentCompanyName).subscribe(data =>{  
    this.gadgets = data;
    console.log('got data from console='+this.gadgets);
    this.dtTrigger.next();
    })
    
  }

  onChange(){
    this.isTicketRaised=true;
  }
  
  get CompanyName(){
    return this.gadgetform.get('companyName');
  }

  get EmailId(){
    return this.gadgetform.get('emailId');
  }

  get SerialNo(){
    return this.gadgetform.get('serialNo');
  }
  
  get Model(){
    return this.gadgetform.get('model');
  }
  
  get McType(){
    return this.gadgetform.get('mcType');
  }

  get DateOfAssigne(){
    return this.gadgetform.get('date');
  }

  get ComplaintStatus(){
    return this.gadgetform.get('complaintStatus');
  }

  get Problem(){
    return this.gadgetform.get('problem');
  }

  get ClientComment(){
    return this.gadgetform.get('clientComment');
  }

  get Date(){
    return this.gadgetform.get('date');
  }
  
  get ComplaintId(){
    return this.gadgetform.get('complaintId');
  }

  changeisUpdate(){
    this.isTicketRaised=false;
  }

  refresh(): void {
    this.router.navigateByUrl("/home", { skipLocationChange: true }).then(() => {
      console.log(decodeURI(this.location.path()));
      this.router.navigate([decodeURI(this.location.path())]);
    });
  }

}
