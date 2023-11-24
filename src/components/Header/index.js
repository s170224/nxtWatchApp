import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'

import BackgroundChangeContext from '../../context/BackgroundChangeContext'

import './index.css'

const Header = props => (
  <BackgroundChangeContext.Consumer>
    {value => {
      const {activeBackgroundIsDark, changeBackground} = value

      const onClickChangeTheme = () => {
        changeBackground()
      }
      const {history} = props

      const onLogoutButton = () => {
        Cookies.remove('jwt_token')
        history.replace('/login')
      }

      const onChangeNavbarClassName = activeBackgroundIsDark
        ? 'navBar-container'
        : 'navbar-Light-Container'
      const buttonLogOut = activeBackgroundIsDark
        ? 'lightThemeLog'
        : 'darkThemeLog'
      const buttonTheme = activeBackgroundIsDark
        ? 'buttonDarkTheme'
        : 'buttonLightTheme'

      return (
        <div className={onChangeNavbarClassName}>
          <div className="navCon">
            <div>
              {activeBackgroundIsDark ? (
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
                  alt="logo"
                  className="logoImage4"
                />
              ) : (
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                  alt="logo"
                  className="logoImage4"
                />
              )}
            </div>
            <div className="navContaineer">
              <div>
                <button
                  type="button"
                  className={buttonTheme}
                  onClick={onClickChangeTheme}
                  data-testid="theme"
                >
                  {activeBackgroundIsDark ? (
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/light-theme-img.png"
                      alt="theme"
                      className="imageTheme"
                    />
                  ) : (
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/dark-theme-img.png"
                      alt="theme"
                      className="imageTheme"
                    />
                  )}
                </button>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                  alt="profile"
                  className="profileCon"
                />
              </div>

              <div className="popup-container">
                <Popup
                  modal
                  trigger={
                    <button type="button" className={buttonLogOut}>
                      LogOut
                    </button>
                  }
                  position="top right"
                >
                  {close => (
                    <>
                      <div className="popCon">
                        <p>Are you sure, you want to logout? </p>
                        <button
                          type="button"
                          className="logout1"
                          onClick={() => close()}
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={onLogoutButton}
                          className="trigger-button"
                        >
                          Confirm
                        </button>
                      </div>
                    </>
                  )}
                </Popup>
              </div>
            </div>
          </div>
        </div>
      )
    }}
  </BackgroundChangeContext.Consumer>
)
export default withRouter(Header)
