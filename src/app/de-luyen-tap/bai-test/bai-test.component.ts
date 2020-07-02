import { Component, OnInit,  OnDestroy } from "@angular/core";
import { TemplateRef } from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap";
import { trigger, style, animate, transition } from "@angular/animations";
import { Title } from "@angular/platform-browser";
import { forwardRef, Input } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { faEnvelopeOpen, faArrowAltCircleRight, faCheckCircle, faLightbulb, faWindowMaximize } from "@fortawesome/free-regular-svg-icons";
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PART1, URLAPI } from 'src/app/constant';

export const fadeInOut = (name = "fadeInOut", duration = 0.1) =>
  trigger(name, [
    transition(":enter", [
      style({ opacity: 0 }),
      animate(`${duration}s ease-in-out`)
    ]),
    transition(":leave", [
      animate(`${duration}s ease-in-out`, style({ opacity: 0 }))
    ])
  ]);
@Component({
  selector: "app-bai-test",
  templateUrl: "./bai-test.component.html",
  styleUrls: ["./bai-test.component.scss"],
  animations: [
    fadeInOut("fadeInOut-1", 0.3),
    fadeInOut("fadeInOut-2", 0.7),
    fadeInOut("fadeInOut-3", 1)
  ]
})
export class BaiTestComponent implements OnInit, OnDestroy {
  
  constructor(
    private router: Router,
    private titleService: Title,
    private modalService: BsModalService,
    private http: HttpClient
  ) {}

  baiTests: any;
  modalRef: BsModalRef;
  mp3: any;
  show: boolean;
  image: any;
  goiY: any;
  selectedItem: any;
  checkOpenModalNextCauHoi: boolean = false;
  checkOpenModalOrNextCauHoi: boolean = false;
  checkKiemTraCauHoi: any;
  checkCauTiepTheo: any;
  indexCauHoi: number = 0;
  checkPlayMp3: number = 0;
  giaiThich: any;
  cauDung: any;
  checkGiaiThich: boolean = false;
  showCorrect: any;
  showInCorrect: any;
  isLoading = false;
  faEnvelopeOpen = faEnvelopeOpen;
  faArrowAltCircleRight = faArrowAltCircleRight;
  faCheckCircle = faCheckCircle;
  faLightbulb = faLightbulb;
  faWindowMaximize = faWindowMaximize;
  totalCorrect: number = 0;
  checkGoiY: boolean = false;
  checkUserChooseAnswer: boolean = true;
  checkTongKet: boolean = false;
  selectedItem1: any;
  score: number = 0;
  intervalId: number = 0;
  seconds: number = 0;
  minute: number = 0;
  hours: number = 0;

  clearTimer(): void {
    clearInterval(this.intervalId);
  }

  private countDown(): void {
    this.clearTimer();
    this.intervalId = window.setInterval(() => {
      this.seconds += 1;
      if (this.seconds === 60) {
        this.seconds = 0;
        this.minute += 1; 
        if(this.minute == 60) {
          this.hours += 1;
          this.minute = 0;
        }
      } else {
        if (this.seconds < 0) {
          this.seconds = 0;
        } // reset
      }
    }, 1000);
  }

  openModal(template: TemplateRef<any>) {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
    this.checkOpenModalNextCauHoi = true;
    this.modalRef = this.modalService.show(template, {
      animated: true,
      backdrop: "static"
    });
  }
  
  load(): void {
    this.isLoading = true;
    setTimeout(() => (this.isLoading = false), 2000);
  }

  async wait(ms: number): Promise<void> {
    return new Promise<void>(resolve => setTimeout(resolve, ms));
  }

  start() {
    this.isLoading = true;
    this.wait(500).then(() => (this.isLoading = false));
  }

  ngOnDestroy() {
    this.clearTimer();
  }

  ngOnInit() {
    this.titleService.setTitle(PART1);
    this.countDown();
    this.start();
    this.http.get(URLAPI  + 'part1').subscribe(data => {
      this.baiTests = data;
      this.mp3 = this.baiTests.listen.listening[this.indexCauHoi].srcMp3;
      this.image = this.baiTests.listen.listening[this.indexCauHoi].linkImage;
      this.goiY = this.baiTests.listen.listening[
        this.indexCauHoi
      ].listQuestion[0].goiY;
      this.giaiThich = this.baiTests.listen.listening[
        this.indexCauHoi
      ].listQuestion[0].giaiThich;
      this.cauDung = this.baiTests.listen.listening[
        this.indexCauHoi
      ].listQuestion[0].cauDung;
    });
    this.checkCauTiepTheo = true;
    this.showCorrect = false;
  }

  items: RadioButtonItem[] = [
    { name: "A", value: "a" },
    { name: "B", value: "b" },
    { name: "C", value: "c" },
    { name: "D", value: "d" }
  ];

  nextCauHoi() {
    this.selectedItem1 = "";
    this.checkOpenModalOrNextCauHoi = false;
    this.checkUserChooseAnswer = true;
    this.checkGiaiThich = false;
    this.checkGoiY = false;
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
    if (this.checkOpenModalNextCauHoi) {
      this.modalRef.hide();
    }
    this.checkOpenModalNextCauHoi = false;

    if (this.indexCauHoi < 5) {
      if (this.selectedItem) {
        this.indexCauHoi += 1;
        this.mp3 = this.baiTests.listen.listening[this.indexCauHoi].srcMp3;
        this.image = this.baiTests.listen.listening[this.indexCauHoi].linkImage;
        this.goiY = this.baiTests.listen.listening[
          this.indexCauHoi
        ].listQuestion[0].goiY;
        this.giaiThich = this.baiTests.listen.listening[
          this.indexCauHoi
        ].listQuestion[0].giaiThich;
        this.selectedItem = "";
        this.checkCauTiepTheo = true;
        this.checkKiemTraCauHoi = false;
        this.show = false;
        this.showCorrect = false;
        this.showInCorrect = false;
      } else {
        this.indexCauHoi += 1;
        this.mp3 = this.baiTests.listen.listening[this.indexCauHoi].srcMp3;
        this.image = this.baiTests.listen.listening[this.indexCauHoi].linkImage;
        this.goiY = this.baiTests.listen.listening[
          this.indexCauHoi
        ].listQuestion[0].goiY;
        this.giaiThich = this.baiTests.listen.listening[ 
          this.indexCauHoi
        ].listQuestion[0].giaiThich;
        this.selectedItem = "";
        this.checkCauTiepTheo = true;
        this.checkKiemTraCauHoi = false;
        this.show = false;
        this.showCorrect = false;
        this.showInCorrect = false;
      }
    } else {
      this.start();
      this.router.navigate(['/ket-qua-bai-thi'], {
        state: { 
          score: this.score,
          hours: this.hours,
          minute: this.minute,
          seconds: this.seconds,
          totalCorrect: this.totalCorrect,
          part: 'part1',
          totalQuestion: 6
          }
      });
    }
  }
  
  kiemTra() {
    this.checkUserChooseAnswer = false;
    this.checkCauTiepTheo = false;
    this.checkGoiY = true;
    this.show = false;
    this.selectedItem1 = this.selectedItem;
    const dapAnDung = this.baiTests.listen.listening[this.indexCauHoi]
      .listQuestion[0].cauDung;
    if (this.selectedItem == dapAnDung) {
      this.score += 100/6;
      this.showCorrect = true;
      this.selectedItem = "";
      this.totalCorrect += 1;
    } else {
      this.showInCorrect = true;
      this.selectedItem = "";
    }
    setTimeout(() => this.removeAlert(), 1000);
  }

  clickGoiY() {
    this.show = !this.show;
  }

  clickXemLoiGiai() {
    this.checkGiaiThich = !this.checkGiaiThich;
  }

  removeAlert() {
    this.showCorrect = false;
    this.showInCorrect = false;
  }

  // playMp3(mp3) {
  //   this.checkPlayMp3 = 1;
  //   if (this.audio) {
  //     this.audio.pause();
  //     this.audio = null;
  //   }
  //   this.audio = new Audio(mp3);
  //   this.audio.load();
  //   alert(this.audio.duration);
  //   this.audio.play();
  // }
}

export interface RadioButtonItem {
  name: string;
  value: string;
}
 
export const RADIO_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RadioButtonComponent),
  multi: true
};

let nextUniqueId = 0;

@Component({
  selector: "radio-button",
  providers: [RADIO_VALUE_ACCESSOR]
})
export class RadioButtonComponent implements ControlValueAccessor {
  private _name: string = `group-${nextUniqueId++}`;

  @Input() items: Array<RadioButtonItem>;

  get name(): string {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
  }

  private innerValue: string | number | boolean;
  get value(): string | number | boolean {
    return this.innerValue;
  }

  set value(v: string | number | boolean) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.change(v);
    }
  }

  onChange: Function;
  onTouched: Function;

  writeValue(value: string | number | boolean) {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

  isDisabled1(): boolean {
    return false;
  }

  registerOnChange(fn: Function): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onTouched = fn;
  }

  change(value: string | number | boolean) {
    // console.log(value);
    this.innerValue = value;
    this.onChange(value);
    this.onTouched(value);
  }
}
