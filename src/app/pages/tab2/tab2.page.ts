import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Article } from 'src/app/interfaces';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  @ViewChild(IonInfiniteScroll, { static: true })
  infiniteScroll: IonInfiniteScroll;

  public categories: string[] = [
    'business',
    'entertainment',
    'general',
    'health',
    'science',
    'sports',
    'technology',
  ];

  public articles: Article[] = [];

  public selectedCategory: string = this.categories[0];

  constructor(private newService: NewsService) {}
  ngOnInit() {
    this.newService
      .getTopHeadlinesByCategory(this.selectedCategory)
      .subscribe((articles) => {
        this.articles = [...articles];
      });
  }

  segmentChanged(event: Event) {
    this.selectedCategory = (event as CustomEvent).detail.value;
    this.newService
      .getTopHeadlinesByCategory(this.selectedCategory)
      .subscribe((articles) => {
        this.articles = [...articles];
      });
  }

  loadData() {
    this.newService
      .getTopHeadlinesByCategory(this.selectedCategory, true)
      .subscribe((articles) => {
        if (articles.length === this.articles.length) {
          this.infiniteScroll.disabled = true;
          return;
        }

        this.articles = articles;
        this.infiniteScroll.complete();
      });
  }
}
