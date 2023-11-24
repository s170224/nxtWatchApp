import {Link} from 'react-router-dom'

import BackgroundChangeContext from '../../context/BackgroundChangeContext'
import './index.css'

const GameItem = props => {
  const {eachGameVideo} = props
  const {thumbnailUrl, id, title, viewCount} = eachGameVideo

  return (
    <BackgroundChangeContext.Consumer>
      {value => {
        const {activeBackgroundIsDark} = value
        const eachGameCon = activeBackgroundIsDark
          ? 'eachGameDarkCon'
          : 'eachGameLightCon'

        const linkTheVedieoGame = activeBackgroundIsDark
          ? 'linkDarkGame'
          : 'linkLightGame'

        return (
          <li className={eachGameCon}>
            <Link to={`/videos/${id}`} className={linkTheVedieoGame}>
              <div>
                <img src={thumbnailUrl} alt={title} className="gameImage" />
                <h3>{title}</h3>
                <p>{viewCount} Watching world wide</p>
              </div>
            </Link>
          </li>
        )
      }}
    </BackgroundChangeContext.Consumer>
  )
}
export default GameItem
