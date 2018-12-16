import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment.custom';
import { UserService } from '../../../../services/api/user.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
    console.log(environment);
  }

}
