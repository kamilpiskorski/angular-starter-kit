// Angular
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// Components
import { AuthLoginPageComponent } from './auth-login-page.component';

describe('AuthLoginPageComponent', () => {
  let component: AuthLoginPageComponent;
  let fixture: ComponentFixture<AuthLoginPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
          AuthLoginPageComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthLoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
