import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Snake from '../../component/Snake'
import Index from '../../pages/index/index'
import Rule from '../../pages/rule/index'
import Header from '../../component/Header/index'
import ProgressBar from '../../component/progressBar/index'
export default class Portal extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Redirect exact from="/" to="/index" />
                    <Route path="/snake" component={Snake} />
                    <Route path="/index" component={Index} />
                    <Route path="/rule" component={Rule} />
                    <Route path="/header" component={Header} />
                    <Route path="/progressBar" component={ProgressBar} />
                </Switch>
            </Router>
        )
    }
}