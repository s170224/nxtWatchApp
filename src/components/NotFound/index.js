import './index.css'

import Header from '../Header'
import LeftBaner from '../LeftBaner'

import BackgroundChangeContext from '../../context/BackgroundChangeContext'

const NotFound = () => (
  <BackgroundChangeContext.Consumer>
    {value => {
      const {activeBackgroundIsDark} = value
      const backgroundChangeContainer = activeBackgroundIsDark
        ? 'backgroundDarkContext'
        : 'backgroundLightCon'
      return (
        <div>
          <Header />
          <div>
            <LeftBaner />
          </div>
          <div className={backgroundChangeContainer}>
            {activeBackgroundIsDark ? (
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png"
                alt="not found"
                className="imageNotFound"
              />
            ) : (
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png"
                alt="not found"
                className="imageNotFound"
              />
            )}
            <h2>Page Not Found </h2>
            <p>we are sorry, the page you requested could not be found.</p>
          </div>
        </div>
      )
    }}
  </BackgroundChangeContext.Consumer>
)

export default NotFound
