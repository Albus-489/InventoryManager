import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoragesPageComponent } from './storages-page.component';

describe('StoragesPageComponent', () => {
  let component: StoragesPageComponent;
  let fixture: ComponentFixture<StoragesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoragesPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StoragesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
