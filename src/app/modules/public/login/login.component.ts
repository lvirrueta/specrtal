import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  public LOGINFORMGROUP!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.initLoginFormGroup();
  }

  private initLoginFormGroup(): void {
    this.LOGINFORMGROUP = this.formBuilder.group({
      email: [ null, [ Validators.required, Validators.email ] ],
      password: [ null, [ Validators.required ] ]
    });
  }

  public async loginSubmit(): Promise<void> {
    console.log(this.LOGINFORMGROUP);
  }

}

