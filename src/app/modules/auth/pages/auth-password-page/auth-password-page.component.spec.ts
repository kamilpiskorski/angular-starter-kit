// Angular
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// Components
import { AuthPasswordPageComponent } from './auth-password-page.component';

describe('AuthPasswordPageComponent', () => {
  let component: AuthPasswordPageComponent;
  let fixture: ComponentFixture<AuthPasswordPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
          AuthPasswordPageComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthPasswordPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
