import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import * as ValidationPatterns from 'src/app/utils/validation-patterns';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  disabled = false;
  nicknameForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.initNicknameForm();
  }

  onNicknameFormSubmit() {
    console.log(this.nicknameForm.valid);
    
  }

  private initNicknameForm() {
    this.nicknameForm = new FormBuilder().group({
      nickname: ['', Validators.compose(
        [Validators.required, Validators.minLength(4), Validators.maxLength(64), Validators.pattern(ValidationPatterns.NICKNAME)])],
    })
  }

}
