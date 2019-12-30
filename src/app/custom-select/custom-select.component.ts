import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  QueryList,
  AfterViewInit,
  forwardRef,
  ContentChildren,
  Output,
  EventEmitter
} from '@angular/core';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { CustomSelectOptionComponent } from '../custom-select-option/custom-select-option.component';
import { DropdownService } from '../dropdown.service';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomSelectComponent),
      multi: true
    }],
})
export class CustomSelectComponent implements AfterViewInit, ControlValueAccessor {

  @Input()
  placeholder: string;

  @Input()
  selected: string;

  @Input()
  disabled = false;
  @Output() inputValueChange = new EventEmitter<string>();
  @ViewChild('input', { static: true })
  input: ElementRef;

  @ViewChild(DropdownComponent, { static: true }) dropdown: DropdownComponent;
  @ContentChildren(CustomSelectOptionComponent)
  options: QueryList<CustomSelectOptionComponent>;
  inputValue: string;
  selectedOption: CustomSelectOptionComponent;
  keyManager: ActiveDescendantKeyManager<CustomSelectOptionComponent>;
  onChangeFn = (_: any) => { };
  onTouchedFn = () => { };

  constructor(private dropdownService: DropdownService) {
    this.dropdownService.register(this);
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.selectedOption = this.options.toArray().find(option => option.key === this.selected);
      this.inputValue = this.selectedOption ? this.selectedOption.value : '';
      this.keyManager = new ActiveDescendantKeyManager(this.options)
        .withHorizontalOrientation('ltr')
        .withVerticalOrientation()
        .withWrap();
    });
  }
  showDropdown() {
    this.dropdown.show();
    console.log(this.options);
    if (!this.options.length) {
      return;
    }
    this.selected ? this.keyManager.setActiveItem(this.selectedOption) : this.keyManager.setFirstItemActive();
  }

  onDropMenuIconClick(event: UIEvent) {
    event.stopPropagation();
    setTimeout(() => {
      this.input.nativeElement.focus();
      this.input.nativeElement.click();
    }, 10);
  }
  selectOption(option: CustomSelectOptionComponent) {
    this.keyManager.setActiveItem(option);
    this.selected = option.key;
    this.selectedOption = option;
    this.inputValue = this.selectedOption ? this.selectedOption.value : '';
    this.hideDropdown();
    this.input.nativeElement.focus();
    this.onChange();
  }

  hideDropdown() {
    this.dropdown.hide();
  }
  onKeyDown(event: KeyboardEvent) {
    if (['Enter', ' ', 'ArrowDown', 'Down', 'ArrowUp', 'Up'].indexOf(event.key) > -1) {
      if (!this.dropdown.showing) {
        this.showDropdown();
        return;
      }

      if (!this.options.length) {
        event.preventDefault();
        return;
      }
    }

    if (event.key === 'Enter' || event.key === ' ') {
      this.selectedOption = this.keyManager.activeItem;
      this.selected = this.selectedOption.key;
      this.inputValue = this.selectedOption ? this.selectedOption.value : '';
      this.hideDropdown();
      this.onChange();
    } else if (event.key === 'Escape' || event.key === 'Esc') {
      return this.hideDropdown();
    } else if (['ArrowUp', 'Up', 'ArrowDown', 'Down', 'ArrowRight', 'Right', 'ArrowLeft', 'Left']
      .indexOf(event.key) > -1) {
      this.keyManager.onKeydown(event);
    } else if (event.key === 'PageUp' || event.key === 'PageDown' || event.key === 'Tab') {
      return event.preventDefault();
    }
  }
  registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedFn = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(obj: any): void {
    this.selected = obj;
  }

  onTouched() {
    this.onTouchedFn();
  }

  onChange() {
    this.onChangeFn(this.selected);
  }
}
