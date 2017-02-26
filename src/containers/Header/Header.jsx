import React from 'react';
import {Link} from 'react-router';
import styles from './Header.less';

const Header = React.createClass({
    render: function() {
        return (
            <div className={styles.wrapper}>
                <h1 className={styles.header}>问卷管理</h1>
                <Link to="/" className={styles.root}>我的问卷</Link>
            </div>
        )
    }
});

export default Header;