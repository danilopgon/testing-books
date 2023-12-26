import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormComponent } from './form.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('Form component', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [FormComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('name field should be required', () => {
    const nameField = component.form.get('name');
    nameField.setValue('');
    expect(nameField.valid).toBeFalsy();
  });

  it('name field should be invalid when more that 5 characters', () => {
    const nameField = component.form.get('name');
    nameField.setValue('Daniel');
    expect(nameField.valid).toBeFalsy();
  });

  it('form is valid', () => {
    const nameField = component.form.get('name');
    const emailField = component.form.get('email');
    nameField.setValue('Jack');
    emailField.setValue('test@test.es');
    expect(component.form.valid).toBeTruthy();
  });
});
