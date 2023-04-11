import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription, distinctUntilChanged, last } from 'rxjs';
import { Story, StoryType } from 'src/app/interfaces/story.interface';
import { StoryService } from 'src/app/services/story.service';
@Component({
    selector: 'app-stories',
    templateUrl: './stories.component.html',
    styleUrls: ['./stories.component.scss', './search-bar.scss']
})
export class StoriesComponent implements OnInit, OnDestroy {
    @ViewChild(CdkVirtualScrollViewport, { static: false }) viewPort: CdkVirtualScrollViewport;
    public type: StoryType = 'new';

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
        this.unsubscribe();
        this.storyService.resetAndClearCache();
    }

    unsubscribe() {
        for (const sub of this.subscriptions) {
            sub.unsubscribe();
        }
    }

    fetchData(type: StoryType, useCache: boolean = false) {
        this.isLoading = true;
        this.searchValue = '';

        // fetch all 500 new stories or other type of Stories
        let fetchStories$: Observable<Story[]> = this.storyService.getLatestStoriesByType(type, useCache);

        // make sure the get Stories Count's B.Subject is completed before we start fetching stories, 
        // then keep updating the stories view while fetching batched stories until it finished.
        const sub =
            fetchStories$
                .subscribe((stories: Story[]) => {
                    console.log(`Received ${type} stories: ${stories.length}`)

                    let filtered_stories = stories.filter(story => !!story);
                    this.stories = this.filteredStories = filtered_stories;
                })

        this.subscriptions.push(sub);

        // if we are using the existing cache, then there is no need for the subscription and update
        if (useCache && !!this.storyService.getStoryCacheByType(type)) {
            this.isLoading = false;
        } else {
            // take the last emit value, so we know it has completed fetching data
            fetchStories$
                .pipe(
                    last()
                ).subscribe(stories => {
                    console.log('stories', stories.length);
                    console.log(`completed fetching ${type} stories.`);
                    this.storyService.setStoryCacheByType(type, stories);
                    this.updateTimestamp[type] = new Date();
                    this.isLoading = false;
                })
        }
    }

    public switchStoryType(type: any) {
        this.unsubscribe();
        if (this.type === type) return; // do nothing when we are on the same type of view
        this.type = type;
        this.filteredStories = [];
        this.fetchData(type, true);
    }

    public applyFilter(event: KeyboardEvent) {
        const search_filter = (<HTMLInputElement>event.target).value.trim().toLowerCase();
        this.filteredStories = this.stories.filter(s => s.title.toLowerCase().includes(search_filter));
    }

    public checkUpdate() {
        this.unsubscribe();
        this.storyService.resetAndClearCache(this.type);
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


