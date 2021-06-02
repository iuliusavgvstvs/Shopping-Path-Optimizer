import {
  SIGNUP_STARTED,
  SIGNUP_SUCCEEDED,
  SIGNUP_FAILED,
  LOGIN_STARTED,
  LOGIN_SUCCEEDED,
  LOGIN_FAILED,
} from '../actions/authActions';

const initialState = {
  isLoading: false,
  error: null,
  token: null,
  userId: null,
  userEmail: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_STARTED:
      return {
        ...state,
        isLoading: true,
        error: null,
        token: null,
        userId: null,
        userEmail: null,
      };
    case LOGIN_SUCCEEDED:
      return {
        ...state,
        token: action.payload.token,
        userId: action.payload.userId,
        userEmail: action.payload.userEmail,
        isLoading: false,
        error: null,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        isLoading: false,
        token: null,
        userId: null,
        userEmail: null,
        error: action.payload,
      };
    case SIGNUP_STARTED:
      return {
        ...state,
        isLoading: true,
      };
    case SIGNUP_SUCCEEDED:
      return {
        ...state,
        token: action.payload.token,
        userId: action.payload.userId,
        userEmail: action.payload.userEmail,
        isLoading: false,
      };
    case SIGNUP_FAILED:
      return {
        ...state,
        isLoading: false,
        token: null,
        userId: null,
        userEmail: null,
        error: action.payload.error,
      };
    default:
      return state;
  }
};
