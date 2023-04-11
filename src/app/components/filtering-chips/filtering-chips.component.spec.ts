import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatChipsModule } from '@angular/material/chips';

import { FilteringChipsComponent } from './filtering-chips.component';

describe('FilteringChipsComponent', () => {
    let component: FilteringChipsComponent;
    let fixture: ComponentFixture<FilteringChipsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FilteringChipsComponent],
            imports: [MatChipsModule]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FilteringChipsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });


    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should update the current selection when a chip is clicked', () => {
        const chip = fixture.nativeElement.querySelector('.mat-chip:nth-child(2)'); // select the second chip
        chip.dispatchEvent(new Event('click')); // click the chip

        expect(component.currentSelection).toEqual(2);
    });

    it('should emit the correct story type when a chip is clicked', () => {
        spyOn(component.storyType, 'emit');

        const chip = fixture.nativeElement.querySelector('.mat-chip:nth-child(3)'); // select the third chip
        chip.dispatchEvent(new Event('click')); // click the chip

        expect(component.storyType.emit).toHaveBeenCalledWith('show');
    });

    it('should update chipSelections correctly when a chip is clicked', () => {
        const chip = fixture.nativeElement.querySelector('.mat-chip:nth-child(4)'); // select the fourth chip
        chip.dispatchEvent(new Event('click')); // click the chip

        expect(component.chipSelections[1].selected).toBeFalse();
        expect(component.chipSelections[4].selected).toBeTrue();
    });
});


