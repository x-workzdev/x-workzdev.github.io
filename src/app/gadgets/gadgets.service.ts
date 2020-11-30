import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GadgetService {

  constructor(private httpClient: HttpClient, private router : Router) { }

  getGadgetsList(companyName : String): Observable<any> {
    return this.httpClient.get(environment.apiUrl+`viewGadgets/${companyName}`);
  }

}
