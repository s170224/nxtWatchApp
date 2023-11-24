import {Component} from 'react'
import Cookies from 'js-cookie'

import {AiFillHeart} from 'react-icons/ai'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import LeftBaner from '../LeftBaner'
import GameItem from '../GameItem'

import BackgroundChangeContext from '../../context/BackgroundChangeContext'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Gaming extends Component {
  state = {gameList: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getGameDataFunc()
  }

  getGameDataFunc = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const url = 'https://apis.ccbp.in/videos/gaming'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken} `,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const responserData = await response.json()

      const updateGameData = responserData.videos.map(eachGame => ({
        id: eachGame.id,
        thumbnailUrl: eachGame.thumbnail_url,
        title: eachGame.title,
        viewCount: eachGame.view_count,
      }))
      this.setState({
        gameList: updateGameData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onRetryButton = () => {
    this.getGameDataFunc()
  }

  renderLoadingView = () => (
    <div className="products-details-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  render() {
    const {gameList} = this.state

    return (
      <BackgroundChangeContext.Consumer>
        {value => {
          const {activeBackgroundIsDark} = value
          const gameConatiner = activeBackgroundIsDark
            ? 'gameDarkCon'
            : 'gameLightCon'
          const gameIcon = activeBackgroundIsDark
            ? 'gameDarkIcon'
            : 'gameLightIcon'

          const renderFailureView = () => (
            <div className={gameConatiner}>
              {activeBackgroundIsDark ? (
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png"
                  alt="failure view"
                />
              ) : (
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
                  alt="failure view"
                />
              )}
              <h1>Oops! Something Went Wrong </h1>
              <p>We are having some trouble to complete your request. </p>
              <p>Please Try again </p>
              <button
                type="button"
                className="retryButton"
                onClick={this.onRetryButton}
              >
                Retry
              </button>
            </div>
          )

          const successView = () => (
            <div className="game_con">
              <ul className={gameConatiner}>
                {gameList.map(eachGame => (
                  <GameItem key={eachGame.id} eachGameVideo={eachGame} />
                ))}
              </ul>
            </div>
          )

          const renderVideosDetailsView = () => {
            const {apiStatus} = this.state

            switch (apiStatus) {
              case apiStatusConstants.success:
                return successView()
              case apiStatusConstants.failure:
                return renderFailureView()
              case apiStatusConstants.inProgress:
                return this.renderLoadingView()
              default:
                return null
            }
          }

          return (
            <div>
              <Header />

              <div className="mainCon5">
                <div className="leftBarCon">
                  <LeftBaner />
                </div>
                <div className={gameIcon}>
                  <h1 className="heading1">
                    {' '}
                    <AiFillHeart className="iconColor" />
                    Game
                  </h1>

                  <div>{renderVideosDetailsView()}</div>
                </div>
              </div>
            </div>
          )
        }}
      </BackgroundChangeContext.Consumer>
    )
  }
}
export default Gaming
