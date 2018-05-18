import createApiRequest from '../../utils/createApiRequest';

export function fetchUser() {
  return {
    type: 'FETCH_USER',
    promise: createApiRequest('api/current_user', 'GET')
  };
}

export function registerUser(type, userData) {
  return {
    type: 'REGISTER_USER',
    promise: createApiRequest('api/auth/register', 'POST', userData)
  };
}

// export function signinUser() {
//   return {
//     type: 'SIGNIN_USER',
//     promise: createApiRequest('api/auth/signin', 'POST')
//   };
// }

export function signinUser(type, userData) {
  return {
    type: 'SIGNIN_USER',
    promise: createApiRequest('api/auth/signin', 'POST', userData)
  };
}
