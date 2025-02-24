import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AwfControlModule, AwfNotificationService, AwfRequestService} from "@awerysoftware/awf-components";
import {environment} from "../../environments/environment";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AwfControlModule],
  providers: [AwfRequestService.forRoot({basicURL: environment.url}), AwfNotificationService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'php-another-one';
}
