import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { LoadingService } from '../shared/loading.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
  @Input()
  video;

  @ViewChild('videoPlayer', { static: true }) videoPlayer: ElementRef;

  get player(): HTMLVideoElement {
    return this.videoPlayer.nativeElement;
  }
  constructor(private loadingService: LoadingService) {
    this.video = {
      // src: "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4",
      src: 'http://localhost:3000/video-content',
      poster: 'https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217',
      title: 'Big Bunck Bunny'
    };
  }

  ngOnInit() {
    this.player.load();
  }
}
