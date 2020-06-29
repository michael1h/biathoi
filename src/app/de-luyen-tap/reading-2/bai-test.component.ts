import { Component, OnInit, OnDestroy } from "@angular/core";
import { TemplateRef } from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap";
import { trigger, style, animate, transition } from "@angular/animations";
import { Title } from "@angular/platform-browser";
import { forwardRef, Input } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { faEnvelopeOpen,faArrowAltCircleRight,faCheckCircle,faLightbulb,faWindowMaximize } from "@fortawesome/free-regular-svg-icons";
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PART6, URLAPI } from 'src/app/constant';

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
export class BaiTestReading2Component implements OnInit, OnDestroy {
  cauHoi: any;
  dichDoanVan1: any;
  selectedItemChoose3: any = '';
  selectedItem3: any;
  constructor(
    private router: Router,
    private titleService: Title,
    private modalService: BsModalService,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {

  }

  baiTests: any;
  transcriptAudio: any;
  selectedItemChoose0: any = '';
  selectedItemChoose1: any = '';
  selectedItemChoose2: any = '';
  selectedItem0: any;
  selectedItem2: any;
  modalRef: BsModalRef;
  mp3: any;
  show: boolean;
  image: any;
  goiY: any;
  selectedItem: any;
  checkOpenModalNextCauHoi: boolean = false;
  checkOpenModalOrNextCauHoi: boolean = false;
  checkKiemTraCauHoi: any;
  checkCauTiepTheo: boolean = false;
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
  arrayQuestionAnswer = [];

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
    this.checkOpenModalNextCauHoi = true;
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
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

  onChane(event) {
    const index = event.substring(0, 1);
    const dapAn = event.substring(1, 2);
    if (index == 0) {
      this.selectedItemChoose0 = dapAn;
    } else if (index == 1) {
      this.selectedItemChoose1 = dapAn;
    } else if (index == 2) {
      this.selectedItemChoose2 = dapAn;
    } else if (index == 3) {
      this.selectedItemChoose3 = dapAn;
    }
  }

  checkKiemTra() {
    // checkCauTiepTheo && selectedItemChoose0 
    // && selectedItemChoose1 && selectedItemChoose2 && selectedItemChoose3
    if (this.baiTests) { 
      let totalCau = this.baiTests.toeic.listDoanVan[this.indexCauHoi].listCauTraLoi.length;
      switch(totalCau) {
        case 2 : 
          if (this.checkCauTiepTheo && this.selectedItemChoose0 && this.selectedItemChoose1) {
            return true;
          } else {
            return false;
          }
        case 3 : 
        if (this.checkCauTiepTheo && this.selectedItemChoose0 && this.selectedItemChoose1 && this.selectedItemChoose2) {
            return true;
          } else {
            return false;
          }
        case 4 : 
        if (this.checkCauTiepTheo && this.selectedItemChoose0 && this.selectedItemChoose1 && this.selectedItemChoose2 
           && this.selectedItemChoose3) {
            return true;
          } else {
            return false;
          }
      }
    }
  }

  checkOpenModal() {
    // selectedItemChoose0 == '' || selectedItemChoose1  == '' || 
    // selectedItemChoose2  == '' || selectedItemChoose3  == ''
    if (this.baiTests) { 
      let totalCau = this.baiTests.toeic.listDoanVan[this.indexCauHoi].listCauTraLoi.length;
      switch(totalCau) {
        case 2 : 
          if (this.selectedItemChoose0 == '' || this.selectedItemChoose1 == '') {
            return true;
          } else {
            return false;
          }
        case 3 : 
          if (this.selectedItemChoose0 == '' || this.selectedItemChoose1 == '' || this.selectedItemChoose2 == '') {
            return true;
          } else {
            return false;
          }
        case 4 : 
          if (this.selectedItemChoose0 == '' || this.selectedItemChoose1 == '' || this.selectedItemChoose2 == ''
          || this.selectedItemChoose3 == '') {
            return true;
          } else {
            return false;
          }
      }
    }
  }

  checkNextCauHoi() {
    // !checkCauTiepTheo && selectedItemChoose0 != '' && 
    // selectedItemChoose1  != '' && selectedItemChoose2  != '' && selectedItemChoose3  != ''
    if (this.baiTests) { 
      let totalCau = this.baiTests.toeic.listDoanVan[this.indexCauHoi].listCauTraLoi.length;
      switch(totalCau) {
        case 2 : 
          if (!this.checkCauTiepTheo && this.selectedItemChoose0 != '' && this.selectedItemChoose1 != '') {
            return true;
          } else {
            return false;
          }
        case 3 : 
        if (!this.checkCauTiepTheo && this.selectedItemChoose0 != '' && this.selectedItemChoose1 != '' && this.selectedItemChoose2 != '') {
            return true;
          } else {
            return false;
          }
        case 4 : 
        if (!this.checkCauTiepTheo && this.selectedItemChoose0 != '' && this.selectedItemChoose1 != '' && this.selectedItemChoose2 != ''
           && this.selectedItemChoose3 != '') {
            return true;
          } else {
            return false;
          }
      }
    }
  }

  ngOnInit() {
    this.isLoading = true;
    // let id = this.route.snapshot.paramMap.get('id');
    // if (id == '6') {
      this.titleService.setTitle(PART6);
      this.http.get(URLAPI + 'part6').subscribe(data => {
        this.baiTests = data;
        this.getDetail();
        this.isLoading = false;
      });
      this.checkCauTiepTheo = true;
      this.showCorrect = false;
      this.countDown();
    // } else {
    //   this.isLoading = false;
    // }
  }

  totalCauHoi: number = 2;
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

    if (this.indexCauHoi < this.totalCauHoi) {
        this.indexCauHoi += 1;
        this.getDetail();
        this.checkCauTiepTheo = true;
        this.checkKiemTraCauHoi = false;
        this.show = false;
        this.showCorrect = false;
        this.showInCorrect = false;
        this.selectedItemChoose0 = "";
        this.selectedItemChoose1 = "";
        this.selectedItemChoose2 = "";
        this.selectedItemChoose3 = "";
    } else {
      this.start();
      this.router.navigate(['/ket-qua-bai-thi'], {
        state: { 
          score: this.score,
          hours: this.hours,
          minute: this.minute,
          seconds: this.seconds,
          totalCorrect: this.totalCorrect,
          part: '/reading-part6',
          totalQuestion: this.totalCauHoi + 1
          }
      });
    }
  }

  getDetail() {
    this.cauHoi = this.baiTests.toeic.listDoanVan[this.indexCauHoi].doanVan1;
    this.dichDoanVan1 = this.baiTests.toeic.listDoanVan[this.indexCauHoi].dichDoanVan1;
    const cauA = this.baiTests.toeic.listDoanVan[this.indexCauHoi].listCauTraLoi[0].cauA;
    const cauB = this.baiTests.toeic.listDoanVan[this.indexCauHoi].listCauTraLoi[0].cauB;
    const cauC = this.baiTests.toeic.listDoanVan[this.indexCauHoi].listCauTraLoi[0].cauC;
    const cauD = this.baiTests.toeic.listDoanVan[this.indexCauHoi].listCauTraLoi[0].cauD;
    this.cauDung = this.baiTests.toeic.listDoanVan[this.indexCauHoi].listCauTraLoi[0].cauDung;
    this.goiY = this.baiTests.toeic.listDoanVan[this.indexCauHoi].listCauTraLoi[0].goiY;
    this.giaiThich = this.baiTests.toeic.listDoanVan[this.indexCauHoi].listCauTraLoi[0].giaiThich;
    this.arrayQuestionAnswer = this.baiTests.toeic.listDoanVan[this.indexCauHoi].listCauTraLoi;
  }

  isVisible(event){
    const index = event.substring(0, 1);
    const dapAn = event.substring(1, 2);
    if (index == 0) {
      if (dapAn == this.selectedItem0) {
        return true;
      } else {
        return false;
      }
      
    } else if (index == 1) {
      if (dapAn == this.selectedItem1) {
        return true;
      } else {
        return false;
      }
    } else if (index == 2) {
      if (dapAn == this.selectedItem2) {
        return true;
      } else {
        return false;
      }
    } else if (index == 3) {
      if (dapAn == this.selectedItem3) {
        return true;
      } else {
        return false;
      }
    }
    return false; 
  }
  
  kiemTra() {
    this.checkUserChooseAnswer = false;
    this.checkCauTiepTheo = false;
    this.checkGoiY = true;
    this.show = false;
    let totalCau = this.baiTests.toeic.listDoanVan[this.indexCauHoi].listCauTraLoi.length;
    let dapAnDung0 = '';
    let dapAnDung1 = '';
    let dapAnDung2 = '';
    let dapAnDung3 = '';
    switch(totalCau) {
      case 2:
        this.selectedItem0 = this.selectedItemChoose0;
        this.selectedItem1 = this.selectedItemChoose1;
        dapAnDung0 = this.baiTests.toeic.listDoanVan[this.indexCauHoi].listCauTraLoi[0].cauDung;
        dapAnDung1 = this.baiTests.toeic.listDoanVan[this.indexCauHoi].listCauTraLoi[1].cauDung;
        break;
      case 3: 
        this.selectedItem0 = this.selectedItemChoose0;
        this.selectedItem1 = this.selectedItemChoose1;
        this.selectedItem2 = this.selectedItemChoose2;
        dapAnDung0 = this.baiTests.toeic.listDoanVan[this.indexCauHoi].listCauTraLoi[0].cauDung;
        dapAnDung1 = this.baiTests.toeic.listDoanVan[this.indexCauHoi].listCauTraLoi[1].cauDung;
        dapAnDung2 = this.baiTests.toeic.listDoanVan[this.indexCauHoi].listCauTraLoi[2].cauDung;
      case 4: 
        this.selectedItem0 = this.selectedItemChoose0;
        this.selectedItem1 = this.selectedItemChoose1;
        this.selectedItem2 = this.selectedItemChoose2;
        this.selectedItem3 = this.selectedItemChoose3;
        dapAnDung0 = this.baiTests.toeic.listDoanVan[this.indexCauHoi].listCauTraLoi[0].cauDung;
        dapAnDung1 = this.baiTests.toeic.listDoanVan[this.indexCauHoi].listCauTraLoi[1].cauDung;
        dapAnDung2 = this.baiTests.toeic.listDoanVan[this.indexCauHoi].listCauTraLoi[2].cauDung;
        dapAnDung3 = this.baiTests.toeic.listDoanVan[this.indexCauHoi].listCauTraLoi[3].cauDung;
    }
    
    if (this.selectedItemChoose0 == dapAnDung0) {
      this.score += 100/12;
    }
    if (this.selectedItemChoose1 == dapAnDung1) {
      this.score += 100/12;
    }  
    if (this.selectedItemChoose2 == dapAnDung2) {
      this.score += 100/12;
    }
    if (this.selectedItemChoose3 == dapAnDung3) {
      this.score += 100/12;
    }
    if (this.selectedItemChoose0 == dapAnDung0 && this.selectedItemChoose1 == dapAnDung1 
        && this.selectedItemChoose2 == dapAnDung2 && this.selectedItemChoose3 == dapAnDung3) {
      this.showCorrect = true;
      this.totalCorrect += 1;
    } else {
      this.showInCorrect = true;
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
  providers: [RADIO_VALUE_ACCESSOR],
  templateUrl: "./radio-button.component.html",
  styleUrls: ["./radio-button.component.scss"]
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
