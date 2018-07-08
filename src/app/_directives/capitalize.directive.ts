import { Directive, ElementRef, forwardRef, HostListener, Renderer2 } from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const UPPERCASE_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CapitalizeDirective),
    multi: true
}

@Directive({
    selector: 'input[capitalize]',
    providers: [UPPERCASE_VALUE_ACCESSOR],
    host: { '(input)': 'onChange($event.target.value)', '(blur)': 'onTouched()' },
})
export class CapitalizeDirective implements ControlValueAccessor {
    constructor(private renderer: Renderer2, private elementRef: ElementRef) {
    }

    onChange = (_: any) => { }
    onTouched = () => { }

    registerOnChange(fn: (_: any) => void): void { this.onChange = fn }

    registerOnTouched(fn: () => void): void { this.onTouched = fn }

    @HostListener('input', ['$event.target.value'])
    onInput(value: string) {
        // Write back to model
        if (value) {
            value = value.toUpperCase();
            value = value.replace(/\w\S*/g, function(txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();

            });
            // write formatted to to control view
            this.writeValue(value)
        }
        this.onChange(value)
    }

    writeValue(value: any): void {
        if (!value) return value;
        const normalizedValue = value.replace(/\w\S*/g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();

        });

        this.renderer.setProperty(this.elementRef.nativeElement, 'value', normalizedValue);
    }
}