import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import TwitterCard from './TwitterCard';
import FacebookCard from './FacebookCard';
import EmailCard from './EmailCard';
import PhoneCard from './PhoneCard';

describe('TwitterCard component tests', () => {
  let renderedTwitterCard;
  let mockAction;
  let mockUser;
  let defaultState;
  beforeEach(() => {
    mockAction = {};
    mockUser = {};
    renderedTwitterCard = shallow( <TwitterCard action={mockAction} user={mockUser}/> );
    defaultState = {
      actionBody: null
    }
  })
  it('renders without crashing', () => {
    expect(renderedTwitterCard).toBeDefined();
    expect(renderedTwitterCard.state()).toEqual(defaultState);
  });
  it('matches SnapShot', () => {
    expect(renderedTwitterCard).toMatchSnapshot();
  })
  
})

describe('FacebookCard component tests', () => {
  let renderedFacebookCard;
  let mockAction;
  let mockUser;
  let defaultState;
  beforeEach(() => {
    mockAction = {};
    mockUser = {};
    renderedFacebookCard = shallow( <FacebookCard action={mockAction} user={mockUser}/> );
    defaultState = {
      actionBody: null
    };
  })
  it('renders without crashing', () => {
    expect(renderedFacebookCard).toBeDefined();
    expect(renderedFacebookCard.state()).toEqual(defaultState);
  });
  it('matches SnapShot', () => {
    expect(renderedFacebookCard).toMatchSnapshot();
  });
  
})

describe('EmailCard component tests', () => {
  let renderedEmailCard;
  let mockAction;
  let mockUser;
  let defaultState;
  beforeEach(() => {
    mockAction = {};
    mockUser = {};
    renderedEmailCard = shallow( <EmailCard action={mockAction} user={mockUser}/> );
    defaultState = {
      actionBody: null,
      showContent: false
    };
  });
  it('renders without crashing', () => {
    expect(renderedEmailCard).toBeDefined();
    expect(renderedEmailCard.state()).toEqual(defaultState);
  });
  it('matches SnapShot', () => {
    expect(renderedEmailCard).toMatchSnapshot();
  });
  
})

describe('PhoneCard component tests', () => {
  let renderedPhoneCard;
  let mockAction;
  let mockUser;
  let defaultState;
  beforeEach(() => {
    mockAction = {};
    mockUser = {};
    renderedPhoneCard = shallow( <PhoneCard action={mockAction} user={mockUser}/> );
    defaultState = {
      actionBody: null
    };
  });
  it('renders without crashing', () => {
    expect(renderedPhoneCard).toBeDefined();
    expect(renderedPhoneCard.state()).toEqual(defaultState);
  });
  it('matches SnapShot', () => {
    expect(renderedPhoneCard).toMatchSnapshot();
  });
})