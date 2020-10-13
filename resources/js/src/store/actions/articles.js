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
    console.log(article);
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


