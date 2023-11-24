import {Link} from 'react-router-dom'
import {formatDistanceToNow, parse} from 'date-fns'

import BackgroundChangeContext from '../../context/BackgroundChangeContext'

import './index.css'

const VideoItem = props => {
  const {videoItem} = props
  const {channel, id, publishedAt, thumbnailUrl, title, viewCount} = videoItem
  const dateObject = new Date(publishedAt)
  //   console.log(dateObject)
  const differenceInYears = formatDistanceToNow(dateObject, {
    addSuffix: false,
    unit: 'year',
  })

  const newSubString = differenceInYears.substring(5)

  return (
    <BackgroundChangeContext.Consumer>
      {value => {
        const {activeBackgroundIsDark} = value
        const onChangeLink = activeBackgroundIsDark
          ? 'linkTheVideoWhite'
          : 'linkTheVideo'

        return (
          <li className="listContainer">
            <Link to={`/videos/${id}`} className={onChangeLink}>
              <div>
                <img src={thumbnailUrl} alt={title} className="image1" />
                <div className="container4">
                  <div>
                    <img
                      src={channel.profile_image_url}
                      alt={channel.name}
                      className="profileImage"
                    />
                  </div>
                  <div className="chanCon">
                    <p>{title}</p>
                    <p>{channel.name}</p>
                    <div className="difCon">
                      <p>{viewCount}Views</p>
                      <p className="year1">{newSubString} ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        )
      }}
    </BackgroundChangeContext.Consumer>
  )
}

export default VideoItem
