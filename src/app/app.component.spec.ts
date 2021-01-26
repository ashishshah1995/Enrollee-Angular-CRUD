import { AppComponent } from './app.component';
import { EditableTableComponent } from './editable-table/editable-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { NgxSpinnerModule } from 'ngx-spinner';
import { async, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EnroleeClientService } from 'src/services/enrolee-client.service';
import { SharedModule } from './shared.module';
import { AssertNotNull } from '@angular/compiler';
import { HttpClientModule } from '@angular/common/http';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        EditableTableComponent
      ],
      imports: [HttpClientModule, SharedModule, FormsModule,
        ReactiveFormsModule,
        NgxSpinnerModule, NotifierModule],
      providers: [EnroleeClientService]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'enrolleeWeb'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('enrolleeWeb');
  });


  it('should get enrolees from service', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const enrolleeService = TestBed.get(EnroleeClientService)

    spyOn(enrolleeService, 'getEnrollees').and.returnValue(res => {
      debugger;
      expect(res.length).toBeGreaterThan(0)
    })
  });

});
