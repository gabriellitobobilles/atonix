/*ANGULAR*/
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MaterialModule } from '@AtonixWebSites/material';
/*SERVICE*/
import { AppOverlayService } from '../app-overlay/app-overlay-service';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FontAwesomeModule, MaterialModule],
      providers: [AppOverlayService],
      declarations: [NavbarComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show App Context', inject([AppOverlayService], (appOverlayService: AppOverlayService) => {
    const spy = spyOn(appOverlayService, 'open');
    component.showAppContext();
    expect(spy).toHaveBeenCalled();
  }));
});
