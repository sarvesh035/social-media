import { combineReducers } from 'redux';
import { commentsReducer } from './commentsReducer';

const Reducers = combineReducers({
    comments: commentsReducer
});

export default Reducers;