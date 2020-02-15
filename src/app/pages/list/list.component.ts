import { Component, OnInit } from '@angular/core';
import { ArticlesService, articleinterface} from '../../services/articles.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  displayedColumns: String[] = ['title', 'createAt', 'trash'];

  constructor(public _articlesServices: ArticlesService) {
    this._articlesServices.getArticles();
  }

  ngOnInit(): void {
  }

  async deleteArticle(id:any) {
    console.log(id);
    await this._articlesServices.delete(id);
  }

}
