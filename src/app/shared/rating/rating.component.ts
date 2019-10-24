import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

const SELECTED = true;
const EMPTY = false;

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  private originalStarsState: boolean[];

  private savedRating: number;
  private hoveredRating: number;

  currentStarsState: boolean[];

  @Input() max = 5;
  @Input() initialRating: number;

  @Output() rateHovered = new EventEmitter<number>();
  @Output() rateSelected = new EventEmitter<number>();
  @Output() rateReset = new EventEmitter<number>();


  ngOnInit() {
    this.init();
  }

  init() {
    this.currentStarsState = Array(5).fill(EMPTY);
    this.currentStarsState = this.currentStarsState
      .map((_, i) => i <= this.initialRating - 1 ? SELECTED : EMPTY);


    this.savedRating = this.initialRating;
    this.hoveredRating = this.initialRating;
    this.originalStarsState = [...this.currentStarsState];
  }

  hoverOn(hoveredIndex: number) {
    for (let i = 0; i < this.currentStarsState.length; i++) {
      this.currentStarsState[i] = hoveredIndex >= i ? SELECTED : EMPTY;
    }

    this.hoveredRating = hoveredIndex + 1;

    this.rateHovered.emit(this.hoveredRating);
  }

  hoverOut() {
    this.hoveredRating = this.savedRating;
    this.currentStarsState = [...this.originalStarsState];

    this.rateReset.emit(this.savedRating);
  }

  click(rateClicked: number) {
    this.savedRating = rateClicked + 1;
    this.rateSelected.emit(this.savedRating);
  }
}
