import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../../core/models/user.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
      email: this.fb.control(this.user && this.user.email, Validators.email),
    };
    
    Object.keys(userForm).forEach((control) => {
      this.parent.addControl(control, userForm[control])
    });
  }

}
