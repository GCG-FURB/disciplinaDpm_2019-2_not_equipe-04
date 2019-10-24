import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.page.html',
  styleUrls: ['./qrcode.page.scss'],
})
export class QrcodePage implements OnInit {

  @Input() id;

  constructor() { }

  ngOnInit() {
  }

}
