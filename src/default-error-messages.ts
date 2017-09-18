import { OpaqueToken } from '@angular/core';
// Base class to enforce the passing of the fieldName to the constructor.
export abstract class ErrorMessages {

	constructor(public fieldName: string) { }

}


// Token for injecting the default errors.
export let DEFAULT_ERRORS = new OpaqueToken('DefaultErrors');


// This interface gives typings to the default form validators on the Validators class.
export interface DefaultValidators {
	required?: any;
	numeric?: any;
	email?: any;
	pattern?: any;

	min?(err: { actual: string, min: number }, value?: any): string;
	max?(err: { actual: string, max: number }, value?: any): string;
	minlength?(err: { actualLength: number, requiredLength: number }, value?: any): string;
	maxlength?(err: { actualLength: number, requiredLength: number }, value?: any): string;

}


/** * Class of defaulted error messages to use with the MatErrorMessages directive.
 * fieldName will be passed in or defaulted.
 *
 * When a member is a method, it will be passed error object for that error.
 *
 * @export
 * @class DefaultErrorMessages
 */
export class DefaultErrorMessages extends ErrorMessages implements DefaultValidators {


	required = `${this.fieldName} is required`;
	numeric = `${this.fieldName} must be numeric.`;
	email = `Value is not a valid email address.`;
	pattern = `${this.fieldName} is in the wrong format`;


	min(err: any) {
		return `${this.fieldName} must be more than ${err.min}.`
	}

	max(err: any) {
		return `${this.fieldName} must be less than ${err.max}`
	}

	minlength(err: any) {
		return `Max length is ${err.requiredLength} characters.`;
	}

	maxlength(err: any) {
		return `Max length is ${err.requiredLength} characters.`;
	}

}



