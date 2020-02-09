import {AfterViewInit, Directive, ElementRef, Input} from '@angular/core';
import {environment} from '../../../../../environments/environment';
@Directive({
  selector: '[appImagePrimary]'
})
export class PrimaryImageDirective implements AfterViewInit {

  @Input() photos;
  @Input() type;
  public src;
  constructor(private imageRef: ElementRef) {
  }

  ngAfterViewInit(): void {
    const lengthPhotos =  Object.keys(this.photos).length;
    if (lengthPhotos == 0) {
      this.setImage('./assets/media/cars/default_car.png');
    }
    for (let key = 0; lengthPhotos > key; key++) {
      if (this.photos[key].is_primary) {
        if(this.photos[key].path_file === "" || this.photos[key].path_file === undefined) {
          this.src = './assets/media/cars/default_car.png';
          console.log(this.src + '<----------lost')
        } else {
          this.src = environment.urlImages + this.photos[key].path_file;
        }

        key = lengthPhotos;
        this.createimageObj();
      }
    }

  }

  private createimageObj() {
    const img = new Image();
    img.onload = () => {
      this.setImage(this.src);
    };

    img.onerror = () => {
      this.setImage('./assets/media/cars/default_car.png');
    };

    img.src = this.src;
  }

  private setImage(src: string) {
    this.imageRef.nativeElement.setAttribute('src', src);
  }
}
