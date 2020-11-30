import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { CreateTicketComponent } from './createTicket/CreateTicketComponent';
import { TicketsComponent } from './tickets/tickets.component';
import { ViewGadgetsComponent } from './gadgets/gadgets.component';


const routes: Route[] = [
  {path:'', redirectTo:'/login', pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {path:'login', component:LoginComponent},
  {path:'createTicket', component:CreateTicketComponent},
  {path : 'profile',component : ProfileComponent},
  {path : 'gadgets',component : ViewGadgetsComponent},
  {path : 'tickets',component : TicketsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
