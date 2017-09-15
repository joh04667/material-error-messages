import { DEFAULT_ERRORS, DefaultErrorMessages } from './default-error-messages';
import { MatErrorMessagesDirective } from './mat-error-messages.directive';
import { ModuleWithProviders, NgModule, OpaqueToken } from '@angular/core';


@NgModule({
    declarations: [MatErrorMessagesDirective],
    exports: [MatErrorMessagesDirective],
    providers: [{
        provide: DEFAULT_ERRORS,
        useValue: DefaultErrorMessages
    }]
})
export class MatErrorMessagesModule {

    public static withDefaultErrors(errors): ModuleWithProviders {
        return {
            ngModule: MatErrorMessagesModule,
            providers: [{
                provide: DEFAULT_ERRORS,
                useValue: errors
            }]
        }
    }
}