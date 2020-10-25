import React, { useEffect } from "react";
import { Alert } from "antd";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import ArticlesCreate from "../../components/Settings/Articles/ArticlesCreate";
import ArticlesList from "../../components/Settings/Articles/ArticlesList";

const Articles = props => {
    useEffect(() => {
        props.onGetArticles();
    }, []);

    let alertMessage = null;

    const handleCloseAlert = () => {
        props.onClearMessage();
    }

    if (props.success) {
        alertMessage = (
            <Alert
                closable
                onClose={handleCloseAlert}
                className="alert-message"
                message="Article Added Successfully"
                type="success"
            />
        );
    }
    else if (props.error) {
        alertMessage = (
            <Alert
                closable
                onClose={handleCloseAlert}
                className="alert-message"
                message={props.error}
                type="error"
            />
        );
    }
    
    return (
        <div>
            <ArticlesCreate addArticle={props.onAddArticle} success={props.success} />
             {alertMessage}
            <ArticlesList deleteArticle={props.onDeleteArticle} articles={props.articles} />
        </div>
    );
};

const mapStateToProps = state => {
    return {
        articles: state.articles.articles,
        error: state.articles.error,
        success: state.articles.success
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetArticles: () => dispatch(actions.getArticles()),
        onAddArticle: article => dispatch(actions.addArticle(article)),
        onDeleteArticle: article => dispatch(actions.deleteArticle(article)),
        onClearMessage: () => dispatch(actions.clearArticleMessage()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Articles);
