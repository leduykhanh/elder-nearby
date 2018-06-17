/*
 *
 * Login actions
 *
 */

import {
  DEFAULT_ACTION,
  LOGIN_ACTION,
  LOGIN_ACTION_SUCCESS,
  LOGIN_ACTION_ERROR
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loginAction(email, password, callback) {

  return {
    type: LOGIN_ACTION,
    payload: {email, password},
    callback,
  };
}

export function loginSuccess(data) {
  return {
    type: LOGIN_ACTION_SUCCESS,
    payload: data
  };
}

export function loginError(error) {
  return {
    type: LOGIN_ACTION_ERROR,
    error
  };
}
