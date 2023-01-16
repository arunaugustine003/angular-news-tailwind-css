import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import {
  Breakpoints,
  BreakpointState,
  BreakpointObserver,
} from '@angular/cdk/layout';
import { NewsService } from './services/news.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit, OnInit {
  title = 'angular-news-tailwind-css';
  sources: any = [];
  articles: any = [];
  public selectedNewsChannel: string = 'Top 10 Trending News';
  @ViewChild(MatSidenav) sideNav!: MatSidenav;
  constructor(
    private observer: BreakpointObserver,
    private cd: ChangeDetectorRef,
    private newsApi: NewsService
  ) {}
  ngOnInit(): void {
    this.getArticles();
    this.getSources();
  }
  ngAfterViewInit(): void {
    this.sideNav.opened = true;
    this.observer.observe(['(max-width:800px)']).subscribe((res) => {
      if (res?.matches) {
        this.sideNav.mode = 'over';
        this.sideNav.close();
      } else {
        this.sideNav.mode = 'side';
        this.sideNav.open();
      }
    });
    this.cd.detectChanges();
  }
  getArticles() {
    this.newsApi.initArticles().subscribe((res: any) => {
      console.log(res);
      this.articles = res.articles;
    });
  }
  getSources() {
    this.newsApi.initSources().subscribe((res: any) => {
      console.log(res);
      this.sources = res.sources;
    });
  }
  searchSource(source: any) {
    this.newsApi.getArticlesByID(source.id).subscribe((res: any) => {
      console.log(res);
      console.log(source);
      this.articles = res.articles;
      this.selectedNewsChannel = source.name;
    });
  }
}
