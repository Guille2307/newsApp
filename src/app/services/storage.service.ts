import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Article } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private storage: Storage | null = null;
  private localArticles: Article[] = [];

  constructor(private storageCrtl: Storage) {
    this.init();
  }

  get getLocalArticles() {
    return [...this.localArticles];
  }
  async init() {
    const storage = await this.storageCrtl.create();

    this.storage = storage;
    this.loadFavorites();
  }

  async saveRemoveArticles(article: Article) {
    const exists = this.localArticles.find(
      (localArticles) => localArticles.title === article.title
    );
    if (exists) {
      this.localArticles = this.localArticles.filter(
        (localArticles) => localArticles.title !== article.title
      );
    } else {
      this.localArticles = [article, ...this.localArticles];
    }

    this.storage.set('article', this.localArticles);
  }
  async loadFavorites() {
    try {
      const articles = await this.storage.get('articles');
      this.localArticles = articles || [];
    } catch (error) {}
  }

  articleInFavorites(articles: Article) {
    return !!this.localArticles.find(
      (localArticles) => localArticles.title === articles.title
    );
  }
}
