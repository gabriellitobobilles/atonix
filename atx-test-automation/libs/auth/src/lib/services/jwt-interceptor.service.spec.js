/*ANGULAR*/
import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
/*SERVICE*/
import { JwtInterceptorService } from './jwt-interceptor.service';
import { AuthService } from './auth.service';
describe('JwtInterceptorService', function () {
    var mockAuthService = {
        GetToken: function () {
            return Observable.create(function (observer) {
                observer.next('testToken123');
            });
        }
    };
    beforeEach(function () {
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
    it('should create', inject([JwtInterceptorService], function (jwtInterceptorService) {
        expect(jwtInterceptorService).toBeTruthy();
    }));
    describe('making http calls to trigger intercept', function () {
        it('should add Authorization header', inject([HttpClient, HttpTestingController], function (http, httpTest) {
            var result;
            http.get('/api').subscribe(function (data) {
                result = data;
            });
            httpTest
                .expectOne(function (r) { return r.headers.has('Authorization') && r.headers.get('Authorization') === 'Bearer testToken123'; })
                .flush({ response: true });
            httpTest.verify();
            expect(result).toEqual({ response: true });
        }));
    });
});
//# sourceMappingURL=jwt-interceptor.service.spec.js.map