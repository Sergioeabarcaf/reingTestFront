import { Component } from '@angular/core';
import { ArticlesService } from './services/articles.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'reingTestFront';
  colorTile = '#515151';
  colorList = "#FFFFFF";

  constructor(public _articlesServices: ArticlesService) {}
}

