import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../../services/api/user.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  @Input()
  user: User;

  @Input()
  parent: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    const userForm = {
      name: this.fb.control(this.user && this.user.name)
    };
    
    Object.keys(userForm).forEach((control) => {
      this.parent.addControl(control, userForm[control])
    });
  }

}
