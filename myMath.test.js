const MyMath = require('./myMath');

describe('MyMath class tests', () => {

    const myMath = new MyMath();

    describe('MyMath sum method', () => {
        it('Should exist', () => {
            expect(myMath.sum).toBeDefined(); 
        })

        it('Should return a result when adding two positive integers', () => {
            expect(myMath.sum(1, 1)).toBe(2);
        })

        it('Should return a result when adding two negative integers', () => {
            expect(myMath.sum(-1, -1)).toBe(-2);
        })

        it('Should throw when summing an integer with a string', () => {
            expect(() => myMath.sum(-1, "abcd")).toThrow(TypeError);
        })
    })
})