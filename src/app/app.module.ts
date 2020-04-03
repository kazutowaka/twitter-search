import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaginationComponent } from './pagination/pagination.component';
import { TruncatePipe } from './truncate.pipe';
import { HashtagsPipe } from './hashtags.pipe';
import { PageComponent } from './page/page.component';

@NgModule({
  declarations: [
    AppComponent,
    PaginationComponent,
    TruncatePipe,
    HashtagsPipe,
    PageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
