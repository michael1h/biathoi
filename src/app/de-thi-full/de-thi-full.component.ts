import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-not-found',
  templateUrl: './de-thi-full.component.html',
  styleUrls: ['./de-thi-full.component.scss']
})
export class DeThiFullComponent implements OnInit {

  constructor(private titleService:Title,) { }

  ngOnInit() {
    this.titleService.setTitle("Đề thi TOEIC full");
  }

}
