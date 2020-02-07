/*ANGULAR*/
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { MaterialModule } from '@AtonixWebSites/material';
import { StoreModule } from '@ngrx/store';
/*COMPONENT*/
import { AppOverlayComponent } from './app-overlay.component';
/*FACADE*/
import { UserFacade } from '@AtonixWebSites/auth';

describe('AppOverlayComponent', () => {
  let component: AppOverlayComponent;
  let fixture: ComponentFixture<AppOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, StoreModule.forRoot({})],
      providers: [
        {
          provide: UserFacade,
          useValue: {
            setAppContext() {
              return true;
            }
          }
        }
      ],
      declarations: [AppOverlayComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set App Context', inject([UserFacade], (userFacade: UserFacade) => {
    const spy1 = spyOn(userFacade, 'setAppContext');
    const spy2 = spyOn(component.cancel, 'emit');
    component.setAppContext({
      AppContextID: 1,
      Name: 'Atonix test',
      Icon: null,
      DisplayName: 'Atonix test',
      DisplayOrder: 2,
      SecurityResourceID: 3,
      Path: 'testPath',
      OpenInNew: true,
      StopAtLevel: 4,
      ShowFuture: true,
      Tabs: null,
      TimeRange: 'test',
      TimeSelection: 'test',
      Locale: 'test',
      StartAsset: 5,
      Refresh: 6
    });
    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  }));
});
