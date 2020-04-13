/* eslint-disable prettier/prettier */
/**
 * 액션 타입, 액션 생성자, redux-thunk, immer 예제
 */
import {createAction, handleActions} from 'redux-actions';
import {produce} from 'immer';
import api from '../../../utils/api';
import axios from 'axios';
import {parseString} from 'xml2js';
import config from '../../../configs/config';
import {
  getData,
  storeData,
  removeData,
  removeAllData,
} from '../../../utils/util';

const SUBSCRIBER_LIST = 'hospital/SUBSCRIBER_LIST';

const subscriberListAction = createAction(SUBSCRIBER_LIST);

const initState = {
  // 내가 즐겨찾는 병원(즐겨찾기 리스트)
  subscriber_list: [],
};

// 병원 즐겨찾기 추가 및 삭제
export const updateHospitalSubscriber = hpid => async dispatch => {
  try {
    const token = await getData('token');

    const jsonData = await api.put(`/hospitalSubscriber/hpid/${hpid}`, {
      token: token,
    });

    console.log(jsonData);
    return true;
  } catch (err) {
    console.log('error');
    return false;
  }
};

// 병원 즐겨찾기 리스트 조회
export const getAllHospitalSubscribers = () => async dispatch => {
  try {
    const token = await getData('token');

    const jsonData = await api.get(`/allHospitalSubscriber`, {
      token: token,
    });

    // await dispatch(subscriberListAction(jsonData.result));
    console.log(jsonData.result.rows);
    return true;
  } catch (err) {
    console.log('error');
    return false;
  }
};

export default handleActions(
  {
    [SUBSCRIBER_LIST]: (state, {payload}) =>
      produce(state, draft => {
        draft.subscriber_list = payload;
      }),
  },
  initState,
);
