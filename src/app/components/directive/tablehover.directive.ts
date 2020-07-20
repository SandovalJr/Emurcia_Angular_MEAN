import { Directive, ElementRef, Renderer2, HostListener } from "@angular/core";

@Directive({
  selector: "[appTablehover]",
})
export class TablehoverDirective {
  constructor(private el: ElementRef, private render: Renderer2) {
    console.log(el);
  }
  @HostListener("mouseenter") onMouseEnter() {
    this.render.setStyle(this.el.nativeElement, "background", "#f2f2f2");
  }
  @HostListener("mouseleave") onMouseLeave() {
    this.render.setStyle(this.el.nativeElement, "background", "transparent");
  }
}
