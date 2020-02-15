import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface articleGetInterface {
  title: String;
  story_title: String;
  author: String;
  created_at: String;
  objectID: String;
  url: String;
  story_url: String;
}

export interface articleinterface {
  title: String;
  author: String;
  created_at: String;
  objectID: String;
  url: String;
}

@Injectable({
  providedIn: 'root'
})

export class ArticlesService {
  
  url = 'http://localhost:8080/articles';
  articles: articleinterface[];

  constructor(public http: HttpClient) { }

  async getArticles() {
    try {
      this.articles = [];
      const listArticles = await this.http.get<articleGetInterface[]>(this.url).toPromise();

      const articles: articleinterface[] = listArticles.reduce((acc, article: articleGetInterface) => {
        if (!article.story_title && !article.title) {
          return acc;
        }

        acc.push({
          title: article.story_title ? article.story_title : article.title,
          url: article.story_url ? article.story_url : article.url,
          author: article.author,
          created_at: article.created_at,
          objectID: article.objectID
        });
        return acc;
      }, []);

      this.articles = articles;
      return true;
    } catch (err) {
      console.error(err);
      return [];
    }
  };

  delete(id: string) {
    return this.http.delete(`${this.url}/${id}`).toPromise()
      .then((resp) => {
        this.getArticles(); 
      })
      .catch((err) => {
        console.error(err);
      });
  };
}
