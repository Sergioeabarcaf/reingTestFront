import { Component } from '@angular/core';
import { ArticlesService } from './services/articles.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'reingTestFront';

  constructor(public _articlesServices: ArticlesService) {
    this._articlesServices.getArticles();
  }
}

