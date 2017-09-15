import { MatErrorMessagesModule } from './directives/mat-error-messages.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent, errors } from './app.component';
import { MatErrorMessagesDirective } from './directives/mat-error-messages.directive';

import { MdInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MdInputModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatErrorMessagesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
