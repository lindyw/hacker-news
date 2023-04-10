import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, bufferCount, from, mergeMap, of, scan, take, tap } from 'rxjs';
import { Story, StoryType } from '../interfaces/story.interface';

@Injectable({
    providedIn: 'root'
})
export class StoryService {

    public updateTimeStamp: { [type: string]: Date } = {};

    private story_cache = new Map<string, Story[]>();
    private total_cache = new Map<string, number>();


    // hackerAPI url
    private BASE_URL = `https://hacker-news.firebaseio.com/v0`;

    constructor(
        private http: HttpClient
    ) {
        this.init()
    }

    init() {
        // fetch other type of stores ids for length and cache
        this.getLatesetStoryIDsByType('ask');
        this.getLatesetStoryIDsByType('show');
        this.getLatesetStoryIDsByType('job');
    }
    /**
     * Fetch Latest 500 new stories or 200 Ask HN, Show HN or Job Stories 
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
                tap((ids: number[]) => {
                    if (!this.total_cache.has(type)) {
                        this.total_cache.set(type, ids.length);
                    }
                    this.updateTimeStamp[type] = new Date();
                }),
                mergeMap((ids: number[]) => from(ids)),
                mergeMap((id: number) => this.getStoryById(id)),
                bufferCount(50),
                scan((acc: Story[], stories: Story[]) => [...acc, ...stories], [])
            )
    }

    public getLatesetStoryIDsByType(type: StoryType): Observable<number[]> {
        const uri = `${this.BASE_URL}/${type}stories.json`;
        const response = this.http.get<number[]>(uri);

        response
            .pipe(
                take(1),
                tap(ids => {
                    if (!this.total_cache.has(type)) {
                        this.total_cache.set(type, ids.length);
                    }
                    console.log(this.total_cache.get(type))
                })).subscribe()

        return response;
    }

    public getStoriesCount(type: StoryType) {
        return this.total_cache.get(type)!;
    }

    public setStoryCacheByType(type: StoryType, stories: Story[]) {
        this.story_cache.set(type, stories);
    }

    public clearCache() {
        this.story_cache.clear();
        this.total_cache.clear();
    }

    private getStoryById(id: number): Observable<Story> {
        return this.http.get<Story>(`${this.BASE_URL}/item/${id}.json`)
    }


}
