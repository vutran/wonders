const { flatten } = require('../lib/utils');

describe('utils', () => {
    it('should flatten a multi-dimensional array', () => {
        const a = [1, [2, 3], [[4, 5], 6], [[[7, 8], [], 9], 10], 11];
        expect(flatten(a))
            .toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
    });
    it('should flatten another multi-dimensional array', () => {
        const a = ['foo', ['bar'], [['john', 'smith']], null, 2, true, false];
        expect(flatten(a))
            .toEqual(['foo', 'bar', 'john', 'smith', null, 2, true, false]);
    });
});
