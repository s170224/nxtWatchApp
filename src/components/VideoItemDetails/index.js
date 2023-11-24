import {Component} from 'react'
import Cookies from 'js-cookie'
import ReactPlayer from 'react-player'
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiOutlineDownload,
} from 'react-icons/ai'
// import {PiListPlusFill} from 'react-icons/pi'

import {formatDistanceToNow} from 'date-fns'

import Loader from 'react-loader-spinner'
import Header from '../Header'
import LeftBaner from '../LeftBaner'

import BackgroundChangeContext from '../../context/BackgroundChangeContext'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class VideoItemDetails extends Component {
  state = {
    eachVideo: [],
    isLike: false,
    isDisLike: false,
    isSave: false,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getEachVideoFunct()
  }

  getEachVideoFunct = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log('eachV', data)
      const updateDate = {
        id: data.video_details.id,
        channel: data.video_details.channel,
        channelUrl: data.video_details.channel.profile_image_url,
        channelName: data.video_details.channel.name,
        channelSubscribers: data.video_details.channel.subscriber_count,
        description: data.video_details.description,
        publishedAt: data.video_details.published_at,
        thumbnailUrl: data.video_details.thumbnail_url,
        title: data.video_details.title,
        videoUrl: data.video_details.video_url,
        viewCount: data.video_details.view_count,
      }
      this.setState({
        eachVideo: updateDate,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickLikeButton = () => {
    this.setState({isLike: true, isDisLike: false})
  }

  onClickDisLike = () => {
    this.setState({isDisLike: true, isLike: false})
  }

  onClickSave = () => {
    this.setState({isSave: true})
  }

  onRetryButton1 = () => {
    this.getEachVideoFunct()
  }

  render() {
    const {eachVideo} = this.state

    return (
      <BackgroundChangeContext.Consumer>
        {value => {
          const {isLike, isDisLike, isSave} = this.state
          console.log(eachVideo)
          const {activeBackgroundIsDark, changeSavesListItems} = value

          const onAddSaveVideos = () => {
            changeSavesListItems(eachVideo)
            this.setState({isSave: true})
            console.log('eachItemVi', eachVideo)
          }

          const eachDatailContainerVideo = activeBackgroundIsDark
            ? 'eachDarkTheme'
            : 'eachLightTheme'
          const isChangeBackLike = activeBackgroundIsDark
            ? 'isDark1'
            : 'isList1'

          const onLikeClass = isLike ? 'isLikeTrue' : isChangeBackLike
          const onDisLike = isDisLike ? 'isLikeTrue' : isChangeBackLike
          const onSaveButton = isSave ? 'isLikeTrue' : isChangeBackLike

          const renderLoadingView1 = () => (
            <div
              className="products-details-loader-container"
              data-testid="loader"
            >
              <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
            </div>
          )
          const renderFailureView1 = () => (
            <div className={eachDatailContainerVideo}>
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
              <p>
                We are having some trouble to complete your request. Please try
                again
              </p>

              <button
                type="button"
                className="retryButton"
                onClick={this.onRetryButton}
              >
                Retry
              </button>
            </div>
          )

          const successView1 = () => (
            <div className={eachDatailContainerVideo}>
              <div className="reactPlayer1">
                <ReactPlayer
                  url={eachVideo.videoUrl}
                  controls
                  className="videoImage"
                  width="100%"
                  height="100%"
                />
              </div>
              <h3>{eachVideo.title}</h3>
              <div className="lickCon">
                <div className="publishCon">
                  <p>{eachVideo.viewCount}Views</p>
                  <p className="para2">*{eachVideo.publishedAt}</p>
                </div>
                <div>
                  <button
                    // className={` ${isChangeBackLike} ${onLikeClass}`}
                    className={onLikeClass}
                    type="button"
                    onClick={this.onClickLikeButton}
                  >
                    <AiOutlineLike />
                    Like
                  </button>
                  <button
                    type="button"
                    onClick={this.onClickDisLike}
                    className={onDisLike}
                  >
                    <AiOutlineDislike />
                    Dislike
                  </button>
                  {isSave ? (
                    <button
                      type="button"
                      onClick={onAddSaveVideos}
                      className={onSaveButton}
                    >
                      <AiOutlineDownload />
                      Saved
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={onAddSaveVideos}
                      className={onSaveButton}
                    >
                      <AiOutlineDownload />
                      Save
                    </button>
                  )}
                </div>
              </div>
              <hr />
              <div className="subscribersCon">
                <img
                  src={eachVideo.channelUrl}
                  alt={eachVideo.channelName}
                  className="image3"
                />
                <div>
                  <h3>{eachVideo.channelName}</h3>
                  <p>{eachVideo.channelSubscribers}Subscribers</p>
                  <h4>{eachVideo.description}</h4>
                </div>
              </div>
            </div>
          )

          const renderVideosDetailsView1 = () => {
            const {apiStatus} = this.state

            switch (apiStatus) {
              case apiStatusConstants.success:
                return successView1()
              case apiStatusConstants.failure:
                return renderFailureView1()
              case apiStatusConstants.inProgress:
                return renderLoadingView1()
              default:
                return null
            }
          }

          return (
            <div>
              <Header />
              <div className="video-container">
                <div className="letWidth">
                  <LeftBaner />
                </div>
                <div>{renderVideosDetailsView1()}</div>
              </div>
            </div>
          )
        }}
      </BackgroundChangeContext.Consumer>
    )
  }
}
export default VideoItemDetails
