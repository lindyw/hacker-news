import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { StoryService } from './story.service';
import { StoryType } from '../interfaces/story.interface';

describe('StoryService', () => {
    let service: StoryService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [StoryService]
        });
        service = TestBed.inject(StoryService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
        service.clearCache();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should fetch latest stories by type from cache', () => {
        const type: StoryType = 'new';
        const mockStories = [{ id: 1, title: 'test story', by: 'test author', score: 10, descendants: 10, url: 'http://www.example.com', type: 'story', time: 160432421 }];
        service.setStoryCacheByType(type, mockStories);

        spyOn(service['http'], 'get').and.returnValue(of([]));

        service.getLatestStoriesByType(type, true).subscribe((stories) => {
            expect(stories).toEqual(mockStories);
            expect(service['http'].get).not.toHaveBeenCalled();
        });
    });

 
    it('should set story cache by type', () => {
        const type: StoryType = 'new';
        const mockStories = [{ id: 1, title: 'test story', by: 'test author', score: 10, descendants: 10, url: 'http://www.example.com', type: 'story', time: 160432421 }];

        service.setStoryCacheByType(type, mockStories);
        expect(service['story_cache'].get(type)).toEqual(mockStories);
    });

    it('should set IDs cache by type', () => {
        const type: StoryType = 'new';
        const mockIds = [1];

        service.setIdsCacheByType(type, mockIds);
        expect(service['id_cache'].get(type)).toEqual(mockIds);
    });

    describe('getLatestStoriesByType', () => {
        it('should return an Observable<Story[]>', () => {
            const dummyStories = [
                { id: 1, title: 'Story 1', url: 'https://www.example.com/story1', by: 'test author', score: 10, descendants: 10, type: 'story', time: 160432421 },
                { id: 2, title: 'Story 2', url: 'https://www.example.com/story2', by: 'test author', score: 10, descendants: 10, type: 'story', time: 160432421 }
            ];

            service.getLatestStoriesByType('new').subscribe(stories => {
                expect(stories.length).toBe(2);
                expect(stories).toEqual(dummyStories);
            });

            const req = httpMock.expectOne(`https://hacker-news.firebaseio.com/v0/newstories.json`);
            expect(req.request.method).toBe('GET');
            req.flush([1, 2]);

            dummyStories.forEach((story, index) => {
                const storyReq = httpMock.expectOne(`https://hacker-news.firebaseio.com/v0/item/${story.id}.json`);
                expect(storyReq.request.method).toBe('GET');
                storyReq.flush(dummyStories[index]);
            });

            service.clearCache();
        });

        it('should return cached stories when useCache is true', () => {
            const dummyStories = [
                { "by": "courseofaction", "descendants": 6, "id": 35506435, "kids": [35507404, 35507382, 35507381, 35507395, 35507227, 35506897, 35506600], "score": 8, "text": "Are you feeling crippled in the AI research &amp; development space without GPT-4 (API) access?<p>Have any independent researchers here managed to get access? What was the app you were developing?<p>My interest is that two projects of mine, one solo health-related project (being trialed informally by an interested professional), and one as research for a medium-sized entertainment company, have not received ClosedAI&#x27;s blessings. I feel I&#x27;m practically out of the game until access is granted, struggling with flint and tinder while the competition is cooking with gas.<p>What can those of us without access do in the mean time?", "time": 1681074082, "title": "Ask HN: Do you have GPT-4 access?", "type": "story" }
            ];

            service.setStoryCacheByType('ask', dummyStories);

            service.getLatestStoriesByType('ask', true).subscribe(stories => {
                expect(stories.length).toBe(1);
                expect(stories).toEqual(dummyStories);
            });

            httpMock.expectNone(`https://hacker-news.firebaseio.com/v0/askstories.json`);

            service.clearCache();
        });
    });

    describe('getLatesetStoryIDsByType', () => {
        it('should return an Observable<number[]>', () => {
            const dummyIDs = [1, 2, 3];

            service.getLatesetStoryIDsByType('new').subscribe(ids => {
                expect(ids.length).toBe(3);
                expect(ids).toEqual(dummyIDs);
            });

            const req = httpMock.expectOne(`https://hacker-news.firebaseio.com/v0/newstories.json`);
            expect(req.request.method).toBe('GET');
            req.flush(dummyIDs);

            service.clearCache();
        });
    });
});