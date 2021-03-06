import { createAction, handleActions, combineActions } from 'redux-actions';
import { fromJS, List } from 'immutable';
import { objectToArray } from '../../../function';
import indexReducer, * as indexAction from './index';

/* 使用immutable初始化基础数据 */
const initData: {
  index: Object,
  downloadList: Immutable.List
} = {
  index: {},
  downloadList: List([])
};

/* Action */
export const downloadList: Function = createAction('公演下载列表');

/* reducer */
const reducer: Function = handleActions({
  [combineActions(...objectToArray(indexAction))]: ($$state: Immutable.Map, action: Object): Immutable.Map=>{
    return $$state.set('index', indexReducer($$state.get('index'), action));
  },
  [downloadList]: ($$state: Immutable.Map, action: Object): Immutable.Map=>{
    return $$state.set('downloadList', List(action.payload.downloadList));
  }
}, fromJS(initData));

export default {
  liveDownload: reducer
};