import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserappComponent } from "./components/userapp.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UserappComponent],
  templateUrl: './app.component.html',


})
export class AppComponent {
  title = 'userapp';
}
