import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { IconProvider } from '../shared/icon-provider.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
  @Input()
  video;

  @ViewChild('videoPlayer', { static: true }) videoPlayer: ElementRef;


  originalRating;
  state = {
    rating: false,
  };

  get player(): HTMLVideoElement {
    return this.videoPlayer.nativeElement;
  }
  constructor(public iconProvider: IconProvider) {
    this.video = {
      // src: "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4",
      src: 'http://localhost:3000/video-content',
      poster: 'https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217',
      title: 'Big Bunck Bunny',
      rating: 4,
      views: 12111,
      userRating: undefined,
    };

    this.originalRating = this.video.userRating;

  }

  ngOnInit() {
    this.player.load();
  }

  onHover(hoveredRate: number) {
    this.video.userRating = hoveredRate;
  }

  onRateChange(newRate: number) {
    this.video.userRating = newRate;
    // TODO: API call to save rate
    this.toggleRatingState();
  }

  onRateReset(previousValue: number) {
    this.video.userRating = previousValue;
  }

  toggleRatingState() {
    this.state.rating = !this.state.rating;
  }


}
