import { Directive, ElementRef, inject, input } from '@angular/core';
@Directive({
  selector: 'a[appSafeLink]',
  standalone: true,
  host: {
    '(click)': 'onConfirmLeavePage($event)',
  },
})
export class SafeLinkDirective {
  queryParam = input('myapp');
  private hostElementRef = inject<ElementRef<HTMLAnchorElement>>(ElementRef);
  constructor() {
    console.log('safe link directive');
  }
  onConfirmLeavePage(event: MouseEvent) {
    const wantsToLeave = window.confirm('Do you want to leave this page?');
    if (wantsToLeave) {
      // const address = (event.target as HTMLAnchorElement).href;
      // (event.target as HTMLAnchorElement).href =
      //   address + '?from=' + this.queryParam();
      const address = this.hostElementRef.nativeElement.href;
      this.hostElementRef.nativeElement.href =
        address + '?from=' + this.queryParam();
      return;
    }
    event.preventDefault();
  }
}
