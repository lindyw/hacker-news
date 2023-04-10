import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Story, StoryType } from 'src/app/interfaces/story.interface';
import { StoryService } from 'src/app/services/story.service';

@Component({
    selector: 'app-stories',
    templateUrl: './stories.component.html',
    styleUrls: ['./stories.component.scss', './search-bar.scss']
})
export class StoriesComponent implements OnInit, OnDestroy {
    @ViewChild(CdkVirtualScrollViewport, { static: false }) viewPort: CdkVirtualScrollViewport;
    @Input() type: StoryType = 'new';

    public stories: Story[] = [];
    public filteredStories: Story[] = [];
    public searchValue: string = '';
    public isTop = true;
    public isLoading = true;
    public updateTimestamp: Date;

    private subscriptions: Subscription[] = [];

    constructor(
        private storyService: StoryService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.fetchData(this.type);
    }

    ngOnDestroy(): void {
        for (const sub of this.subscriptions) {
            sub.unsubscribe();
        }
        this.storyService.clearCache();
    }

    fetchData(type: StoryType) {
        this.isLoading = true;
        this.searchValue = '';
        const total = type === 'new' ? 500 : 200;
        // fetch all 500 new stories
        let fetchStories$ = this.storyService.getLatestStoriesByType(type);


        const sub =
            fetchStories$
                .subscribe((stories: Story[]) => {

                    console.log('stories', stories.length);

                    if (stories.length === total) {
                        this.storyService.setStoryCacheByType(type, stories);
                        this.updateTimestamp = new Date();
                        this.isLoading = false;
                    }
                    let filtered_stories = stories.filter(story => !!story);
                    this.stories = this.filteredStories = filtered_stories;
                })

        this.subscriptions.push(sub);

    }

    public applyFilter(event: KeyboardEvent) {
        const search_filter = (<HTMLInputElement>event.target).value.trim().toLowerCase();
        this.filteredStories = this.stories.filter(s => s.title.toLowerCase().includes(search_filter));
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


