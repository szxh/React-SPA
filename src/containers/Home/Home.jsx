import React from 'react';
import styles from './Home.less';
import {Link} from 'react-router';



class Home extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            questions: this.props.questionnaires
        };
        this.renderList = this.renderList.bind(this);
        this.delete = this.delete.bind(this);
    }

    delete(index) {
        let questions = this.state.questions;
        questions.splice(index, 1);
        this.setState({ questions: questions });
    }

    renderList() {
        return (this.state.questions.map( (q, index) => {
                return (
                        <li className={styles.list} key={index}>
                            <span className={styles.titleInstance}>{q.title}</span>
                            <span className={styles.timeInstance}>{q.time}</span>
                            <span className={styles.stateInstance}>{(q.publish) ? '已发布' : '未发布'}</span>
                            <span className={styles.handleInstance}>
                                <Link to={{ pathname: '/edit', query: {index: index} }}>
                                    <span className={styles.btnSmall}>编辑</span>
                                </Link>
                                <Link to={{ pathname: '/check', query: {index: index} }}>
                                    <span className={styles.btnSmall}>查看</span>
                                </Link>
                                <Link to={{ pathname: '/fill', query: {index: index} }}>
                                    <span className={styles.btnSmall}>填写</span>
                                </Link>
                                    <span className={styles.btnSmall} onClick={this.delete.bind(this, index)}>删除</span>
                            </span>
                        </li>
                    );
            } ));
    }

    render() {
        return (
            <ul className={styles.wrapper}>
                <li className={styles.list}>
                    <span className={styles.title}>标题</span>
                    <span className={styles.time}>时间</span>
                    <span className={styles.state}>状态</span>
                    <span className={styles.handle}>
                        <span>操作</span>
                        <Link to="/edit">
                            <span className={styles.btn}>+ 新建问卷</span>
                        </Link>
                    </span>
                </li>
                {this.renderList()}
            </ul>
        )
    }
};

export default Home;