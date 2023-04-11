import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, bufferCount, from, mergeMap, of, scan } from 'rxjs';
import { Story, StoryType } from '../interfaces/story.interface';

@Injectable({
    providedIn: 'root'
})
export class StoryService {
    private story_cache = new Map<string, Story[]>();
    private bufferSize: number = 50;

    // hackerAPI url
    private BASE_URL = `https://hacker-news.firebaseio.com/v0`;

    constructor(
        private http: HttpClient
    ) { }

    /**
     * Fetch Latest max 500 new stories or 200 max Ask HN, Show HN or Job Stories 
     * @param type type of stories (new, show, ask or job)
     * @param useCache use the fetched stories cache 
     * (if true, we look for any fetched stories in cache for that type of stories instead of fetching them again via API)
     */
    public getLatestStoriesByType(type: StoryType, useCache: boolean = false): Observable<Story[]> {
        if (useCache && this.story_cache.has(type)) {
            return of(this.story_cache.get(type)!);
        }
        const uri = `${this.BASE_URL}/${type}stories.json`;

        return this.http.get<number[]>(uri)
            .pipe(
                mergeMap((ids: number[]) => from(ids)),
                mergeMap((id: number) => this.getStoryById(id)),
                bufferCount(this.bufferSize),
                scan((acc: Story[], stories: Story[]) => [...acc, ...stories], [])
            )
    }

    public getStoryCacheByType(type: StoryType): Story[] | undefined {
        return this.story_cache.get(type);
    }

    public setStoryCacheByType(type: StoryType, stories: Story[]) {
        this.story_cache.set(type, stories);
    }

    public resetAndClearCache(type?: StoryType) {
        if (type) {
            this.story_cache.delete(type);
        } else {
            this.story_cache.clear();
        }
    }

    private getStoryById(id: number): Observable<Story> {
        return this.http.get<Story>(`${this.BASE_URL}/item/${id}.json`)
    }


}
