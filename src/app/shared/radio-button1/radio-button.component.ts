// import { Component, forwardRef, Input} from '@angular/core';
// import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
// import { RadioButtonItemPart3 } from '../../de-luyen-tap/bai-test/IRadio.model';

// export const RADIO_VALUE_ACCESSOR: any = {
//   provide: NG_VALUE_ACCESSOR,
//   useExisting: forwardRef(() => RadioButton1Component),
//   multi: true,
// };

// let nextUniqueId = 0;

// @Component({
//   selector: 'radio-button-part3',
//   providers: [RADIO_VALUE_ACCESSOR],
//   templateUrl: './radio-button.component.html',
//   styleUrls: ['./radio-button.component.scss']
// })
// export class RadioButton1Component implements ControlValueAccessor {
//   private _name: string = `group-${nextUniqueId++}`;

//   @Input() items: Array<RadioButtonItemPart3>;

//   get name(): string { return this._name; }
//   set name(value: string) {
//     this._name = value;
//   }

//   private innerValue: string | number | boolean;
//   get value(): string | number | boolean {
//     return this.innerValue;
//   }

//   set value(v: string | number | boolean) {
//     if (v !== this.innerValue) {
//       this.innerValue = v;
//       this.change(v);
//     }
//   }

//   onChange: Function;
//   onTouched: Function;

//   writeValue(value: string | number | boolean) {
//     if (value !== this.innerValue) {
//       this.innerValue = value;
//     }
//   }

//   registerOnChange(fn: Function): void {
//     this.onChange = fn;
//   }

//   registerOnTouched(fn: Function): void {
//     this.onTouched = fn;
//   }

//   change(value: string | number | boolean) {
//     // console.log(value);
//     this.innerValue = value;
//     this.onChange(value);
//     this.onTouched(value);
//   }
// }
