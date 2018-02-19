export const signInUser = async (token, name, email) => {
  const validateResponse = await fetch(`/api/v1/authenticate?token=${token}&name=${name}&email=${email}`);
  const validate = await validateResponse.json();

  return validate;
};