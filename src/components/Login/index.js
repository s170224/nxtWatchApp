import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {Component} from 'react'

import './index.css'

import BackgroundChangeContext from '../../context/BackgroundChangeContext'

class Login extends Component {
  state = {
    username: '',
    password: '',
    isShow: false,
    errorMsg: '',
    showSubmitError: false,
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)

    const data = await response.json()

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUserInput = event => {
    this.setState({username: event.target.value})
  }

  onChangeUserPassword = event => {
    this.setState({password: event.target.value})
  }

  isShowFunction = () => {
    const {isShow} = this.state
    this.setState({isShow: !isShow})
  }

  render() {
    const {isShow, username, password, showSubmitError, errorMsg} = this.state

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <BackgroundChangeContext.Consumer>
        {value => {
          const {activeBackgroundIsDark} = value
          const backgroundContainer = activeBackgroundIsDark
            ? 'darkContainer'
            : 'lightContainer'
          const subContainer1 = activeBackgroundIsDark
            ? 'darkContainer1'
            : 'container1'
          return (
            <div className={backgroundContainer}>
              <div className={subContainer1}>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                  alt="website logo"
                  className="img1"
                />

                <form onSubmit={this.submitForm}>
                  <div className="userContainer">
                    <label htmlFor="input1id" className="user1">
                      USERNAME
                    </label>
                    <input
                      id="input1id"
                      placeholder="Username"
                      className="inputC1"
                      onChange={this.onChangeUserInput}
                      value={username}
                    />
                  </div>
                  <div className="userContainer">
                    <label htmlFor="password1" className="user1">
                      PASSWORD
                    </label>
                    <input
                      type={isShow ? 'text' : 'password'}
                      id="password1"
                      placeholder="Password"
                      className="inputC1"
                      value={password}
                      onChange={this.onChangeUserPassword}
                    />
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="checkboxInput"
                      onChange={this.isShowFunction}
                    />
                    <label htmlFor="checkboxInput">Show Password</label>
                  </div>
                  <button type="submit" className="button1">
                    Login
                  </button>
                  {showSubmitError && <p className="errorPara">* {errorMsg}</p>}
                </form>
              </div>
            </div>
          )
        }}
      </BackgroundChangeContext.Consumer>
    )
  }
}

export default Login
