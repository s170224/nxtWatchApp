import {Link} from 'react-router-dom'

import BackgroundChangeContext from '../../context/BackgroundChangeContext'

import './index.css'

const TrendingItem = props => {
  const {trendingViItem} = props
  const {
    id,
    channel,
    publishedAt,
    thumbnailUrl,
    title,
    viewCount,
  } = trendingViItem

  return (
    <BackgroundChangeContext.Consumer>
      {value => {
        const {activeBackgroundIsDark} = value
        const trendingItemCon = activeBackgroundIsDark
          ? 'trendingItemDark'
          : 'trendingItemLight'
        return (
          <li className="trendCon">
            <Link to={`/videos/${id}`} className={trendingItemCon}>
              <div className="main-cont">
                <img
                  src={thumbnailUrl}
                  alt={title}
                  className="trendingImage1"
                />
                <div className="containerTrade">
                  <h3>{title}</h3>
                  <p>{channel.name}</p>
                  <p>{viewCount}Views</p>
                  {/* <p>{newYears}</p> */}
                </div>
              </div>
            </Link>
          </li>
        )
      }}
    </BackgroundChangeContext.Consumer>
  )
}

export default TrendingItem
