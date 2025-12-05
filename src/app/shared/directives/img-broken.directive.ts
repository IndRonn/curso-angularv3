import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'img[appImgBroken]'
})
export class ImgBrokenDirective {

  @Input() srcFallback: string = '../../../assets/images/error-404.png';

  constructor(private elementRef: ElementRef) { }

  @HostListener('error') handleError(){
    const nativeElement = HTMLImageElement = this.elementRef.nativeElement;
    nativeElement.src = this.srcFallback;
    console.log("Esta imagen está rota", this.elementRef)
  }

}
