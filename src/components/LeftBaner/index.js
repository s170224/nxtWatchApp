import {Component} from 'react'
import {Link} from 'react-router-dom'
// import {CiHome} from 'react-icons/ci'
import {
  AiFillFire,
  AiFillHome,
  AiFillHeart,
  AiOutlineDownload,
} from 'react-icons/ai'

import BackgroundChangeContext from '../../context/BackgroundChangeContext'
import './index.css'

class LeftBaner extends Component {
  render() {
    return (
      <BackgroundChangeContext.Consumer>
        {value => {
          const {activeBackgroundIsDark, activeTab, changeActiveTab} = value
          const linkMainConatainerLeft = activeBackgroundIsDark
            ? 'linkLightCon'
            : 'linkContainer'

          const homeLinkCon = activeBackgroundIsDark
            ? 'darkConHome'
            : 'lightConHome'

          const changeButton1 = activeBackgroundIsDark
            ? 'darkButton1'
            : 'lightButton1'

          const changeHomeTab = () => {
            changeActiveTab('home')
            console.log('home clicked')
          }

          const changeGameTab = () => {
            changeActiveTab('game')
            console.log('game clicked')
          }
          const changeTrendTab = () => {
            changeActiveTab('trend')
            console.log('trend clicked')
          }
          const changeSavedTab = () => {
            changeActiveTab('saved')
            console.log('saved clicked')
          }
          console.log('activetab', activeTab)
          const homeClass = activeTab === 'home' ? 'active-class' : 'listLight'
          const gameClass = activeTab === 'game' ? 'active-class' : 'listLight'
          const trendClass =
            activeTab === 'trend' ? 'active-class' : 'listLight'
          const savedClass =
            activeTab === 'saved' ? 'active-class' : 'listLight'

          return (
            <div className={linkMainConatainerLeft}>
              <div>
                <ul>
                  <Link to="/">
                    <li className={homeClass}>
                      <button
                        type="button"
                        onClick={changeHomeTab}
                        className={changeButton1}
                      >
                        <AiFillHome className={homeClass} />
                        Home
                      </button>
                    </li>
                  </Link>
                  <Link to="/trending">
                    <li className={trendClass}>
                      <button
                        type="button"
                        onClick={changeTrendTab}
                        className={changeButton1}
                      >
                        <AiFillFire className={trendClass} />
                        Trending
                      </button>
                    </li>
                  </Link>
                  <Link to="/gaming">
                    <li className={gameClass}>
                      <button
                        type="button"
                        onClick={changeGameTab}
                        className={changeButton1}
                      >
                        <AiFillHeart className={gameClass} />
                        Gaming
                      </button>
                    </li>
                  </Link>
                  <Link to="/savedVideos">
                    <li className={savedClass}>
                      <button
                        type="button"
                        onClick={changeSavedTab}
                        className={changeButton1}
                      >
                        <AiOutlineDownload className={savedClass} />
                        Saved Videos
                      </button>
                    </li>
                  </Link>
                </ul>
              </div>
              <div>
                <h1 className="head1">CONTACT US</h1>
                <div>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                    alt="facebook logo"
                    className="imagelogo1"
                  />
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                    alt="twitter logo"
                    className="imagelogo1"
                  />
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                    alt="linked in logo"
                    className="imagelogo1"
                  />
                </div>
                <p>Enjoy! now to see your channels and recommendations</p>
              </div>
            </div>
          )
        }}
      </BackgroundChangeContext.Consumer>
    )
  }
}
export default LeftBaner
