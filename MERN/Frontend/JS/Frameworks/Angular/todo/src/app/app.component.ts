import { Component } from '@angular/core';
import { SharedService } from './services/shared.service';
import { Title } from "@angular/platform-browser"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private sharedService: SharedService, private titleService: Title) { }

  title!: string;

  getTitle(): string {
    return this.titleService.getTitle();
  }
}
