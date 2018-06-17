import { takeLatest, call, put, select } from 'redux-saga/effects';
import { loginSuccess, loginError } from './actions';
import {
  DEFAULT_ACTION,
  LOGIN_ACTION,
} from './constants';
// Individual exports for testing
import request from 'utils/request';

const BASE_URL = 'http://localhost:8080';

export function* login(action) {

  const requestURL = `${BASE_URL}/user/login`;

  try {
    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(action.payload),
    };
    const data = yield call(request, requestURL, options);
    action.callback && action.callback (data);
    console.log(action.callback);

    yield put(loginSuccess(data));
  } catch (err) {
    console.log(err);
    yield put(loginError(err.response));
  }
}
export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(LOGIN_ACTION, login);
}
