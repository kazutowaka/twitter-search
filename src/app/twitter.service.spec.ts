
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { TwitterService } from './twitter.service';

describe('TwitterService', () => {
  let service: TwitterService;
  const httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
    });
    service = TestBed.inject(TwitterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getTweets() should return single size array when the number of tweets < 11', (done: DoneFn) => {
    const response = {
      count: 8,
      offset: 0,
      results: []
    };

    httpClientSpy.get.and.returnValue(of(response));
    const twitterService = new TwitterService(httpClientSpy);

    twitterService.getTweets('hashtags', 'test');

    twitterService.subject$
      .subscribe((res) => {
        expect(res).toEqual({ pages : [response]});
        done();
      });
  });

  it('#getTweets() should return multiple size array when the number of tweets > 10', (done: DoneFn) => {
    const response = {
      count: 10,
      offset: 0,
      results: []
    };

    httpClientSpy.get.and.returnValue(of(response));
    const twitterService = new TwitterService(httpClientSpy);

    twitterService.getTweets('users', 'test');

    twitterService.subject$
      .subscribe((res) => {
        expect(res).toEqual({ pages : [response, response]});
        done();
      });
  });

  it('#getTweets() should return an error when the server returns include error property', (done: DoneFn) => {
    const response = {
      error: 'Error message'
    };

    httpClientSpy.get.and.returnValue(of(response));
    const twitterService = new TwitterService(httpClientSpy);

    twitterService.getTweets('hashtags', 'test');

    twitterService.subject$
      .subscribe((res) => {
        expect(String(res.error)).toEqual(`Error: ${response.error}`);
        done();
      });
  });
});
