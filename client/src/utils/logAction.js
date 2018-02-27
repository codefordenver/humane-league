const logAction = async (actionType, user, action, feedback) => {
  const actionLogPost = await fetch(`/api/v1/actions?token=${user.id_token}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user_id: user.id,
      action_id: action.id,
      action_type: actionType,
      action_title: action.title,
      description: feedback
    })
  });
};

export default logAction;