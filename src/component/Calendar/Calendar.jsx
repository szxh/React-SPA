import React from 'react';
import styles from './Calendar.less';
import classNames from 'classnames';


class Calendar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {  display: true, 
						time: this.props.time, 
						timeObj: this.props.timeObj,
						date: this.props.current, 
						selected: '' 
					};
		this.year = this.state.date.year;
		this.month = this.state.date.month;
		this.date = this.state.date.date;
		//一个月第一天是周几
		this.day = null;
		//记录范围选择时的初始日期节点和最终日期节点
		this.selectDate = [];
		//选中日期后的回调函数
		this.selectCall = null;
		this.min = this.props.dateMin;
		this.max = this.props.dateMax;
		this.rangeCall = null;
		this.isRange = this.props.isRange;
		this.rangeLimit = this.props.rangeLimit || null;
		this.handleShow = this.handleShow.bind(this);
		this.changeDate = this.changeDate.bind(this);
		this.changeColor = this.changeColor.bind(this);
		this.renderCalendar = this.renderCalendar.bind(this);
		this.confirm = this.confirm.bind(this);
		this.dateMaxFunc = this.dateMaxFunc.bind(this);
		this.getDate = this.getDate.bind(this);
		this.setDate = this.setDate.bind(this);
		this.rightMonth = this.rightMonth.bind(this);
		this.leftMonth = this.leftMonth.bind(this);
	}

	renderCalendar() {
		//确定一个月的第一天是周几
		this.day = new Date(this.state.date.year, this.state.date.month - 1, 1).getDay();
		
		//判断这个月有多少天
		const dateMax = this.dateMaxFunc(this.state.date.month);
		//确定一个月的最后一天是周几
		const endDay = new Date(this.state.date.year, this.state.date.month - 1, dateMax).getDay();
		//判断这个月之前需要显示哪几天
		const lastMax = this.dateMaxFunc(this.state.date.month - 1);
		
		//构建渲染用的数据
		let dateArr = [];
		for (let i = 1; i < dateMax + 1; i++) {
			dateArr.push(i);
		}
		for (let i = lastMax; i > lastMax - this.day; i--) {
			dateArr.unshift(i);
		}
		for (let i = 1; i < 7 - endDay; i++) {
			dateArr.push(i);
		}
		const self = this;
		//渲染日历表日期
		
		return( <div onClick={this.changeDate}>
					<li>日</li><li>一</li><li>二</li><li>三</li><li>四</li><li>五</li><li>六</li>
					{ dateArr.map(function(item, index) {
						const dat = new Date(self.state.date.year, self.state.date.month - 1, item),
							datMin = new Date(self.min.year, self.min.month - 1, self.min.date),
							datMax = new Date(self.max.year, self.max.month - 1, self.max.date);
						
						if (dat > datMax || dat < datMin) {
							return <li className={styles.gray} key={index}>{item}</li>;
						}
						if (index < self.day || index >= self.day + dateMax) {
							return <li className={styles.gray} key={index}>{item}</li>;
						}
						if (dat - self.selectDate[0] === 0 || dat - self.selectDate[1] === 0) {
							return <li className={styles.selected} ref={item} key={index}>{item}</li>;
						}
						if (self.selectDate[0] > self.selectDate[1]) {
							if (dat < self.selectDate[0] && dat > self.selectDate[1]) {
								return <li className={styles["light-red"]} ref={item} key={index}>{item}</li>;
							}
						} else {
							if (dat > self.selectDate[0] && dat < self.selectDate[1]) {
								return <li className={styles["light-red"]} ref={item} key={index}>{item}</li>;
							}
						}
						if ((index % 7 ===0 || (index + 1) % 7 === 0) && (index >= self.day && index <self.day + dateMax)) {
							return <li className={styles.red} ref={item} key={index}>{item}</li>;
						}
						else {
							return <li ref={item} key={index}>{item}</li>;
						}
				})}
					<div>
						<span className="confirm" onClick={this.confirm}>确定</span>
						<span className="cancel" onClick={this.handleShow}>取消</span>
					</div>
			</div>);
	}

	handleShow() {
		this.setState(prevState => ({
			display: ! prevState.display
		}));
	}

	changeDate(e) {
		const target = e.target;
		//单个日期选中后样式变化
		if (target.nodeName.toLowerCase() === 'li' && !target.classList.contains(styles.gray)) {
			//范围日期选择后变化
			this.changeColor(target);
			return;
		}
	}

	changeColor(target) {
		if (this.isRange && !isNaN(target.innerText)) {
			if (this.selectDate.length < 2) {
				this.selectDate.push(new Date(this.year, this.month - 1, parseInt(target.textContent)));
				if (this.rangeLimit && this.selectDate.length === 2) {
					const dayInterval = Math.abs(this.selectDate[0] - this.selectDate[1]) / 1000 / 60 / 60 / 24 + 1;
					if (dayInterval > this.rangeLimit[1] || dayInterval < this.rangeLimit[0]) {
						if (this.rangeCall) {
							this.rangeCall();
						} else {
							alert('所选时间超出时间跨度');
						}
						this.selectDate.pop();
						return;
					}
				}
				target.classList.add('selected');
			} else {
				this.selectDate.push(new Date(this.year, this.month - 1, parseInt(target.textContent)));
				if (this.rangeLimit && this.selectDate.length === 3) {
					const dayInterval = Math.abs(this.selectDate[1] - this.selectDate[2]) / 1000 / 60 / 60 / 24 + 1;
					if (dayInterval > this.rangeLimit[1] || dayInterval < this.rangeLimit[0]) {
						if (this.rangeCall) {
							this.rangeCall();
						} else {
							alert('所选时间超出时间跨度');
						}
						this.selectDate.pop();
						return;
					}
				}
				if (this.year === this.selectDate[0].getFullYear() && this.month === this.selectDate[0].getMonth() + 1) {
					$('.date-content').children[this.day + this.selectDate[0].getDate() + 6].classList.remove('selected');
				}
				this.selectDate.shift();
				target.classList.add('selected');
			}
			if (this.selectDate.length === 2) {
				var dateMax = this.dateMaxFunc(this.month);
				var dateContent = $('.date-content');
				for (var i = 1; i <= dateMax; i++) {
					var dat = new Date(this.year, this.month - 1, i);
					if (this.selectDate[0] > this.selectDate[1]) {
						if (dat < this.selectDate[0] && dat > this.selectDate[1]) {
							dateContent.children[this.day + i + 6].classList.add('light-red');
						} else {
							dateContent.children[this.day + i + 6].classList.remove('light-red');
						}
					} else {
						if (dat > this.selectDate[0] && dat < this.selectDate[1]) {
							dateContent.children[this.day + i + 6].classList.add('light-red');
						} else {
							dateContent.children[this.day + i + 6].classList.remove('light-red');
						}
					}
				}
			}
		} else {
			if (!isNaN(target.innerText)) {
				if (this.state.selected) {
					this.state.selected.classList.remove(styles.selected);
				}
				target.classList.add(styles.selected);
				this.setState( prevState => ({selected: target}) );
				
			}
		}
	}

	confirm() {

		if (!this.isRange) {
			this.setState(prevState => ({ time:  prevState.date.year + '/' + prevState.date.month + '/' + prevState.selected.textContent,
											timeObj: {year: prevState.date.year, month: prevState.date.month, date: parseInt(prevState.selected.textContent)}}),
					function() {
						this.props.handleTime(this.state.time, this.state.timeObj);
					}
				);

			if (this.selectCall) {
				this.selectCall();
			} else {
				alert('选择成功');
			}
			this.handleShow();
		} else {
			if (this.selectDate[0] < this.selectDate[1]) {
				$('.date-input').value = this.selectDate[0].getFullYear() + '/' + (this.selectDate[0].getMonth() + 1) + '/' + this.selectDate[0].getDate() + '-' +
				this.selectDate[1].getFullYear() + '/' + (this.selectDate[1].getMonth() + 1) + '/' + this.selectDate[1].getDate();
			} else {
				$('.date-input').value = this.selectDate[1].getFullYear() + '/' + (this.selectDate[1].getMonth() + 1) + '/' + this.selectDate[1].getDate() + ' - ' +
				this.selectDate[0].getFullYear() + '/' + (this.selectDate[0].getMonth() + 1) + '/' + this.selectDate[0].getDate();
			}
			this.handleShow();
		}
	}


	//设定初始日期
	setDate(setDat) {
		if (!setDat) {
			return;
		}
		this.year = setDat.year;
		this.month = setDat.month;
		const date = setDat.date;
		this.renderCalendar();
		const target = this.refs[date];
		this.changeColor(target);
	}
	
	
	//获取当前选中日期对象
	getDate() {
		try {
			if (this.state.selected.classList.contains('selected')) {
				return {
					year: this.year,
					month: this.month,
					date: parseInt(this.state.selected.textContent)
				}
			}
		} catch (error){
			return null;
		}
	}

	//获得一个月最大的日期
	dateMaxFunc(month) {
		if (month === 0) {
			month === 12;
		}
		let dateMax = null;
		const smallMonth = {
			4: true,
			6: true,
			9: true,
			11: true
		};
		if (month === 2) {
			if (this.year % 4 === 0) {
				dateMax = 29;
			} else {
				dateMax = 28;
			}
		} else if (smallMonth[month]) {
			dateMax = 30;
		} else {
			dateMax = 31;
		}
		return dateMax;
	}

	leftMonth() {
		if (this.state.date.month === 1) {
			this.setState(prevState => ({ date: { year: prevState.date.year - 1, month: 12, date: prevState.date.date} }));
		} else {
			this.setState(prevState => ({ date: { year: prevState.date.year, month: prevState.date.month - 1, date: prevState.date.date} }));
		}
	}

	rightMonth() {
		if (this.state.date.month === 12) {
			this.setState(prevState => ({ date: { year: prevState.date.year + 1, month: 1, date: prevState.date.date} }));
		} else {
			this.setState(prevState => ({ date: { year: prevState.date.year, month: prevState.date.month + 1, date: prevState.date.date} }));
		}
	}

	componentDidMount() {
		if (this.state.timeObj) {
			this.setDate(this.state.timeObj);
		} else {
			this.setDate(this.props.current);
		}
		this.renderCalendar();
	}

	render() {
		return (
			<div className={styles.wrapper}>
				<input onClick={this.handleShow} type="text" className={styles.input} readOnly="true" value={this.state.time}/>
				<div className={classNames({
					[styles.wrap]: true, 
					[styles.hide]: this.state.display
				})}
				>
					<div className={styles.title}>
						<span className={styles.left} onClick={this.leftMonth}>&lt;</span>
						<span>{this.state.date.year}</span><span>年</span>
						<span>{this.state.date.month}</span><span>月</span>
						<span className={styles.right} onClick={this.rightMonth}>></span>
					</div>
					<ul className={styles.content}>{this.renderCalendar()}</ul>
				</div>
			</div>
		);
	}
}

export default Calendar;

