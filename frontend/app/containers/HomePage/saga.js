import { call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_DATA, NEW_DATA } from 'containers/HomePage/constants';
import { dataLoaded, dataLoadingError } from 'containers/HomePage/actions';

import request from 'utils/request';

// const BASE_URL = 'http://localhost:8000';
const BASE_URL = 'http://206.189.40.141:8000';

export function* getData(action) {
  const requestURL = `${BASE_URL}/tweet/data`;

  try {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const data = yield call(request, requestURL, options);
    action.callback && action.callback(data);

    yield put(dataLoaded(data.data));
  } catch (err) {
    yield put(dataLoadingError(err.response));
  }
}

export function* addMessages(action) {
  const requestURL = `${BASE_URL}/tweet/add_message`;

  try {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(action.payload),
    };
    const data = yield call(request, requestURL, options);
    action.callback && action.callback(data);

    yield put(dataLoaded(data.data));
  } catch (err) {
    yield put(dataLoadingError(err.response));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* hompageSaga() {
  yield takeLatest(LOAD_DATA, getData);
  yield takeLatest(NEW_DATA, addMessages);
}
