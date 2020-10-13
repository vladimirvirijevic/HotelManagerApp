import React, { useEffect } from 'react'
import { ShrinkOutlined, ArrowsAltOutlined } from "@ant-design/icons";
import { Tabs, Modal, Button, Form, Input, InputNumber } from "antd";
import ImportedArticles from '../components/ImportedArticles';
import { connect } from 'react-redux';
import * as actions from "../store/actions/index";

const { TabPane } = Tabs;

const WasteManagment = (props) => {

    const addImportedArticle = importedArticle => {
        const newImportedArticle = {
            date: importedArticle.date.format("DD-MM-YYYY"),
            amount: importedArticle.amount,
            department_id: importedArticle.department,
            article_id: importedArticle.article,
            unit_id: importedArticle.unit
        };

        props.onAddImportedArticle(newImportedArticle);
    }

    useEffect(() => {
        props.onGetDepartments();
        props.onGetArticles();
        props.onGetUnits();
    }, []);

    return (
        <div>
            <Tabs className="settings__tabs" defaultActiveKey="1">
                <TabPane
                        tab={
                            <span>
                                <ShrinkOutlined />
                                Article In
                            </span>
                        }
                        key="1">
                    <ImportedArticles 
                        articles={props.articles} 
                        departments={props.departments} 
                        units={props.units} 
                        addImportedArticle={addImportedArticle}/>
                </TabPane>
                <TabPane
                        tab={
                            <span>
                                <ArrowsAltOutlined />
                                Article Out
                            </span>
                        }
                        key="2">
                    Article Out
                </TabPane>
            </Tabs>
        </div>
    )
}

const maptStateToProps = state => {
    return {
        departments: state.departments.departments,
        articles: state.articles.articles,
        units: state.articles.units,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetDepartments: () => dispatch(actions.getDepartments()),
        onGetArticles: () => dispatch(actions.getArticles()),
        onGetUnits: () => dispatch(actions.getUnits()),
        onAddImportedArticle: importedArticle => dispatch(actions.addImportedArticle(importedArticle))
    };
}

export default connect(maptStateToProps, mapDispatchToProps)(WasteManagment)
