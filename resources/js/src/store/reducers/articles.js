import * as actionTypes from "../actions/actionTypes";

const initialState = {
    articles: [],
    loading: false,
    error: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_ARTICLE_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.ADD_ARTICLE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                articles: state.articles.concat(action.article)
            };
        case actionTypes.ADD_ARTICLE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case actionTypes.GET_ARTICLES_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.GET_ARTICLES_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                articles: action.articles
            };
        case actionTypes.GET_ARTICLES_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }
};

export default reducer;
