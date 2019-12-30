import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomSelectComponent } from './custom-select/custom-select.component';
import { CustomSelectOptionComponent } from './custom-select-option/custom-select-option.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { DropdownComponent } from './dropdown/dropdown.component';
import { FilterPipe } from './filter.pipe';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CustomSelectComponent,
    CustomSelectOptionComponent,
    DropdownComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OverlayModule,
    PortalModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
