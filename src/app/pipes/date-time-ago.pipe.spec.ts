import { DateTimeAgoPipe } from './date-time-ago.pipe';

describe('DateTimeAgoPipe', () => {
    let date_pipe: DateTimeAgoPipe;
    beforeEach(() => {
        date_pipe = new DateTimeAgoPipe();
    });

    it('create an instance', () => {
        const pipe = new DateTimeAgoPipe();
        expect(pipe).toBeTruthy();
    });

    it('transforms date less than 30 seconds ago to "Just now"', () => {
        let now = new Date();
        const transformed = date_pipe.transform(now.toISOString());
        expect(transformed).toEqual('Just now');
    });

    it('transforms yesterday date to "1 day ago"', () => {
        let yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const transformed = date_pipe.transform(yesterday.toISOString());
        expect(transformed).toEqual('1 day ago');
    });

    it('transforms date before yesterday to "x days ago"', () => {
        let twoDaysAgo = new Date();
        twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
        const transformed = date_pipe.transform(twoDaysAgo.toISOString());
        expect(transformed).toEqual('2 days ago');
    });
});
