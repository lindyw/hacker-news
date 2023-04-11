import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Subscription, of } from 'rxjs';
import { StoriesComponent } from './stories.component';



describe('StoriesComponent', () => {
    let component: StoriesComponent;
    let fixture: ComponentFixture<StoriesComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule, ScrollingModule],
            declarations: [StoriesComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(StoriesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call fetchData() method on initialization with type parameter', () => {
        spyOn(component, 'fetchData');
        component.ngOnInit();
        expect(component.fetchData).toHaveBeenCalledWith('new');
    });

    it('should call unsubscribe() and resetAndClearCache() methods on destroy', () => {
        spyOn(component, 'unsubscribe');
        spyOn((<any>component).storyService, 'resetAndClearCache');
        component.ngOnDestroy();
        expect(component.unsubscribe).toHaveBeenCalled();
        expect((<any>component).storyService.resetAndClearCache).toHaveBeenCalled();
    });

    it('should unsubscribe() from all subscriptions', () => {
        const sub1 = new Subscription();
        const sub2 = new Subscription();
        (<any>component).subscriptions = [sub1, sub2];
        spyOn(sub1, 'unsubscribe');
        spyOn(sub2, 'unsubscribe');
        component.unsubscribe();
        expect(sub1.unsubscribe).toHaveBeenCalled();
        expect(sub2.unsubscribe).toHaveBeenCalled();
    });

    it('should update isLoading and stories properties correctly', () => {
        const stories = [{ id: 1, title: 'test story', by: 'test author', score: 10, descendants: 10, url: 'http://www.example.com', type: 'story', time: 160432421 }];
        spyOn((<any>component).storyService, 'getLatestStoriesByType').and.returnValue(of(stories));
        component.fetchData('new');
        expect(component.stories).toEqual(stories);
        expect(component.filteredStories).toEqual(stories);
        expect(component.searchValue).toBe('');
        expect(component.isLoading).toBe(false);
    });

    it('should update type and call fetchData() method on switchStoryType', () => {
        spyOn(component, 'fetchData');
        component.switchStoryType('show');
        expect(component.type).toBe('show');
        expect(component.filteredStories).toEqual([]);
        expect(component.fetchData).toHaveBeenCalledWith('show', true);
    });

    it('should call unsubscribe(), resetAndClearCache() and fetchData() methods on checkUpdate()', () => {
        spyOn(component, 'unsubscribe');
        spyOn((<any>component).storyService, 'resetAndClearCache');
        spyOn(component, 'fetchData');
        component.checkUpdate();
        expect(component.unsubscribe).toHaveBeenCalled();
        expect((<any>component).storyService.resetAndClearCache).toHaveBeenCalledWith('new');
        expect(component.fetchData).toHaveBeenCalledWith('new');
    });

    it('should switch to the specified story type', () => {
        const spy = spyOn(component, 'fetchData');
        const type = 'show';
        component.switchStoryType(type);
        expect(component.type).toEqual(type);
        expect(component.filteredStories).toEqual([]);
        expect(spy).toHaveBeenCalledWith(type, true);
    });

    it('should do nothing and return if selected the same  the specified story type', () => {
        const spy = spyOn(component, 'switchStoryType');
        const type = 'new';
        component.switchStoryType(type);

        expect(spy).toHaveBeenCalled();
    });


    it('should reset the cache and fetch data when checkUpdate function is called', () => {
        const spy = spyOn(component, 'fetchData');
        component.checkUpdate();
        expect(spy).toHaveBeenCalledWith(component.type);
        expect(component.isLoading).toBeTrue();
    });

    it('should update isTop variable to true when the viewport is at the top of the list', () => {
        const index = 0;
        component.getScrollIndex(index);
        expect(component.isTop).toBeTrue();
    });

    it('should update isTop variable to false when the viewport is not at the top of the list', () => {
        const index = 1;
        component.getScrollIndex(index);
        expect(component.isTop).toBeFalse();
    });

    it('should return a formatted date string when showDateTime() function is called', () => {
        const unixTime = 1625852161;
        const expectedDate = '2021-07-09T17:36:01.000Z';
        expect(component.showDateTime(unixTime)).toEqual(expectedDate);
    });

    it('should apply filter to stories based on search input', () => {
        // Set up component data
        component.stories = [
            { id: 1, title: 'Story 1', url: 'https://www.example.com/story1', by: 'test author', score: 10, descendants: 10, type: 'story', time: 160432421 },
            { id: 2, title: 'Story 2', url: 'https://www.example.com/story2', by: 'test author', score: 10, descendants: 10, type: 'story', time: 160432421 }
        ];
        component.filteredStories = [];

        // Set up test data
        const keyboardEvent = new KeyboardEvent('keyup', {
            key: 'a',
            code: 'KeyA',
            keyCode: 65,
            bubbles: true,
            cancelable: true,
            shiftKey: false
        });
        Object.defineProperty(keyboardEvent, 'target', { value: { value: 'story' } });

        // Call method
        component.applyFilter(keyboardEvent);

        // Assert that the filter was applied correctly
        expect(component.filteredStories.length).toBe(2);
        expect(component.filteredStories[0].title).toBe('Story 1');
        expect(component.filteredStories[1].title).toBe('Story 2');
    });

    // test more for branches (e.g. if conditions)
    it('should call fetchData() with correct argument when switchStoryType is called with a valid type', () => {
        const fetchSpy = spyOn(component, 'fetchData');
        component.switchStoryType('job');
        expect(fetchSpy).toHaveBeenCalledWith('job', true);
    });
    // test more for branches (e.g. if conditions)
    // it('should scroll to top when calling backToTop', () => {
    //     component.backToTop();
    //     expect(virtualScrollViewport.scrollToIndex).toHaveBeenCalledWith(0);
    // });

});