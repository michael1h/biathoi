import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { TodoComponent } from './todo/todo.component';
import { IsLoggedInGuard } from './shared/guards/is-logged-in.guard';
import { DeThiRutGonComponent } from './de-thi-rut-gon/de-thi-rut-gon.component';
import { DeThiFullComponent } from './de-thi-full/de-thi-full.component';
import { DeLuyenTapComponent } from './de-luyen-tap/luyen-tap.component';
import { BaiTestComponent } from './de-luyen-tap/bai-test/bai-test.component';
import { KetQuaBaiTestComponent } from './de-luyen-tap/bai-test/ketquabaitest.component';
import { BaiTest1Component } from './de-luyen-tap/bai-test1/bai-test.component';
import { BaiTest2Component } from './de-luyen-tap/bai-test2/bai-test.component';
// import { KetQuaBaiTestComponent1 } from './de-luyen-tap/bai-test1/ketquabaitest.component';

const routes: Routes = [
  {
    path: '',
    component: TodoComponent,
    // canActivate: [IsLoggedInGuard]
  },
  { 
    path: 'login', children: [], 
    component: LoginComponent
  },
  { path: 'de-thi-full', component: DeThiFullComponent},
  { path: 'de-luyen-tap', component: DeLuyenTapComponent},
  { path: 'ket-qua-bai-thi', component: KetQuaBaiTestComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'de-thi-rut-gon', component: DeThiRutGonComponent },
  { path: 'bai-test-rut-gon-part1', component: BaiTestComponent },
  { path: 'bai-test-rut-gon-part2', component: BaiTest1Component },
  { path: 'bai-test-rut-gon-part3', component: BaiTest2Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
