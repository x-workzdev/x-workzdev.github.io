import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TicketDetails } from '../createTicket/TicketDetails';
import { Observable, Observer, of, observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CreateTicketService {

  constructor(private httpClient: HttpClient, private router : Router) { }

  sendCreateTicketDetails(createTicket : TicketDetails) : Observable<any> {
    console.log(createTicket);
    return this.httpClient.post(environment.apiUrl+'createTicket',createTicket,{observe:'response', responseType: 'json'});
  }
}
