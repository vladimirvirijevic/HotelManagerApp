import * as actionTypes from "../actions/actionTypes";

const initialState = {
    articles: [],
    importedArticles: [],
    loading: false,
    error: null,
    units: [],
    loadingUnits: false,
    errorUnits: null,
    success: false,
    articleSuccess: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_ARTICLE_START:
            return {
                ...state,
                loading: true,
                articleSuccess: false
            };
        case actionTypes.ADD_ARTICLE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                articles: state.articles.concat(action.article),
                articleSuccess: true
            };
        case actionTypes.ADD_ARTICLE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error,
                articleSuccess: false
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
        case actionTypes.CLEAR_ARTICLE_MESSAGE:
            return {
                ...state,
                loading: false,
                errorUnits: null,
                success: false,
                articleSuccess: false
            };

            // UNITS
        case actionTypes.ADD_UNIT_START:
            return {
                ...state,
                loadingUnits: true,
                success: false
            };
        case actionTypes.ADD_UNIT_SUCCESS:
            return {
                ...state,
                loadingUnits: false,
                errorUnits: null,
                units: state.units.concat(action.unit),
                success: true
            };
        case actionTypes.ADD_UNIT_FAIL:
            return {
                ...state,
                loadingUnits: false,
                errorUnits: action.error,
                success: false
            };
        case actionTypes.GET_UNITS_START:
            return {
                ...state,
                loadingUnits: true,
                success: false
            };
        case actionTypes.GET_UNITS_SUCCESS:
            return {
                ...state,
                loadingUnits: false,
                errorUnits: null,
                units: action.units,
                success: false
            };
        case actionTypes.GET_UNITS_FAIL:
            return {
                ...state,
                loadingUnits: false,
                errorUnits: action.error,
                success: false
            };
        case actionTypes.CLEAR_UNITS_MESSAGE:
            return {
                ...state,
                loading: false,
                errorUnits: null,
                success: false
        };
        case actionTypes.DELETE_UNIT_SUCCESS:
            return {
                ...state,
                error: null,
                success: false,
                units: state.units.filter(unit => unit.id != action.unit.id)
            };
        case actionTypes.DELETE_UNIT_FAIL:
            return {
                ...state,
                errorUnits: action.error,
                success: false
            };
        // IMPORTED ARTICLES
        case actionTypes.ADD_IMPORTED_ARTICLE_START:
            return {
                ...state,
                loading: true,
                articleSuccess: false
            };
        case actionTypes.ADD_IMPORTED_ARTICLE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                importedArticles: state.importedArticles.concat(action.importedArticle),
                articleSuccess: true
            };
        case actionTypes.ADD_IMPORTED_ARTICLE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error,
                articleSuccess: false
            };
        case actionTypes.GET_IMPORTED_ARTICLES_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.GET_IMPORTED_ARTICLES_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                importedArticles: action.importedArticles
            };
        case actionTypes.GET_IMPORTED_ARTICLES_FAIL:
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
