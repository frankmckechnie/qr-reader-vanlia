import utils from '../src/js/utils';

test('test get a random Int From Range', () => {
    const value = utils.randomIntFromRange(1,5);
    expect(value).toBeGreaterThanOrEqual(1);
    expect(value).toBeLessThanOrEqual(5);
});