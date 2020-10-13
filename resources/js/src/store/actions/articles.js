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


