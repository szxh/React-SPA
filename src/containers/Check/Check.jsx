import React from 'react';
import styles from './check.less';
import classNames from 'classnames';
import echarts from 'echarts';
import {Link} from 'react-router';

class Check extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.showCharts = this.showCharts.bind(this);
        this.renderCharts = this.renderCharts.bind(this);
    }

    componentDidUpdate() {
        this.showCharts();
    }

    showCharts() {
        const index = this.props.location.query.index;
        const questionnaire = this.props.questionnaires[index];
        questionnaire.questionnaire.map( (o, index) => {
            const id = `main${index}`;
            const myChart = echarts.init(document.getElementById(id));
            let option = {};
            if (o.type === 'text') {
                 option = {
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>{b}: {c} ({d}%)"
                        },
                        legend: {
                            orient: 'vertical',
                            x: 'left',
                            data:['无效填写','有效填写']
                        },
                        series: [
                            {
                                name:'文本题',
                                type:'pie',
                                radius: ['50%', '70%'],
                                avoidLabelOverlap: false,
                                label: {
                                    normal: {
                                        show: false,
                                        position: 'center'
                                    },
                                    emphasis: {
                                        show: true,
                                        textStyle: {
                                            fontSize: '30',
                                            fontWeight: 'bold'
                                        }
                                    }
                                },
                                labelLine: {
                                    normal: {
                                        show: false
                                    }
                                },
                                data:[
                                    {value:335, name:'无效填写'},
                                    {value:310, name:'有效填写'}
                                ]
                            }
                        ]
                };
            } else {
                const data = o.option;
                const seriesData = data.map( (d) => {
                    return {value: Math.floor(Math.random() * 100), name: d}
                } );
                 option = {
                    title : {
                        text: o.title,
                        subtext: '所有数据均为mock',
                        x:'center'
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: data
                    },
                    series : [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius : '55%',
                            center: ['50%', '60%'],
                            data:seriesData,
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };
            }
            myChart.setOption(option);
        } );
    }

    renderCharts() {
        const index = this.props.location.query.index;
        const questionnaire = this.props.questionnaires[index];
        return(
            questionnaire.questionnaire.map( (o, index) => {
                return <div id={`main${index}`} className={styles.main} key={index}></div>
            } )
        );
    }

    render() {
        return(
            <div>
                {this.renderCharts()}
                <Link to='/'>
                    <div className={styles.link}>
                        <div className={styles.submit}>返回</div>
                    </div>
                </Link>
            </div>
        )
    }
}

export default Check;