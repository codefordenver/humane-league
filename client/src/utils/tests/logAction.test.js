import logAction from '../logAction';

window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
  json: () => 
    Promise.resolve(
      { results: {
          // twitter: [mockAction, mockAction],
          // facebook: [mockAction, mockAction],
          // email: [mockAction, mockAction],
          // phone: [mockAction, mockAction]
        }
      }
    )   
}));

describe.skip('logAction util function', () => {
  it('should post to the action log', () => {
    expect(logAction()).toEqual();
  })
})