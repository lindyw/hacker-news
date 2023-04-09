import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, bufferCount, from, mergeMap, of, scan } from 'rxjs';
import { Story, StoryType } from '../interfaces/story.interface';

@Injectable({
    providedIn: 'root'
})
export class StoryService {

    // TODO: implement a cache for stories
    private story_cache = new Map<string, Story[]>();
    private id_cache = new Map<string, number[]>();

    // hackerAPI url
    private BASE_URL = `https://hacker-news.firebaseio.com/v0`;

    constructor(
        private http: HttpClient
    ) { }

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
                mergeMap((ids: number[]) => from(ids)),
                mergeMap((id: number) => this.getStoryById(id)),
                bufferCount(30),
                scan((acc: Story[], stories: Story[]) => [...acc, ...stories], [])
            )
    }

    public getLatesetStoryIDsByType(type: StoryType): Observable<number[]> {
        const uri = `${this.BASE_URL}/${type}stories.json`;
        return this.http.get<number[]>(uri);
    }

    public setStoryCacheByType(type: StoryType, stories: Story[]) {
        this.story_cache.set(type, stories);
    }

    public setIdsCacheByType(type: StoryType, ids: number[]) {
        this.id_cache.set(type, ids);
    }


    public clearCache() {
        this.story_cache.clear();
        this.id_cache.clear();
    }

    private getStoryById(id: number): Observable<Story> {
        return this.http.get<Story>(`${this.BASE_URL}/item/${id}.json`)
    }


}
