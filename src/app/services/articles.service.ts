import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

interface ArticleGetInterface {
  title: string;
  story_title: string;
  author: string;
  created_at: string;
  objectID: string;
  url: string;
  story_url: string;
}

export interface Articleinterface {
  title: string;
  author: string;
  created_at: string;
  objectID: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})

export class ArticlesService {  
  url = 'http://database:8080/articles';
  articles: Articleinterface[];

  constructor(public http: HttpClient) { }

  async getArticles() {
    try {
      this.articles = [];
      const listArticles = await this.http.get<ArticleGetInterface[]>(this.url).toPromise();

      const articles: Articleinterface[] = listArticles.reduce((acc, article: ArticleGetInterface) => {
        if (!article.story_title && !article.title) {
          return acc;
        }

        let createdAtMoment = moment(article.created_at);
        const dayDiff = moment().diff(article.created_at,'day')
        let dateAcc: String;

        if ( dayDiff < 1) {
          dateAcc = createdAtMoment.format('hh:mm A');
        } else {
          dateAcc = dayDiff == 1 ? 'Yesterday' : createdAtMoment.format('MMM DD')
        }

        acc.push({
          title: article.story_title ? article.story_title : article.title,
          url: article.story_url ? article.story_url : article.url,
          author: article.author,
          created_at: dateAcc,
          objectID: article.objectID
        });
        return acc;
      }, []);

      this.articles = articles;
      console.log(this.articles);
      return true;
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  delete(id: string) {
    return this.http.delete(`${this.url}/${id}`).toPromise()
      .then((resp) => {
        this.getArticles(); 
      })
      .catch((err) => {
        console.error(err);
      });
  }
}