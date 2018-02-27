import Placeholder from '../Placeholder';
// import * as actions from '../../Actions';

describe.skip('Placeholder reducer tests', () => {
  it('returns the correct default state', () => {
    const expectedState = {};

    expect(Placeholder(undefined, {})).toEqual(expectedState);
  });
});