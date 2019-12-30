import { Injectable } from '@angular/core';
import { CustomSelectComponent } from './custom-select/custom-select.component';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor() { }
  private select: CustomSelectComponent;

  public register(select: CustomSelectComponent) {
    this.select = select;
  }

  public getSelect(): CustomSelectComponent {
    return this.select;
  }
}
