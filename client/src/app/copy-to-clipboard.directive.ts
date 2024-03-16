import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appCopyToClipboard]',
  standalone: true
})
export class CopyToClipboardDirective {

  constructor() { }

  @Input('appCopyToClipboard') value: string = "";

  @HostListener('click') onClick() {
    this.copyToClipboard(this.value);
  }

  private copyToClipboard(value: string) {
    const el = document.createElement('textarea');
    el.value = value;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    alert('Скопировано в буфер обмена: ' + value);
  }

}
