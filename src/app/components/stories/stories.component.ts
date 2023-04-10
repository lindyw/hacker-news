import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
    type: StoryType = 'new';

    public stories: Story[] = [];
    public filteredStories: Story[] = [];
    public searchValue: string = '';
    public isTop = true;
    public isLoading = true;
    public updateTimestamp: { [type: string]: Date } = {};

    private subscriptions: Subscription[] = [];

    constructor(
        private storyService: StoryService
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

    fetchData(type: StoryType, useCache: boolean = false) {
        this.isLoading = true;
        this.searchValue = '';
        let total = type === 'new' ? 500 : this.storyService.getStoriesCount(type);
        console.log('total', total);
        // fetch all 500 new stories or other type of Stories
        let fetchStories$ = this.storyService.getLatestStoriesByType(type, useCache);


        const sub =
            fetchStories$
                .subscribe((stories: Story[]) => {

                    console.log('stories', stories.length);

                    if (stories.length === total) {
                        this.storyService.setStoryCacheByType(type, stories);
                        this.updateTimestamp[type] = this.storyService.updateTimeStamp[type];
                        this.isLoading = false;
                    }
                    let filtered_stories = stories.filter(story => !!story);
                    this.stories = this.filteredStories = filtered_stories;
                })

        this.subscriptions.push(sub);

    }

    public switchStoryType(type: any) {
        this.type = type;
        this.fetchData(type, true);
    }

    public applyFilter(event: KeyboardEvent) {
        const search_filter = (<HTMLInputElement>event.target).value.trim().toLowerCase();
        this.filteredStories = this.stories.filter(s => s.title.toLowerCase().includes(search_filter));
    }

    public checkUpdate() {
        this.storyService.clearCache();
        this.fetchData(this.type);
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


