import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    timerLimit: 25,
    minutes: 25,
    seconds: 0,
    pauseOrStart: false,
    timerStatus: 'Paused',
    isDisabled: false,
  }

  tick = () => {
    const {minutes, seconds} = this.state
    if (minutes === 0 && seconds === 0) {
      this.setState({
        pauseOrStart: false,
        timerStatus: 'Paused',
        isDisabled: false,
      })
      clearInterval(this.intervalId)
    } else if (seconds === 0 && minutes > 0) {
      this.setState({
        minutes: minutes - 1,
        seconds: 59,
      })
    } else {
      this.setState({
        seconds: seconds - 1,
      })
    }
  }

  onStartOrPause = () => {
    const {pauseOrStart} = this.state
    if (pauseOrStart) {
      clearInterval(this.intervalId)
      this.setState({
        pauseOrStart: false,
        timerStatus: 'Paused',
        isDisabled: false,
      })
    } else {
      this.intervalId = setInterval(this.tick, 1000)
      this.setState({
        pauseOrStart: true,
        timerStatus: 'Running',
        isDisabled: true,
      })
    }
  }

  onReset = () => {
    const {timerLimit} = this.state
    clearInterval(this.intervalId)
    this.setState({
      minutes: timerLimit,
      seconds: 0,
      pauseOrStart: false,
      timerStatus: 'Paused',
      isDisabled: false,
    })
  }

  onDecrement = () => {
    const {timerLimit} = this.state
    if (timerLimit > 1) {
      this.setState({
        timerLimit: timerLimit - 1,
        minutes: timerLimit - 1,
      })
    }
  }

  onIncrement = () => {
    const {timerLimit} = this.state
    this.setState({
      timerLimit: timerLimit + 1,
      minutes: timerLimit + 1,
    })
  }

  render() {
    const {
      minutes,
      seconds,
      pauseOrStart,
      timerStatus,
      isDisabled,
      timerLimit,
    } = this.state
    const displayMinutes = minutes.toString().padStart(2, '0')
    const displaySeconds = seconds.toString().padStart(2, '0')
    return (
      <div className="digital-timer-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="timer-container">
          <div className="timer-card">
            <div className="timer-watch">
              <h1 className="timer">
                {displayMinutes}:{displaySeconds}
              </h1>
              <p className="timer-status">{timerStatus}</p>
            </div>
          </div>
          <div className="timer-setting-container">
            <div className="pause-or-reset-container">
              <button
                type="button"
                className="button"
                onClick={this.onStartOrPause}
              >
                {pauseOrStart ? (
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/pause-icon-img.png"
                    alt="pause icon"
                    className="icon"
                  />
                ) : (
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png"
                    alt="play icon"
                    className="icon"
                  />
                )}
                {pauseOrStart ? 'Pause' : 'Start'}
              </button>
              <button type="button" className="button" onClick={this.onReset}>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                  className="icon"
                />
                Reset
              </button>
            </div>
            <p className="set-timer">Set Timer Limit</p>
            <div className="time-limit-container">
              <button
                type="button"
                className="time-set-btn"
                onClick={this.onDecrement}
                disabled={isDisabled}
              >
                -
              </button>
              <div className="minute-card">
                <p className="minute">{timerLimit}</p>
              </div>
              <button
                type="button"
                className="time-set-btn"
                onClick={this.onIncrement}
                disabled={isDisabled}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
