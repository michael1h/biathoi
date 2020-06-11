import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  // selector: 'app-not-found',
  templateUrl: './luyen-tap.component.html',
  styleUrls: ['./luyen-tap.component.scss']
})
export class DeLuyenTapComponent implements OnInit {

  constructor(private titleService:Title) { }

  ngOnInit() {
    this.titleService.setTitle("ĐỀ LUYÊN TẬP TOEIC FULL 7 PART");
  }
}
