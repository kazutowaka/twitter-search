import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, of, BehaviorSubject, Observable } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';


export interface Response {
  count?: number;
  offset?: number;
  results?: {[key: string]: string | string[] | number | {[key: string]: string}}[];
  error?: string;
}

export interface Result {
  pages?: Response[];
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TwitterService {

  private API_URL = 'https://anymind-recruitment-python-backend.adasia.biz';
  private UNIT_NUM = 10;

  private _subject$: BehaviorSubject<Result> = new BehaviorSubject(null);
  public subject$: Observable<Result> = this._subject$.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  getTweets(type: 'hashtags'|'users', query: string): void {
    const url = `${this.API_URL}/${type}/${query}`;
    const results = [];
    let page = 0;

    this.http.get<Response>(url, { params: { offset : String(page) } })
      .pipe(
        map((res: Response) => {
          if (res.error) throw new Error(res.error);
          return res;
        }),
        mergeMap((res: Response) => {
          results.push(res);
          // If the number of tweets is 10, fetch the API if there is an 11th
          if (res.count > this.UNIT_NUM - 1) {
            page += this.UNIT_NUM;
            return this.http.get<Response>(url, { params: { offset : String(page) } })
              .pipe(
                map((res2: Response) => {
                  // there are more than 10
                  if (res2.count > 0) {
                    results.push(res2);
                  }
                  return results;
                })
              );
          } else {
            return of(results);
          }
        })
      )
      .subscribe(
        (res: Response[]) => {
          this._subject$.next({ pages: res });
        },
        (errMsg: string) => {
          this._subject$.next({ error: errMsg });
        }
      );
  }

  resetTweets(): void {
    this._subject$.next(null);
  }
}
