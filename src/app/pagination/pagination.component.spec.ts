import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('If the value of the page is 2, the pagination item must be 2', () => {
    component.pages = 2;
    fixture.detectChanges();

    const el = fixture.debugElement.queryAll(By.css('.pagination-item'));
    expect(el.length).toBe(2);
  });

  it('If the value of the page is 1, the pagination item must be 1', () => {
    component.pages = 1;
    fixture.detectChanges();

    const el = fixture.debugElement.queryAll(By.css('.pagination-item'));
    expect(el.length).toBe(0);
  });
});
