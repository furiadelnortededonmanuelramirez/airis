import { all } from 'redux-saga/effects';
import archive from './archive';

export default function* rootSaga() {
  yield all([
    ...archive,
  ]);
}
