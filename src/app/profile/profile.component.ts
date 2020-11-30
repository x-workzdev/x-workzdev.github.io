import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  private adminId;
  
  constructor(private loginService  : LoginService, private route : ActivatedRoute, private router : Router) { }
  ngOnInit() {
  }

  onClick()
  {
    this.router.navigate(['']);
  }
}
