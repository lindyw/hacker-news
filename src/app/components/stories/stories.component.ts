import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Story } from 'src/app/interfaces/story.interface';
import { StoryService } from 'src/app/services/story.service';

@Component({
    selector: 'app-stories',
    templateUrl: './stories.component.html',
    styleUrls: ['./stories.component.scss']
})
export class StoriesComponent implements OnInit, OnDestroy {
    @ViewChild(CdkVirtualScrollViewport, { static: false }) viewPort: CdkVirtualScrollViewport;
    public stories: Story[] = [];
    public isTop = true;
    public isLoading = true;

    private subscriptions: Subscription[] = [];

    constructor(
        private getService: StoryService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.fetchData();
    }

    ngOnDestroy(): void {
        for (const sub of this.subscriptions) {
            sub.unsubscribe();
        }
    }

    fetchData() {
        this.getService.getNewStories()
            .subscribe(stories => {
                console.log('stories', stories.length);
                if (stories.length === 500) {
                    this.isLoading = false;
                }
                this.stories = stories.filter(story => !!story);
            })
    }

    public getScrollIndex(index: number) {
        console.log('scroll index', index);
        this.isTop = index === 0;
    }

    public backToTop() {
        this.viewPort.scrollToIndex(0);
    }

    public showDateTime(unixTime: number) {
        return new Date(unixTime * 1000).toISOString();
    }

}
