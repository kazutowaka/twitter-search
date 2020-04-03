import { ActivatedRoute, Router } from '@angular/router';
import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { TwitterService } from './../twitter.service';
import { Subject, Observable } from 'rxjs';
import { takeUntil, filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageComponent implements OnInit, OnDestroy {

  query: string;
  pageNum: number;
  unsubscriber$: Subject<void> = new Subject<void>();
  pageTitle: string;
  path: string;
  placeholder: string;
  type: 'hashtags'|'users';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public twitterService: TwitterService
  ) { }

  ngOnInit(): void {
    this.twitterService.resetTweets();
    this.path = this.activatedRoute.snapshot.routeConfig?.path;

    if (this.path === 'hashtag') {
      this.type = 'hashtags';
      this.pageTitle = 'Hashtag search';
      this.placeholder = 'Search by Hashtag';
    } else if (this.path === 'user') {
      this.type = 'users';
      this.pageTitle = 'User search';
      this.placeholder = 'Search by User';
    }

    this.activatedRoute.queryParams
      .pipe(
        filter(params => params.q || params.p),
        takeUntil(this.unsubscriber$)
      )
      .subscribe((params: {[key: string]: string}) => {
        this.pageNum = params.p ? parseInt(params.p, 10) - 1 : 0;

        if (this.query !== params.q) {
          this.query = params.q;
          this.twitterService.getTweets(this.type, this.query);
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscriber$.next();
    this.unsubscriber$.unsubscribe();
  }

  onSubmit(query: string) {
    this.router.navigate([ this.path ], { queryParams: { q: query || null }});
    return false;
  }
}
