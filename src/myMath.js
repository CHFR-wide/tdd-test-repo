module.exports = class MyMath {
  sum (a, b) {
    if (isNaN(a) || isNaN(b)) throw new TypeError('Received NaN')

    return a + b
  }
}
