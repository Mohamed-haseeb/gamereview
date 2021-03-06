import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// all imports made here
import { AppComponent } from './app.component';
import {gameCreateComponent} from './games/game-create/game-create.component';
import {
  MatInputModule,
  MatCardModule,
  MatButtonModule ,
  MatToolbarModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
 } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { gameListComponent } from './games/game-list/game-list.component';
import { ReviewCreateComponent } from './reviews/review-create/review-create.component';
import { gameFilterPipe } from './games/game-list/game-filter.pipe';
import { LoginComponent } from './user/login/login.component';
import { SignupComponent } from './user/signup/signup.component';
import { AuthInterceptor } from './user/auth-interceptor';
import { AddAdminComponent } from './user/addAdmin/addAdmin.component';
import { PrivacyPolicyComponent } from './user/policies/policy.component';
import { DmcaComponent } from './user/dmca/dmca.component';
import { TakedownProcComponent } from './user/takedownProc/takedown-proc.component';
import { DeactivateComponent } from './user/deactivate/deactivate.component';


@NgModule({
  declarations: [
    AppComponent,
    gameCreateComponent,
    HeaderComponent,
    gameListComponent,
    ReviewCreateComponent,
    gameFilterPipe,
    LoginComponent,
    SignupComponent,
    AddAdminComponent,
    PrivacyPolicyComponent,
    DmcaComponent,
    TakedownProcComponent,
    DeactivateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    HttpClientModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
