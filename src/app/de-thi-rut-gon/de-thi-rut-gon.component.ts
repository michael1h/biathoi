import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  templateUrl: './de-thi-rut-gon.component.html',
  styleUrls: ['./de-thi-rut-gon.component.scss']
})
export class DeThiRutGonComponent implements OnInit {

  constructor(private titleService:Title,) { }

  ngOnInit() {
    this.titleService.setTitle("Đề thi thử TOEIC rút gọn (Toeic Mini tests)");
  }

}
