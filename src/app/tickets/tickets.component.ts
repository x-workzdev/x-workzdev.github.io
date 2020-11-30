import { Component, OnInit } from '@angular/core';
import { from, Observable, Subject } from 'rxjs';
import { TicketDetails } from '../createTicket/TicketDetails';
import {FormControl,FormGroup,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import { TicketsService } from './tickets.service';


@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {

  constructor(private ticketsService:TicketsService,public router:Router,public location: Location) { }
  currentCompanyName:string;
  currentEmailId:string;
  ticketsArray: any[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any>= new Subject();


  tickets: Observable<TicketDetails[]>;
  ticket : TicketDetails = new TicketDetails();
  deleteMessage=false;
  ticketlist:any;
  isasiged = false;   

  ngOnInit() {
    this.isasiged=false;
    this.dtOptions = {
      pageLength: 10,
      stateSave:true,
      lengthMenu:[[10, 20, 30, -1], [10, 20, 30, "All"]],
      processing: true
    };   
    this.currentCompanyName = sessionStorage.getItem("companyName");
    this.currentEmailId = sessionStorage.getItem("currentUser");
    console.log('companyName in tickets='+this.currentCompanyName);
    this.ticketsService.getTicketsListByCompany(this.currentCompanyName,this.currentEmailId).subscribe(data =>{  
    this.tickets =data;
    console.log('got data from console='+this.tickets);
    this.dtTrigger.next();
    })
  }
   
  ticketform=new FormGroup({
    companyName: new FormControl('' , Validators.required),
    model: new FormControl('' , Validators.required),
    serialNo: new FormControl('', Validators.required),
    mcType : new FormControl('' , Validators.required),
    problem : new FormControl('' , Validators.required),
    emailId : new FormControl('' , Validators.required),
    leadComment : new FormControl(),
    complaintId: new FormControl(),
    date:new FormControl(),
    complaintStatus:new FormControl(),
  });

  TicketSelected(ticket:any){
    console.log(ticket);
    this.ticket = ticket;
  }

  get EmailId(){
    return this.ticketform.get('emailId');
  }

  get CompanyName(){
    return this.ticketform.get('companyName');
  }

  get SerialNo(){
    return this.ticketform.get('serialNo');
  }
  
  get Model(){
    return this.ticketform.get('model');
  }
  
  get McType(){
    return this.ticketform.get('mcType');
  }

  get Problem(){
    return this.ticketform.get('problem');
  }
   
  get Date(){
    return this.ticketform.get('date');
  }

  get ComplaintStatus(){
    return this.ticketform.get('complaintStatus');
  }

  refresh(): void {
    this.router.navigateByUrl("/home", { skipLocationChange: true }).then(() => {
      console.log(decodeURI(this.location.path()));
      this.router.navigate([decodeURI(this.location.path())]);
    });
  }

}
