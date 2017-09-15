import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  shit: FormGroup;

  constructor(fb: FormBuilder) {

    this.shit = fb.group({
      hole: ['', Validators.minLength(3)]
    })

  }
}



export class errors {
  butt = 'fuck'
  required = 'false'
  constructor(name) { }
}