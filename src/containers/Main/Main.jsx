import React from 'react';
import styles from './Main.less';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questionnaires: []
        };
        this.save = this.save.bind(this);
    }

    save(question) {
        const questions = this.state.questionnaires;
        if (question.index >= 0) {
            questions[question.index] = question;
        } else {
            question.index = questions.length;
            questions[question.index] = question;
        }
        this.setState({ questionnaires: questions });
    }


    render() {
        const save = this.save;
        let props = {
            save: save,

            questionnaires: this.state.questionnaires
        };
        return (
            <div className={styles.main}>
                {React.Children.map(this.props.children, function(child) {
                    return React.cloneElement(child, props);
                })}
            </div>
        );
    }
}

export default Main;