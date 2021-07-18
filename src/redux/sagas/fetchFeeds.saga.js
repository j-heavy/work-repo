import { takeLatest, put, call } from "redux-saga/effects";
import Axios from "axios";

//worker functions
function* workerFetchFeeds() {
  try {
    const resp = yield call(Axios.get, "https://picsum.photos/v2/list");
    yield put();
  } catch (e) {
    yield put();
  }
}

//Watcher function
export function* watchFetchFeeds() {
  yield takeLatest("FETCH_FEEDS_START", workerFetchFeeds);
}
