import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatChip } from '@angular/material/chips';
import { StoryType } from 'src/app/interfaces/story.interface';

@Component({
    selector: 'nav-filtering-chips',
    templateUrl: './filtering-chips.component.html',
    styleUrls: ['./filtering-chips.component.scss']
})
export class FilteringChipsComponent implements OnInit {
    @Output() storyType = new EventEmitter<StoryType>();

    chipSelections: { [number: string]: { name: string, selected: boolean } } =
        {
            1: { name: 'New', selected: true },
            2: { name: 'Ask', selected: false },
            3: { name: 'Show', selected: false },
            4: { name: 'Job', selected: false }
        };

    currentSelection = 1;

    constructor() { }

    ngOnInit(): void {
    }

    public updateSelection(chip: MatChip) {
        const key = chip.value;
        this.chipSelections[`${this.currentSelection}`].selected = false;
        this.currentSelection = parseInt(key);
        this.chipSelections[`${this.currentSelection}`].selected = true;
        this.storyType.emit(this.chipSelections[`${this.currentSelection}`].name.toLowerCase() as StoryType);
    }

    public unsorted() { }

}
