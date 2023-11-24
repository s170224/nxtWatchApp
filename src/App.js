import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Gaming from './components/Gaming'
import Trending from './components/Trending'
import NotFound from './components/NotFound'

import VideoItemDetails from './components/VideoItemDetails'

import BackgroundChangeContext from './context/BackgroundChangeContext'
import './App.css'
import SavedVideos from './components/SavedVideos'
import ProtectedRoute from './components/ProtectedRoute'

class App extends Component {
  state = {activeBackgroundIsDark: false, savesListItems: [], activeTab: ''}

  changeSavesListItems = product => {
    const {savesListItems} = this.state
    const checkedSaveVideo = savesListItems.find(
      eachVideo1 => eachVideo1.id === product.id,
    )
    console.log('triggerd')
    if (checkedSaveVideo) {
      this.setState(prevState => ({
        savesListItems: prevState.savesListItems,
      }))
    } else {
      this.setState(prevState => ({
        savesListItems: [...prevState.savesListItems, product],
      }))
    }
  }

  changeActiveTab = active => {
    this.setState({activeTab: active})
  }

  changeBackground = () => {
    const {activeBackgroundIsDark} = this.state
    this.setState({activeBackgroundIsDark: !activeBackgroundIsDark})
  }

  render() {
    const {activeBackgroundIsDark, savesListItems, activeTab} = this.state

    // console.log('activetab', activeTab)

    return (
      <BackgroundChangeContext.Provider
        value={{
          activeBackgroundIsDark,
          savesListItems,
          activeTab,
          changeBackground: this.changeBackground,
          changeSavesListItems: this.changeSavesListItems,
          changeActiveTab: this.changeActiveTab,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute exact path="/Trending" component={Trending} />
          <ProtectedRoute exact path="/savedVideos" component={SavedVideos} />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoItemDetails}
          />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </BackgroundChangeContext.Provider>
    )
  }
}

export default App
