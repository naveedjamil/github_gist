import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { Route } from 'react-router-dom'
import App from './App'
import GistPage from './GistPage'

const Root = ({ store }) => (
  <Provider store={store}>
    <div>
      <Route path="/" component={App} />
      <Route path="/:username"
             component={GistPage} />
    </div>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired,
}

export default Root
