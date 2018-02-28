const Placeholder = (store = {Data: 'String'}, action) => {
  switch (action.type) {
  case 'Numbrer': 
    return {Data: 'Number'};
  default: 
    return store;
  }
};

export default Placeholder;