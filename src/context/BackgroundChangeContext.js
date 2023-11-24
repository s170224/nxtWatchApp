import React from 'react'

const BackgroundChangeContext = React.createContext({
  activeBackgroundIsDark: false,
  savesListItems: [],
  activeTab: '',
  changeActiveTab: () => {},
  changeSavesListIt: () => {},
  changeBackground: () => {},
})

export default BackgroundChangeContext
