import { Component, OnInit, ViewChild } from "@angular/core";
// import { BaiTestComponent } from "./bai-test.component";
import { Router } from "@angular/router";

@Component({
  selector: "my-app",
  templateUrl: "./ketquabaitest.component.html",
  styleUrls: ["./ketquabaitest.component.css"]
})
export class KetQuaBaiTestComponent implements OnInit {
  score: number = 0;
  hours: number = 0;
  minute: number = 0;
  seconds: number = 0;
  trungBinh1Cau : number = 0;
  totalTime : number = 0;
  totalCorrect: number = 0;
  isLoading = false;
  constructor(private router: Router) {
    this.score = this.router.getCurrentNavigation().extras.state.score;
    this.hours = this.router.getCurrentNavigation().extras.state.hours;
    this.minute = this.router.getCurrentNavigation().extras.state.minute;
    this.seconds = this.router.getCurrentNavigation().extras.state.seconds;
    this.totalCorrect = this.router.getCurrentNavigation().extras.state.totalCorrect;
  }

  async wait(ms: number): Promise<void> {
    return new Promise<void>(resolve => setTimeout(resolve, ms));
  }

  start() {
    this.isLoading = true;
    this.wait(1000).then(() => (this.isLoading = false));
  }

  ngOnInit() {
    this.start();
    let minute = this.minute == undefined ? 0 : this.minute;
    let hours = this.hours == undefined ? 0 : this.hours;
    this.trungBinh1Cau = (this.seconds 
    + (minute * 60) 
    + ((hours * 60) * 60))/6;

    this.totalTime = (this.seconds 
    + (minute * 60) 
    + ((hours * 60) * 60));
  }
}
