import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { User } from '../../../../core/models/user.interface';
const emailPattern =
  '^(([^<>()\\[\\]\\\\.,;:\\s@"]+' +
  '(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|' +
  '(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  maxDate = new Date;

  @Input()
  user: User;

  @Input()
  parent: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    const userForm = {
      name: this.fb.control(this.user && this.user.name, Validators.required),
      surname: this.fb.control(this.user && this.user.surname, Validators.required),
      birth_date: this.fb.control(this.user && new Date(this.user.birth_date)),
      phone_number: this.fb.control(this.user && this.user.phone_number),
      email: this.fb.control(this.user && this.user.email, Validators.pattern(emailPattern)),
    };
    
    Object.keys(userForm).forEach((control) => {
      this.parent.addControl(control, userForm[control])
    });
  }

}
