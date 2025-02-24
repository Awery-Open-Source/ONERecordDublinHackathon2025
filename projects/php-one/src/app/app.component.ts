import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AwfControlModule, AwfIconModule} from "@awerysoftware/awf-components";
import {BehaviorSubject} from "rxjs";
import {AsyncPipe, NgClass} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AwfIconModule, AsyncPipe, NgClass, AwfControlModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'php-one';
  public location$ = new BehaviorSubject<string>('');

}
