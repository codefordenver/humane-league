import * as apiCalls from '../apiCalls';

const testData = [
  { name: 'signInUser', json: true, params: ['xyz', 'Thomas', '123@mail.com'], url: '/api/v1/authenticate?token=xyz&name=Thomas&email=123@mail.com', returning: '123', expectedRes: '123' },
  { name: 'getTwitterActions', json: true, params: [], url: '/api/v1/twitter_actions', returning: {results: ['action']},  expectedRes: ['action']},
  { name: 'getFacebookActions', json: true, params: [], url: '/api/v1/facebook_actions', returning: {results: ['action']},expectedRes: ['action']},
  { name: 'getEmailActions', json: true, params: [], url: '/api/v1/email_actions', returning: {results: ['action']},      expectedRes: ['action']},
  { name: 'getPhoneActions', json: true, params: [], url: '/api/v1/phone_actions', returning: {results: ['action']},      expectedRes: ['action']},
];

testData.map( fetch => {
  const methods = fetch.json ? {
    json: () => Promise.resolve(fetch.returning)
  } : fetch.returning;
  return (
    describe(`${fetch.name} fetch tests`, () => {
      beforeEach(() => {
        window.fetch=
          jest.fn().mockImplementation(() => 
            Promise.resolve(methods)
          );
      });
    
      it('fetch should be called with the correct params', () => {
        apiCalls[fetch.name](...fetch.params);
        expect(window.fetch).toHaveBeenCalledWith(fetch.url);
      });
    
      it('should return the expected response', async () => {
        const response = await apiCalls[fetch.name](...fetch.params);
        expect(response).toEqual(fetch.expectedRes);
      });
    
      it('should return an error when catching in the fetch request', async () => {
        window.fetch = 
          jest.fn().mockImplementation(() => Promise.reject({ status: 500 }));
        expect(await apiCalls[fetch.name](...fetch.params)).toEqual({status: 500});
      });
  }));
});