import Placeholder from '../Placeholder';
// import * as actions from '../../Actions';

describe('Placeholder reducer tests', () => {
  it('returns the correct default state', () => {
    const expectedState = {Data: 'String'};

    expect(Placeholder(undefined, {})).toEqual(expectedState);
  });
});