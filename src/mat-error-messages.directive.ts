import { DEFAULT_ERRORS } from './default-error-messages';
import { AfterViewInit, Component, Injector, Input } from '@angular/core';
import { MdInput, MdFormField, MdFormFieldControl, MdError } from '@angular/material';
import { DefaultErrorMessages } from './default-error-messages';

/**
 * This 'directive' will display default app error messages in an <md-error> element
 * contained in an <md-form-field>.
 * @Usage:  <md-form-field>
 *                 <md-error matErrorMessages></md-error>
 *             </md-form-field>
 *
 * ** The input *must* be a FormControl and part of a FormGroup with Validators assigned to it.
 *
 * @Input clientMessages: An object whose keys are names of validators and values are error messages.
 *                             Including this will overwrite the default messag for a specific error.
 *
 * @Input fieldName: A string to use as the name of the field in the message. The MdInput placeholder
 *                      is used by default.
 *
 * @class ErrorMessageComponent
 * @implements {AfterViewInit}
 */
@Component({
  // tslint:disable-next-line:component-selector
  selector: '[matErrorMessages]',
  template: '{{ error }}'
})
export class MatErrorMessagesDirective implements AfterViewInit {

  // tslint:disable-next-line:no-input-rename
  @Input('matErrorMessages') clientMessages: any;

  @Input('fieldName') fieldName: string;


  error = '';
  inputRef: MdFormFieldControl<MdInput>;
  errorList: any;


  public get formErrors(): any {
    if(this.inputRef.ngControl) {
      return this.inputRef.ngControl.errors;
    }
  }

  public get control(): any {
    return this.inputRef.ngControl;
  }

  constructor(private _inj: Injector) { }


  // This grabs a single active error instead of multiple.
  updateErrors = (state: 'VALID' | 'INVALID') => {
    if (state === 'INVALID') {
      const firstError = Object.keys(this.formErrors)[0];
      const messageGetter = this.errorList[firstError];

      this.error = Utils.callIfFunction(messageGetter, this.formErrors[firstError], this.inputRef.value);
    }
  }

  // Setup all initial tooling
  ngAfterViewInit() {
    this._getInputRef();
    this.fieldName = this.fieldName || this.inputRef.placeholder;
    this.errorList = this._createErrorList();
    this._trySubToChanges();
  }


  // grab reference to MdInput directive, where form control is accessible.
  private _getInputRef() {
    let container = this._inj.get(MdFormField);
    this.inputRef = container._control;
  }


  // Overwrite the default messages with supplied messages from the input.
  // We use a spread operator instead of Object.assign to retain getters and setters.
  private _createErrorList(): DefaultErrorMessages {
    const injectedErrors = this._inj.get(DEFAULT_ERRORS);

    const errorInstance = new injectedErrors(this.fieldName);

    // If no override messages given to directive, just return it as is.
    if (!this.clientMessages || typeof this.clientMessages !== 'object') {
      return errorInstance;
    }

    // If there are overrides, return new object with the defaults overridden.
    return { ...errorInstance, ...this.clientMessages };
  }


  // Handles feedback on incorrect setup of the directive. If everything goes smoothly, sub to the control status!
  private _trySubToChanges() {
    try {
      this._inj.get(MdError);
    }
    catch (err) {
      console.error('matErrorMessages: Directive must be on an <md-error>!');
    }

    if (!this.inputRef) { return console.error(`matErrorMEssages: Directive must be used in an <md-form-field>!`) }
    if (!this.inputRef.ngControl) { return console.error(`matErrorMessages: No FormControl registered for ${this.fieldName}!`) };

    this.control.statusChanges.subscribe(this.updateErrors);
  }
}




class Utils {
  // Safe function checking against weird data types to see if something is a class.
  public static isFunction(functionToCheck: any): boolean {
    const getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
  }

  // Clean little utility...If the object passed is a function, it will return the function called with the provided args. If not, just returns the object.
  // oh, if it's a class it'll return a new instance of it.
  public static callIfFunction(obj: any, args: any, ...rest: any[]) {
    const isFunction = Utils.isFunction(obj);
    return isFunction ? obj(args, ...rest) : obj;
  }
}
