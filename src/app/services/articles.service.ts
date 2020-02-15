import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})


export class ArticlesService {
  
  url = 'http://localhost:8000/articles';
  articles = [];

  constructor(public http: HttpClient) { }

  async getArticles() {
    return this.http.get(this.url).toPromise()
      .then((listArticles: any[]) => {
        this.articles = listArticles;
        console.log(this.articles);
        return true;
      })
      .catch((err) => {
        console.error(err);
        return err;
      });
  };

  async delete(id: string) {
    return this.http.delete(`${this.url}/${id}`).toPromise()
      .then((newListArticles: any[]) => {
        this.articles = [];
        this.articles = newListArticles;
        console.log(this.articles);
        return true;
      })
      .catch((err) => {
        console.error(err);
        return err;
      });

  };
}
