export const signInUser = async (token, name, email) => {
  const validateResponse = await fetch(`/api/v1/authenticate?token=${token}&name=${name}&email=${email}`);
  const validate = await validateResponse.json();

  return validate;
};

export const getTwitterActions = async () => {
  const twitterFetch = await fetch('/api/v1/twitter_actions');
  const twitterActions = await twitterFetch.json();
  return twitterActions.results;
};

export const getFacebookActions = async () => {
  const facebookFetch = await fetch('/api/v1/facebook_actions');
  const facebookActions = await facebookFetch.json();
  return facebookActions.results;
};

export const getEmailActions = async () => {
  const emailFetch = await fetch('/api/v1/email_actions');
  const emailActions = await emailFetch.json();
  return emailActions.results;
};

export const getPhoneActions = async () => {
  const phoneFetch = await fetch('/api/v1/phone_actions');
  const phoneActions = await phoneFetch.json();
  return phoneActions.results;
};

export const getCompletedActions = async(id, token) => {
  const completedFetch = await fetch(`/api/v1/users/actions/${id}?token=${token}`);
  const completedActions = await completedFetch.json();

  return completedActions.actions;
}

export const postAction = async (action, type, token) => {
  const actionPost = await fetch(`/api/v1/${type}_actions?token=${token}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(action)
  });
  const actionID = await actionPost.json();

  return actionID;
}

export const postActionContent = async (type, token, actionID, content) => {
  const contentPost = await fetch(`/api/v1/${type}_contents?token=${token}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ action_id: actionID.id, content })
  });
  const contentID = await contentPost.json();

  return contentID;
}

export const patchAction = async (type, actionId, token, action) => {
  return await fetch(`/api/v1/${type}_actions/${actionId}?token=${token}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(action)
  });
}

export const getActionLog = async () => {
  const actionLogFetch = await fetch('/api/v1/actions');
  const actionLog = await actionLogFetch.json();

  return actionLog;
}

export const patchPreferences = async (id, id_token, updates) => {
  return await fetch(`/api/v1/users/${id}?token=${id_token}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updates)
  });
}