import {Component} from 'react'
import Cookies from 'js-cookie'

import {AiFillFire} from 'react-icons/ai'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import LeftBaner from '../LeftBaner'
import TrendingItem from '../TrendingItem'

import BackgroundChangeContext from '../../context/BackgroundChangeContext'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Trending extends Component {
  state = {trendingList: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getTrendingFunct()
  }

  getTrendingFunct = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const apiUrl = 'https://apis.ccbp.in/videos/trending'
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      //   console.log('trending', data)
      const updateTrendingList = data.videos.map(eachVideo => ({
        id: eachVideo.id,
        channel: eachVideo.channel,
        publishedAt: eachVideo.published_at,
        thumbnailUrl: eachVideo.thumbnail_url,
        title: eachVideo.title,
        viewCount: eachVideo.view_count,
      }))
      this.setState({
        trendingList: updateTrendingList,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onRetryButton = () => {
    this.getTrendingFunct()
  }

  renderLoadingView = () => (
    <div className="products-details-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  render() {
    const {trendingList} = this.state
    console.log(trendingList)
    return (
      <BackgroundChangeContext.Consumer>
        {value => {
          const {activeBackgroundIsDark} = value
          const trendingContainerMain = activeBackgroundIsDark
            ? 'darkTrendCon4'
            : 'lightTrendCon4'
          const gameIcon = activeBackgroundIsDark
            ? 'gameDarkIcon4'
            : 'gameLightIcon4'

          const renderFailureView = () => (
            <div className={trendingContainerMain}>
              {activeBackgroundIsDark ? (
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png"
                  alt="failure view"
                />
              ) : (
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
                  alt="failureView"
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
            <div className={trendingContainerMain}>
              <ul>
                {trendingList.map(eachItem => (
                  <TrendingItem key={eachItem.id} trendingViItem={eachItem} />
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
              <div className={trendingContainerMain}>
                <div className="leftBanCon">
                  <LeftBaner />
                </div>

                <div>
                  <div className={gameIcon}>
                    <h1 className="heading1">
                      {' '}
                      <AiFillFire className="iconColor" />
                      Trending
                    </h1>

                    <div className="trendCon8">{renderVideosDetailsView()}</div>
                  </div>
                </div>
              </div>
            </div>
          )
        }}
      </BackgroundChangeContext.Consumer>
    )
  }
}
export default Trending
