import * as actionTypes from "../actions/actionTypes";

const initialState = {
    articles: [],
    importedArticles: [],
    loading: false,
    error: null,
    units: [],
    loadingUnits: false,
    errorUnits: null
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

            // UNITS
        case actionTypes.ADD_UNIT_START:
            return {
                ...state,
                loadingUnits: true
            };
        case actionTypes.ADD_UNIT_SUCCESS:
            return {
                ...state,
                loadingUnits: false,
                errorUnits: null,
                units: state.units.concat(action.unit)
            };
        case actionTypes.ADD_UNIT_FAIL:
            return {
                ...state,
                loadingUnits: false,
                errorUnits: action.error
            };
        case actionTypes.GET_UNITS_START:
            return {
                ...state,
                loadingUnits: true
            };
        case actionTypes.GET_UNITS_SUCCESS:
            return {
                ...state,
                loadingUnits: false,
                errorUnits: null,
                units: action.units
            };
        case actionTypes.GET_UNITS_FAIL:
            return {
                ...state,
                loadingUnits: false,
                errorUnits: action.error
            };
        // IMPORTED ARTICLES
        case actionTypes.ADD_IMPORTED_ARTICLE_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.ADD_IMPORTED_ARTICLE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                importedArticles: state.importedArticles.concat(action.importedArticle)
            };
        case actionTypes.ADD_IMPORTED_ARTICLE_FAIL:
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
