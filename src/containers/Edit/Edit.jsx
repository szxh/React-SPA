import React from 'react';
import styles from './Edit.less';
import Calendar from '../../component/Calendar/Calendar.jsx';
import classNames from 'classnames';
import {Link} from 'react-router';

class Edit extends React.Component {
    constructor(props) {
        super(props);
        this.state = { display: false,
                       writable: false,
                       title: '这里是标题(可编辑)',
                       publish: false,
                       time: '',
                       questionnaire: []
                    };
        this.renderCalendar = this.renderCalendar.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.changeTitle = this.changeTitle.bind(this);
        this.changeWrapper = this.changeWrapper.bind(this);
        this.addRadio = this.addRadio.bind(this);
        this.addCheck = this.addCheck.bind(this);
        this.addText = this.addText.bind(this);
        this.renderQuestion = this.renderQuestion.bind(this);
        this.renderContent = this.renderContent.bind(this);
        this.addOption = this.addOption.bind(this);
        this.removeOption = this.removeOption.bind(this);
        this.changeOptionWrapper = this.changeOptionWrapper.bind(this);
        this.changeOptionTitle = this.changeOptionTitle.bind(this);
        this.changeContentWrapper = this.changeContentWrapper.bind(this);
        this.changeContent = this.changeContent.bind(this);
        this.up = this.up.bind(this);
        this.down = this.down.bind(this);
        this.copy = this.copy.bind(this);
        this.delete = this.delete.bind(this);
        this.deepClone = this.deepClone.bind(this);
        this.save = this.save.bind(this);
        this.publish = this.publish.bind(this);
        this.handleTime = this.handleTime.bind(this);
    }

    renderCalendar() {
        const now = new Date();
        const handleTime = this.handleTime;
        const [year, month, date] = [now.getFullYear(), now.getMonth() + 1, now.getDate()];
        return (
            <Calendar 
                dateMin={{ year, month, date }}
                dateMax={{ year: 2030, month: 11, date: 14 }}
                current={{ year, month, date }}
                isRange={ false }
                rangeLimit={ false }
                handleTime={ handleTime }
                time={ this.state.time }
                timeObj={this.state.timeObj}
            />
        );
    }

    handleShow() {
        this.setState( prevState => ({ display: ! prevState.display }) );
    }

    changeWrapper() {
        this.setState( { writable: ! this.state.writable} );
    }

    changeOptionWrapper(index) {
        this.setState(prevState => {
            let questions = prevState.questionnaire;
            questions[index].writable = ! prevState.questionnaire[index].writable;
            return {
                questionnaire: questions
            };
        });
    }

    changeContentWrapper(index, oIndex) {
        this.setState(prevState => {
            let questions = prevState.questionnaire;
            questions[index].contentWritable[oIndex] = ! prevState.questionnaire[index].contentWritable[oIndex];
            return {
                questionnaire: questions
            };
        });
    }

    changeTitle(e) {
        this.setState({ title: e.target.value});
    }

    changeOptionTitle(index, e) {
        const value = e.target.value;
        this.setState(prevState => {
            let questions = prevState.questionnaire;
            questions[index].title = value;
            return {
                questionnaire: questions
            };
        });
    }

    changeContent(index, oIndex, e) {
        const value = e.target.value;
        this.setState(prevState => {
            let questions = prevState.questionnaire;
            questions[index].option[oIndex] = value;
            return {
                questionnaire: questions
            };
        });
    }

    addRadio() {
        this.setState( prevState => ({ questionnaire: prevState.questionnaire.concat({type: 'radio', title: '单选题(可编辑)', option: ["选项1(可编辑)", "选项2(可编辑)"], contentWritable: [false, false], writable: false}) }) );
    }

    addCheck() {
        this.setState( prevState => ({ questionnaire: prevState.questionnaire.concat({type: 'checkbox', title: '多选题(可编辑)', option: ["选项1(可编辑)", "选项2(可编辑)", "选项3(可编辑)", "选项4(可编辑)"], contentWritable: [false, false, false, false],writable: false}) }) );
    }

    addText() {
        this.setState( prevState => ({ questionnaire: prevState.questionnaire.concat({type: 'text', title: '文本题(可编辑)', writable: false}) }) );
    }

    up(index) {
        const questions = this.state.questionnaire;
        let a = questions[index];
        let b = questions[index - 1];
        questions[index] = b;
        questions[index - 1] = a;
        this.setState({ questionnaire: questions });
    }

    down(index) {
        const questions = this.state.questionnaire;
        let a = questions[index];
        let b = questions[index + 1];
        questions[index] = b;
        questions[index + 1] = a;
        this.setState({ questionnaire: questions });
    }

    copy(index) {
        const questions = this.state.questionnaire;
        const copyObject = this.deepClone(questions[index]);
        questions.splice(index, 0, copyObject);
        this.setState({ questionnaire: questions });
    }

    deepClone(obj, newObj) {
        newObj = newObj || {};
        for (let i in obj) {
            if (typeof obj[i] === 'object') {
                newObj[i] = (obj[i].constructor === Array) ? [] : {};
                this.deepClone(obj[i], newObj[i]);
            } else {
                newObj[i] = obj[i];
            }
        }
        return newObj;
    }

    delete(index) {
        const questions = this.state.questionnaire;
        questions.splice(index, 1);
        this.setState({ questionnaire: questions });
    }

    save() {
        if (!this.state.time) {
            alert('保存失败，请选择时间');
            return;
        }
        const questionnaire = this.state;
        this.props.save(questionnaire);
        alert('保存成功');
    }

    publish() {
        if (!this.state.time) {
            alert('发布失败，请选择时间');
            return;
        }
        this.setState({ publish: true }, function() {
            const questionnaire = this.state;
            this.props.save(questionnaire);
            alert('发布成功');
        });
        
    }

    handleTime(time, timeObj) {
        this.setState({ time: time, timeObj: timeObj });
    }

    renderQuestion() {
        const questions = this.state.questionnaire;
        const len = questions.length;
        return(
            questions.map((item, index) => {
                let hideUp, hideDown;
                ( index === 0 ) ? hideUp = true : hideUp = false;
                ( index === len - 1 ) ? hideDown = true : hideDown = false;
                return (
                    <div key={index} className={styles.optionWrap}>
                        <span className={styles.index}>Q{index+1}</span>
                        <span className={classNames({
                            [styles.optionTitle]: true,
                            [styles.showOption]: ! this.state.questionnaire[index].writable
                        })}
                            onClick={this.changeOptionWrapper.bind(this, index)}>{item.title}</span>
                        <input  type="text" 
                                className={classNames({
                                    [styles.optionTitle]: true,
                                    [styles.showOption]: this.state.questionnaire[index].writable
                                })}
                                value={ this.state.questionnaire[index].title }
                                onChange={ this.changeOptionTitle.bind(this, index) }
                                onBlur={ this.changeOptionWrapper.bind(this, index) }
                                ref={index}/>
                        {this.renderContent(item, index)}
                        <div className={styles.operate}>
                            <span className={classNames({
                                [styles.hide]: hideUp
                            })}
                            onClick={this.up.bind(this, index)}>上移</span>
                            <span className={classNames({
                                [styles.hide]: hideDown
                            })}
                            onClick={this.down.bind(this, index)}>下移</span>
                            <span onClick={this.copy.bind(this, index)}>复用</span>
                            <span onClick={this.delete.bind(this, index)}>删除</span>
                        </div>
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
                    <div><input type="radio" className={styles.required} />此题是否必填</div>
                </div>
            );
        } else {
            return (
                <div key={index} >
                    {
                        item.option.map( (o, oIndex) => {
                            return (
                                <div className={styles.option} key={index.toString() + oIndex}>
                                    <input type={item.type} name="option" disabled />
                                    <span className={classNames({
                                        [styles.optionContent]: true,
                                        [styles.showOption]: ! this.state.questionnaire[index].contentWritable[oIndex]
                                    })}
                                        onClick={this.changeContentWrapper.bind(this, index, oIndex)}>{o}</span>
                                    <input  type="text" 
                                            className={classNames({
                                                [styles.optionContent]: true,
                                                [styles.showOption]: this.state.questionnaire[index].contentWritable[oIndex]
                                            })}
                                            value={ this.state.questionnaire[index].option[oIndex] }
                                            onChange={ this.changeContent.bind(this, index, oIndex) }
                                            onBlur={ this.changeContentWrapper.bind(this, index, oIndex) }
                                            ref={index.toString() + oIndex}/>
                                    <span onClick={this.removeOption.bind(this, item, index, oIndex)} className={styles.remove}>X</span>
                                </div>
                            );
                        })
                    }
                    <div className={styles.append} onClick={this.addOption.bind(this, item, index)}>+</div>
                </div>
            );
        }
    }

    addOption(item, index) {
        this.setState(prevState => {
            const len = item.option.length;
            let questions = prevState.questionnaire;
            questions[index].option[len] = `选项${len + 1}(可编辑)`;
            return {
                questionnaire: questions
            };
        });
    }

    removeOption(item, index, oIndex) {
        this.setState(prevState => {
            const len = item.option.length;
            let questions = prevState.questionnaire;
            questions[index].option.splice(oIndex, 1);
            return {
                questionnaire: questions
            };
        });
    }

    componentDidUpdate() {
        for (let o in this.refs) {
            this.refs[o].focus();
        }
    }

    componentWillMount() {
        if (this.props.location.query.index) {
            const index = this.props.location.query.index;
            let questionnaire = this.props.questionnaires[index];
            this.setState(questionnaire);
        }
    }

    render() {
        return (<div>
                    <Link to='/'>
                        <div>
                            <div className={styles.submit}>返回</div>
                        </div>
                    </Link>
                    <h1 className={classNames({
                            [styles.title]: true,
                            [styles.show]: ! this.state.writable
                        })}
                        onClick={this.changeWrapper}>{this.state.title}</h1>
                    <input type="text" 
                            className={classNames({
                                [styles.title]: true,
                                [styles.show]: this.state.writable
                            })}
                            value={ this.state.title }
                            onChange={ this.changeTitle }
                            onBlur={ this.changeWrapper }
                            ref='title' />
                    <hr />
                    <div className={styles.questionnaire}>
                        {this.renderQuestion()}
                    </div>
                    <div className={styles["add-question-wrapper"]}>
                        <div className={classNames({
                            [styles["question-type-wrapper"]]: true,
                            [styles.show]: this.state.display
                            })}
                        >
                            <div className={styles["question-type"]} onClick={this.addRadio}>单选</div>
                            <div className={styles["question-type"]} onClick={this.addCheck}>多选</div>
                            <div className={styles["question-type"]} onClick={this.addText}>文本</div>
                        </div>
                        <div className={styles["add-question"]} onClick={this.handleShow}>
                            <span className={styles.plus}>+</span>
                            <span className={styles.add}>添加问题</span>
                        </div>
                    </div>
                    <hr/>
                    <div className={styles.footer}>
                        <span className={styles.date}>问卷截止日期</span>
                        {this.renderCalendar()}
                        <span className={styles.save} onClick={this.save}>保存问卷</span>
                        <span className={styles.publish} onClick={this.publish}>发布问卷</span>
                    </div>
                </div>
        );
    }
}

export default Edit;