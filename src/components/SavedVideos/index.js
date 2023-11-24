import {AiOutlineDownload} from 'react-icons/ai'

import {Link} from 'react-router-dom'
import BackgroundChangeContext from '../../context/BackgroundChangeContext'
import VideoItemDetails from '../VideoItemDetails'
import Header from '../Header'

import LeftBaner from '../LeftBaner'
import './index.css'

const SavedVideos = () => (
  <BackgroundChangeContext.Consumer>
    {value => {
      const {savesListItems, activeBackgroundIsDark} = value
      const lengthOfSavedList = savesListItems.length === 0
      const themeBackContainer = activeBackgroundIsDark
        ? 'darkThemCon'
        : 'lightThemeCon'

      const gameIcon = activeBackgroundIsDark
        ? 'gameDarkIcon1'
        : 'gameLightIcon1'
      const onChangeLink3 = activeBackgroundIsDark
        ? 'darkLinkColor'
        : 'lightLinkColor'

      return (
        <div>
          <Header />
          <div className="container3">
            <div className="leftBanCon">
              <LeftBaner />
            </div>
            <div className={themeBackContainer}>
              <div className={gameIcon}>
                <h1 className="heading12">
                  {' '}
                  <AiOutlineDownload className="iconColor1" />
                  Saved Videos
                </h1>
              </div>
              {lengthOfSavedList ? (
                <div className="containerNoFound">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                    alt="no saved videos"
                    className="noVideoImage"
                  />
                  <h2>No saved videos found</h2>
                  <p>You can save your videos while watching them</p>
                </div>
              ) : (
                <div className="sub-con">
                  <ul className="ulContainer">
                    {savesListItems.map(eachItem => (
                      <li key={eachItem.id} className="trendCon">
                        <Link
                          to={`/videos/${eachItem.id}`}
                          className={onChangeLink3}
                        >
                          <div className="main-cont1">
                            <img
                              src={eachItem.thumbnailUrl}
                              alt={eachItem.title}
                              className="trendingImage1"
                            />

                            <div className="containerTrade">
                              <h4>{eachItem.title}</h4>
                              <p>{eachItem.channel.name}</p>
                              <p>{eachItem.viewCount}Views</p>
                              {/* <p>{newYears}</p> */}
                            </div>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )
    }}
  </BackgroundChangeContext.Consumer>
)

export default SavedVideos
