import Cookies from 'js-cookie'
import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {IoMdSearch} from 'react-icons/io'
// import {RxCross1} from 'react-icons/rx'
import {AiOutlineClose} from 'react-icons/ai'
import Loader from 'react-loader-spinner'
import Header from '../Header'

import LeftBaner from '../LeftBaner'
import VideoItem from '../VideoItem'

import BackgroundChangeContext from '../../context/BackgroundChangeContext'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    isTrue: false,
    appList: [],
    input: '',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {input} = this.state
    const apiUrl = `https://apis.ccbp.in/videos/all?search=${input}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const newData = await response.json()

      const updateDate = newData.videos.map(eachItem => ({
        channel: eachItem.channel,
        id: eachItem.id,
        publishedAt: eachItem.published_at,
        thumbnailUrl: eachItem.thumbnail_url,
        title: eachItem.title,
        viewCount: eachItem.view_count,
      }))
      this.setState({
        appList: updateDate,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="products-details-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  crossOnClickFunction = () => {
    // const {isTrue} = this.state
    this.setState({isTrue: true})
  }

  onChangeInputValue = event => {
    this.setState({input: event.target.value})
  }

  onSearchInput = () => {
    this.getProducts()
  }

  onRetryButton = () => {
    this.getProducts()
  }

  render() {
    const {isTrue, appList, input} = this.state
    const lengthOfList = appList.length !== 0

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <BackgroundChangeContext.Consumer>
        {value => {
          const {activeBackgroundIsDark} = value

          const mainListCont = activeBackgroundIsDark ? 'darkCon' : 'lightCon'
          const inputCont = activeBackgroundIsDark
            ? 'darkInputCon'
            : 'inputContainer4'

          const renderFailureView = () => (
            <div>
              {activeBackgroundIsDark ? (
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png"
                  alt="failureView"
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
          const renderSuccessView = () => (
            <div className="videoScrollCon">
              {lengthOfList ? (
                <ul className="videoContainer">
                  {appList.map(eachVideo => (
                    <VideoItem key={eachVideo.id} videoItem={eachVideo} />
                  ))}
                </ul>
              ) : (
                <div className="noResultContainer">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
                    alt="no videos"
                    className="noVideoImage"
                  />
                  <h1>No Search Results found</h1>
                  <p>try different key words or remove search filters</p>
                  <button
                    className="retryButton"
                    type="button"
                    onClick={this.onRetryButton}
                  >
                    Retry
                  </button>
                </div>
              )}
            </div>
          )

          const renderVideosDetailsView = () => {
            const {apiStatus} = this.state

            switch (apiStatus) {
              case apiStatusConstants.success:
                return renderSuccessView()
              case apiStatusConstants.failure:
                return renderFailureView()
              case apiStatusConstants.inProgress:
                return this.renderLoadingView()
              default:
                return null
            }
          }

          return (
            <div className="fixedContainer">
              <div className="headerCon">
                <Header />
              </div>
              <div className="leftContainer">
                <div className="leftBanCon">
                  <LeftBaner />
                </div>
                <div className="rightContainer">
                  <div>
                    {isTrue ? (
                      ''
                    ) : (
                      <div className="imageContainer8">
                        <div>
                          <img
                            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                            alt="website logo"
                            className="websiteLogo1"
                          />
                          <p>Buy Nxt watch premium prepaid plans with UPI</p>
                          <button type="button" className="getButton">
                            {' '}
                            Get It Now
                          </button>
                        </div>
                        <div>
                          <button
                            data-testid="close"
                            type="button"
                            className="closeImageButton"
                            onClick={this.crossOnClickFunction}
                          >
                            <AiOutlineClose />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className={mainListCont}>
                    <div className={inputCont}>
                      <input
                        type="search"
                        placeholder="Search"
                        value={input}
                        onChange={this.onChangeInputValue}
                        className="input12"
                      />
                      <button type="button" onClick={this.onSearchInput}>
                        <IoMdSearch />
                      </button>
                    </div>
                    {renderVideosDetailsView()}
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
export default Home
