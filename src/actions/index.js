import { ADD_COMMENT, REMOVE_COMMENT } from '../constants/actions'

export function addComment(post = {}) {
    return async dispatch => {
        if(Object.keys(post).length > 0) {
            dispatch({ type: ADD_COMMENT, value: post});
        }
    }
}

export function removeComment(key = '') {
    return async dispatch => {
        if(key !== '') {
            dispatch({ type: REMOVE_COMMENT, value: key});
        }
    }
}