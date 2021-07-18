import { takeLatest, put, call } from "redux-saga/effects";
import Axios from "axios";

//worker functions
function* workerFetchSuggestion() {
  try {
    const resp = yield call(
      Axios.get,
      "https://jsonplaceholder.typicode.com/users"
    );
    yield put();
  } catch (e) {
    yield put();
  }
}

//Watcher function
export function* watchFetchSuggestion() {
  yield takeLatest("FETCH_SUGGESTIONS_START", workerFetchSuggestion);
}
