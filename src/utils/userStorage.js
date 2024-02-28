// Function to get user data from local storage
/* eslint-disable no-console */
const getUserData = () => {
  const userData = JSON.parse(localStorage.getItem('user'));
  return userData || null;
};

// Function to get user ID
const getUserId = () => {
  const userData = getUserData();
  return userData?.id || null;
};

// Function to get user role
const getUserRole = () => {
  const userData = getUserData();
  return userData?.type || null;
};

// Function to get user name
const getUserName = () => {
  const userData = getUserData();
  return userData?.username || null;
};

const getUserEmail = () => {
  const userData = getUserData();
  return userData?.email || null;
};

// Function to get token
const getToken = () => {
  const userData = getUserData();
  console.log('Get token', userData?.token);
  return userData?.token || null;
};

export {
  getUserData,
  getUserId,
  getUserRole,
  getUserName,
  getUserEmail,
  getToken,
};
