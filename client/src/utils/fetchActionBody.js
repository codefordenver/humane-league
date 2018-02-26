const fetchActionBody = async (contentsTable, action) => {
  const actionBodiesFetch = await fetch(`/api/v1/${contentsTable}`);
  const actionBodies = await actionBodiesFetch.json();

  const bodies = actionBodies.results.filter(body => body.action_id === action.id);
  const body = bodies[Math.floor(Math.random() * bodies.length)];

  return body.content;
};

export default fetchActionBody;