import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  constructor(private httpClient: HttpClient, private router : Router) { }

  getTicketsListByCompany(companyName : String ,emailId :string): Observable <any> {
    return this.httpClient.get(environment.apiUrl+`viewTicketsByCompanyName/${companyName}/${emailId}`);
  }
}
