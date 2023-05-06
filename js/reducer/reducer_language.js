import Types from '../action/types';
import {FLAG_LANGUAGE} from "../expand/LanguageDao";

const defaultState = {
    languages: [],
    keys: []
};
export default function onAction(state = defaultState, action) {
    switch (action.type) {
        case Types.LANGUAGE_LOAD_SUCCESS://获取数据成功，然后对state进行赋值，再传给store，store再将数据交给component展示出来
            if (FLAG_LANGUAGE.flag_key === action.flag) {
                return {
                    ...state,
                    keys: action.languages
                }
            } else {
                return {
                    ...state,
                    languages: action.languages
                }
            }
        default:
            return state;
    }

}