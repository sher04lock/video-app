import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { MovieService } from '../movie/movie.service';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css']
})
export class MovieSearchComponent implements OnInit {


  values = [
    'robert',
    'rower',
    'alegoria',
    'czekolada'
  ]

  @Input()
  placeholder: string;

  @Output() enterPressed = new EventEmitter();

  @Output() moviesFound = new EventEmitter();

  selectedMovie: string;
  filteredMovies$: Observable<any[]>;
  private searchTerms = new Subject<string>();

  constructor(private readonly movieService: MovieService) { }

  onEnter() {
    this.enterPressed.emit();
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit() {
    this.filteredMovies$ = this.searchTerms.pipe(
      debounceTime(0.3 * 1000),
      distinctUntilChanged(),
      switchMap((term: string) => this.movieService.search(term)),
      tap(movies => this.moviesFound.emit(movies))
    );
  }
}
