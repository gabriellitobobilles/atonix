/*ANGULAR*/
import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
/*SERVICE*/
import { JwtInterceptorService } from './jwt-interceptor.service';
import { AuthService } from './auth.service';

describe('JwtInterceptorService', () => {
  const mockAuthService = {
    GetToken(): Observable<string> {
      return Observable.create(observer => {
        observer.next('testToken123');
      });
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: JwtInterceptorService,
          multi: true
        }
      ]
    });
  });

  it('should create', inject([JwtInterceptorService], (jwtInterceptorService: JwtInterceptorService) => {
    expect(jwtInterceptorService).toBeTruthy();
  }));

  describe('making http calls to trigger intercept', () => {
    it('should add Authorization header', inject(
      [HttpClient, HttpTestingController],
      (http: HttpClient, httpTest: HttpTestingController) => {
        let result;
        http.get('/api').subscribe(data => {
          result = data;
        });

        httpTest
          .expectOne(r => r.headers.has('Authorization') && r.headers.get('Authorization') === 'Bearer testToken123')
          .flush({ response: true });

        httpTest.verify();
        expect(result).toEqual({ response: true });
      }
    ));
  });
});
