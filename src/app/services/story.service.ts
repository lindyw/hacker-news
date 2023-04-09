import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, bufferCount, from, mergeMap, scan, shareReplay } from 'rxjs';
import { Story } from '../interfaces/story.interface';

@Injectable({
    providedIn: 'root'
})
export class StoryService {

    // hackerAPI url
    private BASE_URL = `https://hacker-news.firebaseio.com/v0`;

    constructor(
        private http: HttpClient
    ) { }

    public getNewStories() {
        return this.http.get<number[]>(`${this.BASE_URL}/newstories.json`)
            .pipe(
                mergeMap((ids: number[]) => from(ids)),
                mergeMap((id: number) => this.getStoryById(id)),
                bufferCount(30),
                scan((acc: Story[], stories: Story[]) => [...acc, ...stories], []),
                shareReplay(1)
            );
    }

    getStoryById(id: number): Observable<Story> {
        return this.http.get<Story>(`${this.BASE_URL}/item/${id}.json`)
    }

}
