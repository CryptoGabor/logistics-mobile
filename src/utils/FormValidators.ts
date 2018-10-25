import {FormGroup, FormControl} from "@angular/forms";

export class FormValidators {

    static passwordMatchValidator(g: FormGroup) {
        let password = g.get('password');
        let confirmPassword = g.get('confirmPassword');
        let validPasswordConfirmation = password && confirmPassword && password.value === confirmPassword.value;
        if (!validPasswordConfirmation) {
            password.setErrors({mismatch: true});
            confirmPassword.setErrors({mismatch: true});
        }
        return validPasswordConfirmation ? null : {'mismatch': true};
    }

    static changePasswordMatchValidator(g: FormGroup) {
        let password = g.get('newPassword');
        let confirmPassword = g.get('newPasswordConfirm');
        let validPasswordConfirmation = password && confirmPassword && password.value === confirmPassword.value;
        if (!validPasswordConfirmation) {
            password.setErrors({mismatch: true});
            confirmPassword.setErrors({mismatch: true});
        }
        return validPasswordConfirmation ? null : {'mismatch': true};
    }

    static noWhitespaceValidator(control: FormControl) {
        let isWhitespace = control.value.search(" ") > -1;
        let isValid = !isWhitespace;
        return isValid ? null : {'whitespace': true}
    }

    static validateAllFormFields(g: FormGroup) {
        Object.keys(g.controls).forEach(field => {
            const control = g.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({onlySelf: true});
            } else if (control instanceof FormGroup) {
                this.validateAllFormFields(control);
            }
        });
    }

    static boxesValidator(g: FormGroup) {
        let boxInvalid = false;
        let numberOfSmallBoxes = g.get('numberOfSmallBoxes');
        let numberOfMediumBoxes = g.get('numberOfMediumBoxes');
        let numberOfLargeBoxes = g.get('numberOfLargeBoxes');
        if ( (numberOfSmallBoxes.value === 0 ||
              numberOfSmallBoxes.value === '0' ||
              numberOfSmallBoxes.value === null ||
              numberOfSmallBoxes.value === ''  )
            && (numberOfMediumBoxes.value === 0 ||
                numberOfMediumBoxes.value === '0' ||
                numberOfMediumBoxes.value === null ||
                numberOfMediumBoxes.value === '')
            && (numberOfLargeBoxes.value === 0 ||
                numberOfLargeBoxes.value === '0' ||
                numberOfLargeBoxes.value === null ||
                numberOfLargeBoxes.value === '')) {
            boxInvalid = true;
        }

        return boxInvalid ? {'boxesError': true} : null;
    }

    static timeSlotsValidator(g: FormGroup) {
        let timeInvalid = false;
        let pickupFrom = g.get('pickupFrom');
        let pickupTo = g.get('pickupTo');
        let deliveryFrom = g.get('deliveryFrom');
        let deliveryTo = g.get('deliveryTo');
        if (pickupFrom.value == ''
            || pickupTo.value == ''
            || deliveryFrom.value == ''
            || deliveryTo.value == '') {
            timeInvalid = true;
        }
        return timeInvalid ? {'timeError': true} : null;
    }

    static priceRangeValidator(g: FormGroup) {
        let priceInvalid = false;
        let priceRange10Km = g.get('priceRange10Km');
        let priceRange20Km = g.get('priceRange20Km');
        let priceRange50Km = g.get('priceRange50Km');
        let priceRangeMore50Km = g.get('priceRangeMore50Km');
        if (priceRange10Km.value == 0
            && priceRange20Km.value == 0
            && priceRange50Km.value == 0
            && priceRangeMore50Km.value == 0) {
            priceInvalid = true;
        }
        return priceInvalid ? {'priceError': true} : null;
    }
}

