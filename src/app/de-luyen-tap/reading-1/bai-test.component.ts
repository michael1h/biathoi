import { Component, OnInit,  OnDestroy, 
} from "@angular/core";
import { TemplateRef } from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap";
import { trigger, style, animate, transition } from "@angular/animations";
import { Title } from "@angular/platform-browser";
import { forwardRef, Input, 
 } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import {
  faEnvelopeOpen,
  faArrowAltCircleRight,
  faCheckCircle,
  faLightbulb,
  faWindowMaximize
} from "@fortawesome/free-regular-svg-icons";
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PART5, URLAPI } from 'src/app/constant';

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

export class BaiTestReading1Component implements OnInit, OnDestroy {
  
  constructor(
    private router: Router,
    private titleService: Title,
    private modalService: BsModalService,
    private http: HttpClient
  ) {

  }
  cauHoi: any;
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
  items: RadioButtonItem[] = [];

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
    this.titleService.setTitle(PART5);
    this.countDown();
    this.start();
    this.http.get(URLAPI + 'part5').subscribe(data => {
      this.baiTests = data; //listCauTraLoi
      this.getDetail();
    });
    this.checkCauTiepTheo = true;
    this.showCorrect = false;
  }

  getDetail() {
    this.cauHoi = this.baiTests.toeic.listDoanVan[this.indexCauHoi].doanVan1;
    const cauA = this.baiTests.toeic.listDoanVan[this.indexCauHoi].listCauTraLoi[0].cauA;
    const cauB = this.baiTests.toeic.listDoanVan[this.indexCauHoi].listCauTraLoi[0].cauB;
    const cauC = this.baiTests.toeic.listDoanVan[this.indexCauHoi].listCauTraLoi[0].cauC;
    const cauD = this.baiTests.toeic.listDoanVan[this.indexCauHoi].listCauTraLoi[0].cauD;
    this.cauDung = this.baiTests.toeic.listDoanVan[this.indexCauHoi].listCauTraLoi[0].cauDung;
    this.goiY = this.baiTests.toeic.listDoanVan[this.indexCauHoi].listCauTraLoi[0].goiY;
    this.giaiThich = this.baiTests.toeic.listDoanVan[this.indexCauHoi].listCauTraLoi[0].giaiThich;
    this.items = [
      { name: cauA, value: 'a' },
      { name: cauB, value: 'b' },
      { name: cauC, value: 'c' },
      { name: cauD, value: 'd' }
    ];
  }

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
        this.getDetail();
        this.selectedItem = "";
        this.checkCauTiepTheo = true;
        this.checkKiemTraCauHoi = false;
        this.show = false;
        this.showCorrect = false;
        this.showInCorrect = false;
      } else {
        this.indexCauHoi += 1;
        this.getDetail();
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
          part: 'part5',
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
    if (this.selectedItem == this.cauDung) {
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
