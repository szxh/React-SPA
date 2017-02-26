import ReactDOM from 'react-dom';
import { App, Home, Edit, Check, Fill } from './containers/index.js';
import { Route, Router, IndexRoute, hashHistory } from 'react-router';
import React from 'react';

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home} />
            <Route path="/edit" component={Edit} />
            <Route path="/check" component={Check} />
            <Route path="/fill" component={Fill} />
        </Route>
    </Router>,
    document.getElementById("root")
);