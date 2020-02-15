import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../../services/articles.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  displayedColumns = ['title', 'createAt', 'trash'];

  constructor(public articlesServices: ArticlesService) {
    this.articlesServices.getArticles();
  }

  ngOnInit(): void {
  }

  async deleteArticle(id: string) {
    await this.articlesServices.delete(id);
  }

}
