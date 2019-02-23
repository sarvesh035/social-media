import { ADD_COMMENT, REMOVE_COMMENT } from '../constants/actions';

let initialState = [{
    name: 'John Doe',
    comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    date: new Date()
}];

export function commentsReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_COMMENT:
            return [action.value, ...state];

        case REMOVE_COMMENT:
            state.splice(action.value, 1);
            return state;

        default:
            return state;
    }
}