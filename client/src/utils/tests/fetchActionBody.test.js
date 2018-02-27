import fetchActionBody from '../fetchActionBody';

window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
  json: () => 
    Promise.resolve(
      {
        results: [
          { action_id: 3 }
        ]
      }
    )   
}));

describe.skip('fetchActionBody util function', () => {
  it('should fetch action contents', () => {
    // const tables = ['facebook', 'twitter', 'email', 'phone'];
    const mockAction = {
      id: 3, 
    };

    const expectedResult = fetchActionBody('facebook', mockAction)
    .then(result => {
      return result;
    });
    expect(expectedResult).toEqual();
  })
})