import { Component, Input, HostBinding, HostListener } from '@angular/core';
import { CustomSelectComponent } from '../custom-select/custom-select.component';
import { DropdownService } from '../dropdown.service';
import { Highlightable } from '@angular/cdk/a11y';

@Component({
  selector: 'app-custom-select-option',
  template: `{{value}}
   <ng-content></ng-content>`,
  styleUrls: ['./custom-select-option.component.scss']
})
export class CustomSelectOptionComponent implements Highlightable {
  @Input()
  key: string;

  @Input()
  value: string;

  @HostBinding('class.selected')
  get selected(): boolean {
    return this.select.selectedOption === this;
  }

  @HostBinding('class.active')
  active = false;

  private select: CustomSelectComponent;

  constructor(private dropdownService: DropdownService) {
    this.select = this.dropdownService.getSelect();
  }

  getLabel(): string {
    return this.value;
  }

  setActiveStyles(): void {
    this.active = true;
  }

  setInactiveStyles(): void {
    this.active = false;
  }

  @HostListener('click', ['$event'])
  onClick(event: UIEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.select.selectOption(this);
  }

}
