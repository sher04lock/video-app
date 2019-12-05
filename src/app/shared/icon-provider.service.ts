import { Injectable } from '@angular/core';
import { faThumbsUp, faThumbsDown, faStar, faVideo } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';

@Injectable({
  providedIn: 'root'
})
export class IconProvider {
  public thumbsUp = faThumbsUp;
  public thumbsDown = faThumbsDown;
  public star = faStar;
  public starEmpty = faStarEmpty;
  public video = faVideo;
}
