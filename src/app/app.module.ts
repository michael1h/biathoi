import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { LoginComponent } from './login/login.component';
import { AuthService } from './shared/services/auth.service';
import { SignupComponent } from './signup/signup.component';
import { TodoComponent } from './todo/todo.component';
import { TodoService } from './shared/services/todo.service';
import { IsLoggedInGuard } from './shared/guards/is-logged-in.guard';
import { DeThiRutGonComponent } from './de-thi-rut-gon/de-thi-rut-gon.component';
import { DeThiFullComponent } from './de-thi-full/de-thi-full.component';
import { DeLuyenTapComponent } from './de-luyen-tap/luyen-tap.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BaiTestComponent } from './de-luyen-tap/bai-test/bai-test.component';
import { BaiTest1Component } from './de-luyen-tap/bai-test1/bai-test.component';
import { BaiTest2Component } from './de-luyen-tap/bai-test2/bai-test.component';
import { RadioButtonComponent } from './shared/radio-button/radio-button.component';
import { RadioButton1Component } from './shared/radio-button1/radio-button.component';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faTrashAlt, faSquare, faCheckSquare, faEnvelopeOpen } from '@fortawesome/free-regular-svg-icons';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons/faAngleDoubleRight';
import { ModalModule } from 'ngx-bootstrap';
import { LoadingComponent } from './shared/loading/loading';
import { KetQuaBaiTestComponent } from './de-luyen-tap/bai-test/ketquabaitest.component';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
// import jquery = require("jquery");

@NgModule({
  declarations: [
    AppComponent,
    DeLuyenTapComponent,
    KetQuaBaiTestComponent,
    LoginComponent,
    BaiTest1Component,
    BaiTest2Component,
    SignupComponent,
    TodoComponent,
    DeThiFullComponent,
    LoadingComponent,
    DeThiRutGonComponent,
    RadioButtonComponent,
    RadioButton1Component,
    HeaderComponent,
    FooterComponent,
    BaiTestComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    CollapseModule.forRoot(),
    BrowserAnimationsModule,
    FontAwesomeModule,
    AppRoutingModule,
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}, AuthService, TodoService, IsLoggedInGuard],
  bootstrap: [AppComponent],
  
}
)
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faTrashAlt, faCheckSquare, faSquare, faAngleDoubleRight, faEnvelopeOpen);
  }
}
