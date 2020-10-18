import {call, put, takeLatest} from 'redux-saga/effects';
import request from '../utils/request';
import {getData } from '../actions';
import * as constants from '../constants/actionTypes';


function* getDataSaga() {
    try {
      yield put({
        type: constants.INIT_LOADER,
      });
      //const requestURL = `https://aduanas.lytica.ai/api/documentos/upload/`;
      const requestURL = `https://c6c5edcccef4.ngrok.io/documentos/upload/`;

      const response = yield call(request, requestURL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response) {
        console.log(response)
        yield put({
            type: constants.GET_DATA_SUCCESS,
            response,
        });
      }
    } catch (error) {
      yield put({
        type: constants.GET_DATA_FAILED,
      });
    }
    yield put({
      type: constants.END_LOADER,
    });
  }

function* saveArchiveSaga(actions) {
    const file = actions.file[0];
    const formData = new FormData();
    formData.append(`documento`, file);
    try {
      //const requestURL = `https://aduanas.lytica.ai/api/documentos/upload/`;
      // Replace request url with the endpoint url
      const requestURL = `https://c6c5edcccef4.ngrok.io/documentos/upload/`
      const response = yield call(request, requestURL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      });
      if (response) {
        console.log(response)
        yield put(getData());
        yield put({
          type: constants.SAVE_ARCHIVE_SUCCESS,
          response,
        });
      }
    } catch (error) {
      yield put({
        type: constants.SAVE_ARCHIVE_FAILED,
        error,
      });
    }
  }

function* processArchiveSaga(actions) {
    yield put({
      type: constants.INIT_LOADER,
    });
    try {
      const requestURL = `https://aduanas.lytica.ai/api/documentos/process/${actions.id}`;
      const response = yield call(request, requestURL, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
        },
    });
      if (response) {
        const dataResponse = Object.assign(response, {id: actions.id});
        yield put({
          type: constants.PROCESS_ARCHIVE_SUCCESS,
          dataResponse,
        });
      }
    } catch (error) {
      yield put({
        type: constants.PROCESS_ARCHIVE_FAILED,
        error,
      });
    }
    yield put({
      type: constants.END_LOADER,
    });
  }

const archiveSagas = [
  takeLatest(constants.GET_DATA_INIT, getDataSaga),
  takeLatest(constants.SAVE_ARCHIVE_INIT, saveArchiveSaga),
  takeLatest(constants.PROCESS_ARCHIVE_INIT, processArchiveSaga),
];

export default archiveSagas;