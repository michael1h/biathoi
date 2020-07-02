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
import { PART71, PART72, URLAPI } from 'src/app/constant';

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
export class BaiTestReading3Component implements OnInit, OnDestroy {
  
  
  
  constructor(
    private router: Router,
    private titleService: Title,
    private modalService: BsModalService,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {

  }

  
  selectedItemChoose0: any = '';
  selectedItemChoose1: any = '';
  selectedItemChoose2: any = '';
  selectedItemChoose3: any = '';
  selectedItemChoose4: any = '';
  selectedItem0: any;
  selectedItem1: any;
  selectedItem2: any;
  selectedItem3: any;
  selectedItem4: any;

  cauHoi1: any;
  cauHoi2: any;
  cauHoi3: any;
  dichDoanVan3: any;
  dichDoanVan2: any;
  dichDoanVan1: any;
 
  randomClassCauHoi2: string;
  randomClassCauHoi3: string;
  randomClassCauHoi1: string;
  baiTests: any;

  modalRef: BsModalRef;
  show: boolean;
  goiY: any;
  checkOpenModalNextCauHoi: boolean = false;
  checkCauTiepTheo: boolean = false;
  indexCauHoi: number = 0;
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
    } else if (index == 4) {
      this.selectedItemChoose4 = dapAn;
    }
  }

  checkShowButtonNextCau() {
    if (this.baiTests) {
      let totalCau = this.baiTests.toeic.listDoanVan[this.indexCauHoi].listCauTraLoi.length;
    switch (totalCau) {
      case 2:
        if (!this.checkCauTiepTheo && this.selectedItemChoose0 != '' && this.selectedItemChoose1 != '') {
          return true;
        } else {
          return false;
        }
      case 3:
        if (!this.checkCauTiepTheo && this.selectedItemChoose0 != '' && this.selectedItemChoose1
        && this.selectedItemChoose2 != '') {
          return true;
        } else {
          return false;
        }
      case 4:
        if (!this.checkCauTiepTheo && this.selectedItemChoose0 != '' && this.selectedItemChoose1
        && this.selectedItemChoose2 && this.selectedItemChoose3 != '') {
          return true;
        } else {
          return false;
        }
      case 5:
        if (
          !this.checkCauTiepTheo 
          && this.selectedItemChoose0 == '' 
          && this.selectedItemChoose1 == ''
          && this.selectedItemChoose2 == ''
          && this.selectedItemChoose3 == ''
          && this.selectedItemChoose4 == '') {
          return true;
        } else {
          return false;
        }
    }
    return false;
    }
  }

  checkShowButtonOpenMal() {
    if (this.baiTests) {
      let totalCau = this.baiTests.toeic.listDoanVan[this.indexCauHoi].listCauTraLoi.length;
      switch (totalCau) {
        case 2:
          if (this.selectedItemChoose0 == '' || this.selectedItemChoose1  == '') {
            return true;
          } else {
            return false;
          }
        case 3:
          if (this.selectedItemChoose0 == '' || this.selectedItemChoose1  == '' 
          || this.selectedItemChoose2  == '') {
            return true;
          } else {
            return false;
          }
        case 4:
          if (this.selectedItemChoose0 == '' || this.selectedItemChoose1  == '' 
          || this.selectedItemChoose2  == '' || this.selectedItemChoose3  == '') {
            return true;
          } else {
            return false;
          }
        case 5:
          if (this.checkCauTiepTheo && !this.selectedItemChoose0 && !this.selectedItemChoose4
          && !this.selectedItemChoose3 && !this.selectedItemChoose1 
          && !this.selectedItemChoose2) {
            return true;
          } else {
            return false;
          }
      }
      return false;
    }
  }

  checkShowButtonKiemTra() {
    if (this.baiTests) {
      let totalCau = this.baiTests.toeic.listDoanVan[this.indexCauHoi].listCauTraLoi.length;
      switch (totalCau) {
        case 2:
            if (this.selectedItemChoose0 && this.selectedItemChoose1) {
              return true;
            } else {
              return false;
            }
        case 3:
            if (this.selectedItemChoose0 && this.selectedItemChoose1 && this.selectedItemChoose2) {
              return true;
            } else {
              return false;
            }
        case 4:
            if (this.selectedItemChoose0 
              && this.selectedItemChoose1 && this.selectedItemChoose2 && this.selectedItemChoose3) {
              return true;
            } else {
              return false;
            }
        case 5:
            if (this.selectedItemChoose0 
              && this.selectedItemChoose1 && this.selectedItemChoose2 
              && this.selectedItemChoose3 && this.selectedItemChoose4) {
              return true;
            } else {
              return false;
            }
      }
      return false;
    }
  }

  ngOnInit() {
    this.isLoading = true;
    this.showCorrect = false;
    this.randomClassCauHoi1 = Math.floor((Math.random() * 5) + 1).toString();
    this.randomClassCauHoi2 = Math.floor((Math.random() * 5) + 1).toString();
    this.randomClassCauHoi3 = Math.floor((Math.random() * 5) + 1).toString();
    let id = this.route.snapshot.paramMap.get('id');
    if (id == '1') {
      this.titleService.setTitle(PART71);
      this.http.get(URLAPI + 'part7/' + id).subscribe(data => {
        this.baiTests = data;
        this.isLoading = false;
        this.getDetail();
        this.countDown();
      });
      this.countDown();
    } else if (id == '0') {
      this.titleService.setTitle(PART72);
      this.http.get(URLAPI + 'part7/' + id).subscribe(data => {
        this.baiTests = data;
        this.isLoading = false;
        this.getDetail();
        this.countDown();
      });
    }
  }

  totalCauHoi: number = 3;

  nextCauHoi() {
    this.checkGiaiThich = false;
    this.randomClassCauHoi1 = Math.floor((Math.random() * 5) + 1).toString();
    this.randomClassCauHoi2 = Math.floor((Math.random() * 5) + 1).toString();
    this.randomClassCauHoi3 = Math.floor((Math.random() * 5) + 1).toString();
    this.checkUserChooseAnswer = true;
    this.checkGoiY = false;
    this.checkCauTiepTheo = false;
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
        this.show = false;
        this.showCorrect = false;
        this.showInCorrect = false;
    } else {
      this.start();
      let id = this.route.snapshot.paramMap.get('id');
      if (id == '1') {
        this.router.navigate(['/ket-qua-bai-thi'], {
          state: { 
            score: this.score,
            hours: this.hours,
            minute: this.minute,
            seconds: this.seconds,
            totalCorrect: this.totalCorrect,
            part: '/reading-part7/1',
            totalQuestion: this.totalCauHoi + 1
            }
        });
      } else if (id == '0') {
        this.router.navigate(['/ket-qua-bai-thi'], {
          state: { 
            score: this.score,
            hours: this.hours,
            minute: this.minute,
            seconds: this.seconds,
            totalCorrect: this.totalCorrect,
            part: '/reading-part7/0',
            totalQuestion: this.totalCauHoi + 1
            }
        });
      }
    }
  }

  getDetail() {
    this.cauHoi1 = this.baiTests.toeic.listDoanVan[this.indexCauHoi].doanVan1;
    this.cauHoi2 = this.baiTests.toeic.listDoanVan[this.indexCauHoi].doanVan2;
    this.cauHoi3 = this.baiTests.toeic.listDoanVan[this.indexCauHoi].doanVan3;

    this.dichDoanVan1 = this.baiTests.toeic.listDoanVan[this.indexCauHoi].dichDoanVan1;
    this.dichDoanVan2 = this.baiTests.toeic.listDoanVan[this.indexCauHoi].dichDoanVan2;
    this.dichDoanVan3 = this.baiTests.toeic.listDoanVan[this.indexCauHoi].dichDoanVan3;

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
    } else if (index == 4) {
      if (dapAn == this.selectedItem4) {
        return true;
      } else {
        return false;
      }
    }
    return false; 
  }

  total2CauHoi(total: number) {
    this.selectedItem0 = this.selectedItemChoose0;
    this.selectedItem1 = this.selectedItemChoose1;
    const dapAnDung0 = this.baiTests.toeic.listDoanVan[this.indexCauHoi].listCauTraLoi[0].cauDung;
    const dapAnDung1 = this.baiTests.toeic.listDoanVan[this.indexCauHoi].listCauTraLoi[1].cauDung;
    if (this.selectedItemChoose0 == dapAnDung0) {
      this.score += 100/total;
    }
    if (this.selectedItemChoose1 == dapAnDung1) {
      this.score += 100/total;
    }
    if (this.selectedItemChoose0 == dapAnDung0 && this.selectedItemChoose1 == dapAnDung1) {
      this.showCorrect = true;
      this.totalCorrect += 1;
    } else {
      this.showInCorrect = true;
    }
    this.selectedItemChoose0 = '';
    this.selectedItemChoose1 = '';
  }

  total3CauHoi(total: number) {
    this.selectedItem0 = this.selectedItemChoose0;
    this.selectedItem1 = this.selectedItemChoose1;
    this.selectedItem2 = this.selectedItemChoose2;
    const dapAnDung0 = this.baiTests.toeic.listDoanVan[this.indexCauHoi].listCauTraLoi[0].cauDung;
    const dapAnDung1 = this.baiTests.toeic.listDoanVan[this.indexCauHoi].listCauTraLoi[1].cauDung;
    const dapAnDung2 = this.baiTests.toeic.listDoanVan[this.indexCauHoi].listCauTraLoi[2].cauDung;
    if (this.selectedItemChoose0 == dapAnDung0) {
      this.score += 100/total;
    }
    if (this.selectedItemChoose1 == dapAnDung1) {
      this.score += 100/total;
    }
    if (this.selectedItemChoose2 == dapAnDung2) {
      this.score += 100/total;
    }
    if (this.selectedItemChoose0 == dapAnDung0 && this.selectedItemChoose1 == dapAnDung1 
      && this.selectedItemChoose2 == dapAnDung2) {
      this.showCorrect = true;
      this.totalCorrect += 1;
    } else {
      this.showInCorrect = true;
    }
    this.selectedItemChoose0 = '';
    this.selectedItemChoose1 = '';
    this.selectedItemChoose2 = '';
  }

  total4CauHoi(total: number) {
    this.selectedItem0 = this.selectedItemChoose0;
    this.selectedItem1 = this.selectedItemChoose1;
    this.selectedItem2 = this.selectedItemChoose2;
    this.selectedItem3 = this.selectedItemChoose3;
    const dapAnDung0 = this.baiTests.toeic.listDoanVan[this.indexCauHoi].listCauTraLoi[0].cauDung;
    const dapAnDung1 = this.baiTests.toeic.listDoanVan[this.indexCauHoi].listCauTraLoi[1].cauDung;
    const dapAnDung2 = this.baiTests.toeic.listDoanVan[this.indexCauHoi].listCauTraLoi[2].cauDung;
    const dapAnDung3 = this.baiTests.toeic.listDoanVan[this.indexCauHoi].listCauTraLoi[3].cauDung;
    if (this.selectedItemChoose0 == dapAnDung0) {
      this.score += 100/total;
    }
    if (this.selectedItemChoose1 == dapAnDung1) {
      this.score += 100/total;
    }
    if (this.selectedItemChoose2 == dapAnDung2) {
      this.score += 100/total;
    }
    if (this.selectedItemChoose3 == dapAnDung3) {
      this.score += 100/total;
    }
    if (this.selectedItemChoose0 == dapAnDung0 && this.selectedItemChoose1 == dapAnDung1 
      && this.selectedItemChoose2 == dapAnDung2 && this.selectedItemChoose3 == dapAnDung3) {
      this.showCorrect = true;
      this.totalCorrect += 1;
    } else {
      this.showInCorrect = true;
    }
    this.selectedItemChoose0 = '';
    this.selectedItemChoose1 = '';
    this.selectedItemChoose2 = '';
    this.selectedItemChoose3 = '';
  }

  total5CauHoi(total: number) {
    this.selectedItem0 = this.selectedItemChoose0;
    this.selectedItem1 = this.selectedItemChoose1;
    this.selectedItem2 = this.selectedItemChoose2;
    this.selectedItem3 = this.selectedItemChoose3;
    this.selectedItem4 = this.selectedItemChoose4;
    const dapAnDung0 = this.baiTests.toeic.listDoanVan[this.indexCauHoi].listCauTraLoi[0].cauDung;
    const dapAnDung1 = this.baiTests.toeic.listDoanVan[this.indexCauHoi].listCauTraLoi[1].cauDung;
    const dapAnDung2 = this.baiTests.toeic.listDoanVan[this.indexCauHoi].listCauTraLoi[2].cauDung;
    const dapAnDung3 = this.baiTests.toeic.listDoanVan[this.indexCauHoi].listCauTraLoi[3].cauDung;
    const dapAnDung4 = this.baiTests.toeic.listDoanVan[this.indexCauHoi].listCauTraLoi[4].cauDung;
    if (this.selectedItemChoose0 == dapAnDung0) {
      this.score += 100/total;
    }
    if (this.selectedItemChoose1 == dapAnDung1) {
      this.score += 100/total;
    }
    if (this.selectedItemChoose2 == dapAnDung2) {
      this.score += 100/total;
    }
    if (this.selectedItemChoose3 == dapAnDung3) {
      this.score += 100/total;
    }
    if (this.selectedItemChoose4 == dapAnDung4) {
      this.score += 100/total;
    }
    if (this.selectedItemChoose0 == dapAnDung0 && this.selectedItemChoose1 == dapAnDung1 
      && this.selectedItemChoose2 == dapAnDung2 && this.selectedItemChoose3 == dapAnDung3
      && this.selectedItemChoose4 == dapAnDung4 ) {
      this.showCorrect = true;
      this.totalCorrect += 1;
    } else {
      this.showInCorrect = true;
    }
    this.selectedItemChoose0 = '';
    this.selectedItemChoose1 = '';
    this.selectedItemChoose2 = '';
    this.selectedItemChoose3 = '';
    this.selectedItemChoose4 = '';
  }
  
  kiemTra() {
    this.checkUserChooseAnswer = false;
    this.checkCauTiepTheo = true;
    this.checkGoiY = true;
    this.show = false;
    let total: number = 0;
    let totalCau = this.baiTests.toeic.listDoanVan[this.indexCauHoi].listCauTraLoi.length;
    for (let index = 0; index < 4; index++) {
      const element = this.baiTests.toeic.listDoanVan[index].listCauTraLoi.length;
      total += element;
    }
    console.log(total);
    switch (totalCau) {
      case 2:
          this.total2CauHoi(total);
          break;
      case 3:
          this.total3CauHoi(total);
          break;
      case 4:
        this.total4CauHoi(total);
        break;
      case 5:
        this.total5CauHoi(total);
        break;
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
