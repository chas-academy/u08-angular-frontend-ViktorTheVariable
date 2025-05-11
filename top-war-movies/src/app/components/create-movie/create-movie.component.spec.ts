import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateMovieComponent } from './create-movie.component';
import { MovieService } from '../../services/movie.service';
import { MovieValidationService } from '../../services/movie-validation.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('CreateMovieComponent', () => {
  let component: CreateMovieComponent;
  let fixture: ComponentFixture<CreateMovieComponent>;
  let mockMovieService: any;
  let mockValidationService: any;
  let mockRouter: any;

  beforeEach(async () => {
    mockMovieService = {
      createMovie: jasmine.createSpy().and.returnValue(of({}))
    };
    mockValidationService = {
      validateMovie: jasmine.createSpy().and.returnValue([])
    };
    mockRouter = {
      navigate: jasmine.createSpy()
    };

    await TestBed.configureTestingModule({
      imports: [CreateMovieComponent],
      providers: [
        { provide: MovieService, useValue: mockMovieService },
        { provide: MovieValidationService, useValue: mockValidationService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not submit if validation fails', () => {
    mockValidationService.validateMovie.and.returnValue(['Title is required']);
    component.title = '';
    component.onSubmit();
    expect(component.errors).toContain('Title is required');
    expect(mockMovieService.createMovie).not.toHaveBeenCalled();
  });

});