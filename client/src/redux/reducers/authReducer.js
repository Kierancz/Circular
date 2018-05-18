import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  SIGNIN_USER_REQUEST,
  SIGNIN_USER_SUCCESS,
  SIGNIN_USER_FAILURE
} from '../constants/auth';

export default function (state = {}, action) {
  const { response, error, type } = action;
  switch (type) {
    case FETCH_USER_REQUEST:
      return {
        ...state
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        ...response.data
      };
    case FETCH_USER_FAILURE:
      return {
        ...state,
        error
      };
    case LOG_OUT_REQUEST:
      return {
        ...state
      };
    case LOG_OUT_SUCCESS:
      return {
        ...state,
        ...response.data
      };
    case LOG_OUT_FAILURE:
      return {
        ...state,
        error
      };
    case REGISTER_USER_REQUEST:
      return {
        ...state
      };
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        ...response.data
      };
    case REGISTER_USER_FAILURE:
      return {
        ...state,
        error
      };
    case SIGNIN_USER_REQUEST:
      return {
        ...state
      };
    case SIGNIN_USER_SUCCESS:
      return {
        ...state,
        ...response.data
      };
    case SIGNIN_USER_FAILURE:
      return {
        ...state,
        error
      };
    default:
      return state;
  }
}
