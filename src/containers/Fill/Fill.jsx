import React from 'react';
import styles from './Fill.less';
import classNames from 'classnames';
import {Link} from 'react-router';

class Fill extends React.Component {
    constructor(props) {
        super(props);
        this.state = { display: false,
                       writable: false,
                       title: '这里是标题(可编辑)',
                       publish: false,
                       time: '',
                       questionnaire: []
                    };
        this.renderQuestion = this.renderQuestion.bind(this);
        this.renderContent = this.renderContent.bind(this);
        this.submit = this.submit.bind(this);
    }

    renderQuestion() {
        const questions = this.state.questionnaire;
        const len = questions.length;
        return(
            questions.map((item, index) => {
                return (
                    <div key={index} className={styles.optionWrap}>
                        <span className={styles.index}>Q{index+1}</span>
                        <span className={styles.optionTitle}>{item.title}</span>
                        {this.renderContent(item, index)}
                    </div>
                );
            })
        );
    }

    renderContent(item, index) {
        if (item.type === 'text') {
            return (
                <div key={index} className={styles.textarea}>
                    <textarea cols="60" rows="7" className={styles.area}></textarea>
                </div>
            );
        } else {
            return (
                <div key={index} >
                    {
                        item.option.map( (o, oIndex) => {
                            return (
                                <div className={styles.option} key={index.toString() + oIndex}>
                                    <input type={item.type} name="option" />
                                    <span>{o}</span>
                                </div>
                            );
                        })
                    }
                </div>
            );
        }
    }

    componentWillMount() {
        if (this.props.location.query.index >= 0) {
            const index = this.props.location.query.index;
            let questionnaire = this.props.questionnaires[index];
            this.setState(questionnaire);
        }
    }

    submit() {
        alert('提交成功');
    }

    render() {
        return (<div>
                    <h1 className={styles.title}>{this.state.title}</h1>
                    <div className={styles.questionnaire}>
                        {this.renderQuestion()}
                    </div>
                    <hr/>
                    <Link to='/'>
                        <div className={styles.link}>
                            <div onClick={this.submit} className={styles.submit}>提交</div>
                        </div>
                    </Link>
                </div>
        );
    }
}

export default Fill;