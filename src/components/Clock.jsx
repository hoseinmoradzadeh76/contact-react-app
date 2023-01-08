import { Component } from "react";
import Second from "./Second";
class Clock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(), showClock: true, color: false
        };
        this.clockChange = this.clockChange.bind(this);
        this.colorChange = this.colorChange.bind(this);
    }
    static getDerivedStateFromProps(props, state) {
        return state;
    }
    shouldComponentUpdate(nextProp, nextstate) {
        if (this.date =! nextProp.date) {
            return true;
        }
        return false;
    }

    componentDidMount() {
        this.timer = setInterval(() => this.tick(), 1000)
    }
    componentWillUnmount() {
        clearInterval(this.timer)
    }
    tick() {
       // this.setState({ date: new Date() });
    }
    clockChange() {
        this.setState({ showClock: !this.state.showClock });
    }
    colorChange() {
        this.setState({ color: !this.state.color });
    }
    getSnapshotBeforeUpdate(prevProp, prevState) {

    }
    componentDidUpdate(prevProp, prevState, snapshot) {

    }
    render() {
        const { date, showClock, color } = this.state;
        
        return (
            <>
                {showClock ? <p > {date.toLocaleTimeString()}</p> : null}
                <hr />
                <button onClick={this.clockChange}>تغییر ساعت</button>
                <button onClick={this.colorChange}>تغییر رنگ</button>
                <Second data={date} color={color}/>

            </>

        )
    }
}
export default Clock;