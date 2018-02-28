import fetchActionBody from '../fetchActionBody';

window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
  json: () => 
    Promise.resolve(
      {
        results: [
          { action_id: 3, content: 'test action' }
        ]
      }
    )   
}));

describe('fetchActionBody util function', () => {
  it('should fetch action contents', async () => {
    // const tables = ['facebook', 'twitter', 'email', 'phone'];
    const mockAction = {
      id: 3
    };

    const expectedResult = await fetchActionBody('facebook', mockAction);

    expect(expectedResult).toEqual('test action');
  });
});