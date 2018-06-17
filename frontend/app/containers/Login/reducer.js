/*
 *
 * Login reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOGIN_ACTION_SUCCESS,
} from './constants';

const initialState = fromJS({});

function loginReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_ACTION_SUCCESS:
    console.log(action.payload)
      return state.set('email', action.payload.email)
                  .set('token', action.payload.token);
    default:
      return state;
  }
}

export default loginReducer;
