import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'multi-select';
  list = [
    {key: '1', value: 'Steven Spielberg'},
    {key: '2', value: 'Alfred Hitchcock'},
    {key: '3', value: 'Martin Scorsese'},
    {key: '4', value: 'Christopher Nolan'},
    {key: '5', value: 'James Cameron'},
    {key: '6', value: 'Quentin Tarantino'}
  ];
  director: string;
  onOptionChange() {
    console.log(this.director);
  }
}
