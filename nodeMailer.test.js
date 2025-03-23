const { after } = require('node:test');
const { sum } = require('./public/nodeMailer');



afterEach(() => {
    console.log('afterEach');
})

    it('should sum 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
    });
