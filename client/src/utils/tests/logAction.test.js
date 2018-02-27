import logAction from '../logAction';

window.fetch = jest.fn().mockImplementation(() => 
  Promise.resolve({ 
  })
);

describe('logAction util function', () => {
  it('should post to the action log', () => {
    const mockUser = { 
      id_token: 'ashgei29483jngsdg', 
      id: 2 
    };
    const mockAction = {
      id: 3, 
    };

    const expectedResult = logAction('facebook', mockUser, mockAction, 'mock description');
    expect(expectedResult).toEqual(Promise.resolve());
  })
})