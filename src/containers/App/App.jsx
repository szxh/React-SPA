import Header from '../Header/Header.jsx';
import Main from '../Main/Main.jsx';
import React from 'react';
import styles from './App.less';

class App extends React.Component{
    render() {
        return (
            <div className={styles.wrapper}>
                <Header />
                <Main>
                    {this.props.children}
                </Main>
            </div>
        );
    }
};

export default App;