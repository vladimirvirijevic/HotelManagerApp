import * as actionTypes from "./actionTypes";
import axios from "../../axios";

export const addArticleStart = () => {
    return {
        type: actionTypes.ADD_ARTICLE_START
    };
};

export const addArticleSuccess = article => {
    return {
        type: actionTypes.ADD_ARTICLE_SUCCESS,
        article: article
    };
};

export const addArticleFail = error => {
    return {
        type: actionTypes.ADD_ARTICLE_FAIL,
        error: error
    };
};

export const addArticle = article => {
    return dispatch => {
        dispatch(addArticleStart());
        axios
            .post("article/store", article)
            .then(response => {
                dispatch(addArticleSuccess(response.data.article));
            })
            .catch(e => {
                let errorMessage = "Article already exists!";
                dispatch(addArticleFail(errorMessage));
            });
    };
};

export const getArticlesStart = () => {
    return {
        type: actionTypes.GET_ARTICLES_START
    };
};

export const getArticlesSuccess = articles => {
    return {
        type: actionTypes.GET_ARTICLES_SUCCESS,
        articles: articles
    };
};

export const getArticlesFail = error => {
    return {
        type: actionTypes.GET_ARTICLES_FAIL,
        error: error
    };
};

export const getArticles = () => {
    return dispatch => {
        dispatch(getArticlesStart());
        axios
            .get("article/all")
            .then(response => {
                dispatch(getArticlesSuccess(response.data.articles));
            })
            .catch(error => {
                dispatch(getArticlesFail(error));
            });
    };
};

// UNITS
export const addUnitStart = () => {
    return {
        type: actionTypes.ADD_UNIT_START
    };
};

export const addUnitSuccess = unit => {
    return {
        type: actionTypes.ADD_UNIT_SUCCESS,
        unit: unit
    };
};

export const addUnitFail = error => {
    return {
        type: actionTypes.ADD_UNIT_FAIL,
        error: error
    };
};

export const addUnit = unit => {
    return dispatch => {
        dispatch(addUnitStart());
        axios
            .post("unit/store", unit)
            .then(response => {
                dispatch(addUnitSuccess(response.data.unit));
            })
            .catch(e => {
                let errorMessage = "Unit already exists!";
                dispatch(addUnitFail(errorMessage));
            });
    };
};

export const getUnitsStart = () => {
    return {
        type: actionTypes.GET_UNITS_START
    };
};

export const getUnitsSuccess = units => {
    return {
        type: actionTypes.GET_UNITS_SUCCESS,
        units: units
    };
};

export const getUnitsFail = error => {
    return {
        type: actionTypes.GET_UNITS_FAIL,
        error: error
    };
};

export const getUnits = () => {
    return dispatch => {
        dispatch(getUnitsStart());
        axios
            .get("unit/all")
            .then(response => {
                dispatch(getUnitsSuccess(response.data.units));
            })
            .catch(error => {
                dispatch(getUnitsFail(error));
            });
    };
};


// IMPORTED ARTICLE

export const addImportedArticleStart = () => {
    return {
        type: actionTypes.ADD_IMPORTED_ARTICLE_START
    };
};

export const addImportedArticleSuccess = importedArticle => {
    return {
        type: actionTypes.ADD_IMPORTED_ARTICLE_SUCCESS,
        importedArticle: importedArticle
    };
};

export const addImportedArticleFail = error => {
    return {
        type: actionTypes.ADD_IMPORTED_ARTICLE_FAIL,
        error: error
    };
};

export const addImportedArticle = importedArticle => {
    return dispatch => {
        dispatch(addImportedArticleStart());
        axios
            .post("importedArticle/store", importedArticle)
            .then(response => {
                dispatch(addImportedArticleSuccess(response.data.importedArticle));
            })
            .catch(e => {
                let errorMessage = "Imported Article already exists!";
                dispatch(addImportedArticleFail(errorMessage));
            });
    };
};

export const getImportedArticlesStart = () => {
    return {
        type: actionTypes.GET_IMPORTED_ARTICLES_START
    };
};

export const getImportedArticlesSuccess = importedArticles => {
    return {
        type: actionTypes.GET_IMPORTED_ARTICLES_SUCCESS,
        importedArticles: importedArticles
    };
};

export const getImportedArticlesFail = error => {
    return {
        type: actionTypes.GET_IMPORTED_ARTICLES_FAIL,
        error: error
    };
};

export const getImportedArticles = () => {
    return dispatch => {
        dispatch(getImportedArticlesStart());
        axios
            .get("importedArticle/all")
            .then(response => {
                dispatch(getImportedArticlesSuccess(response.data.importedArticles));
            })
            .catch(error => {
                dispatch(getImportedArticlesFail(error));
            });
    };
};

