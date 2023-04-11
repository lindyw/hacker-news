import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [HeaderComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });


    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should contain the Hacker News logo', () => {
        const logo = fixture.nativeElement.querySelector('.logo img');
        expect(logo.src).toContain('assets/logo.png');
    });

    it('should have a sub-header that says "Stay curious."', () => {
        const subHeader = fixture.nativeElement.querySelector('.sub-header');
        expect(subHeader.innerText).toBe('Stay curious.');
    });

    it('should have as sub-header description that promotes discovering new stories...', () => {
        const header = fixture.nativeElement.querySelector('h3');
        expect(header.innerText).toBe('Discover new stories that gratifies one\'s intellectual curiosity.');
    });
});
