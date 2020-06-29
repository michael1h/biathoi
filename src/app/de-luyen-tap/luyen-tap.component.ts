import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  // selector: 'app-not-found',
  templateUrl: './luyen-tap.component.html',
  styleUrls: ['./luyen-tap.component.scss']
})
export class DeLuyenTapComponent implements OnInit {

  constructor(private titleService:Title) { }

  isLoading = false;

  async wait(ms: number): Promise<void> {
    return new Promise<void>(resolve => setTimeout(resolve, ms));
  } 

  start() {
    this.isLoading = true;
    this.wait(500).then(() => (this.isLoading = false));
  }

  ngOnInit() {
    // this.start();
    this.titleService.setTitle("ĐỀ LUYÊN TẬP TOEIC FULL 7 PART");
  }
}
