import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.page.html',
  styleUrls: ['./qrcode.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class QrcodePage implements OnInit {

  @Input() id;

  constructor() { }

  ngOnInit() {
  }

}
