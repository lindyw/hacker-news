import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { StoriesComponent } from './components/stories/stories.component';
import { DateTimeAgoPipe } from './pipes/date-time-ago.pipe';
import { FilteringChipsComponent } from './components/filtering-chips/filtering-chips.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        StoriesComponent,
        DateTimeAgoPipe,
        FilteringChipsComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        MatChipsModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule,
        MatProgressBarModule,
        ScrollingModule
    ],
    providers: [{ provide: Window, useValue: window }],
    bootstrap: [AppComponent]
})
export class AppModule { }
