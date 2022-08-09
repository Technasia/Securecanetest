const { getPositionFromNMEA } = require('../utils/tracker.utils');

// This test fails because 1 !== 2
it('Testing getPositionFromNMEA', () => {
  expect(getPositionFromNMEA('$GNRMC,193321.000,A,4858.509355,N,00221.244126,E,0.00,0.00,041021,,,A*75')).toStrictEqual({ lat: 48.975155, lng: 2.354068 })
})