import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatListModule } from "@angular/material/list";
import { MatCardModule } from "@angular/material/card";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { HeaderComponent } from "./views/components/template/header/header.component";
import { FooterComponent } from "./views/components/template/footer/footer.component";
import { NavComponent } from "./views/components/template/nav/nav.component";
import { HomeComponent } from "./views/components/template/home/home.component";
import { TecnicoReadComponent } from "./views/components/tecnico/tecnico-read/tecnico-read.component";
import { TecnicoCreateComponent } from "./views/components/tecnico/tecnico-create/tecnico-create.component";
import { TecnicoUpdateComponent } from "./views/components/tecnico/tecnico-update/tecnico-update.component";
import { ClienteCreateComponent } from "./views/components/cliente/cliente-create/cliente-create.component";
import { ClienteUpdateComponent } from "./views/components/cliente/cliente-update/cliente-update.component";
import { ClienteReadComponent } from "./views/components/cliente/cliente-read/cliente-read.component";
import { OsReadComponent } from "./views/components/os/os-read/os-read.component";
import { OsCreateComponent } from "./views/components/os/os-create/os-create.component";
import { OsUpdateComponent } from "./views/components/os/os-update/os-update.component";
import { OsDescriptionComponent } from "./views/components/os/os-description/os-description.component";
import { OsClosedComponent } from "./views/components/os-closed/os-closed.component";
import { SpinnerComponent } from "./views/components/template/spinner/spinner.component";
import { LoadingInterceptor } from "./loading.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    HomeComponent,
    TecnicoReadComponent,
    TecnicoCreateComponent,
    TecnicoUpdateComponent,
    ClienteReadComponent,
    ClienteCreateComponent,
    ClienteUpdateComponent,
    OsReadComponent,
    OsCreateComponent,
    OsUpdateComponent,
    OsDescriptionComponent,
    OsClosedComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    MatTableModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatPaginatorModule,
    MatSnackBarModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
