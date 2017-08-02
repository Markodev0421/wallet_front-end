import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createBrowserHistory } from 'history'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { coreMiddleware } from 'dream-wallet/lib'
import autoDisconnection from 'middleware/autoDisconnection.js'
import notifications from 'middleware/notifications.js'
import { rootSaga, rootReducer } from 'data'
import settings from 'config'
import { api } from 'services/ApiService'
import { socket } from 'services/Socket'
import { auth } from 'data/rootSelectors.js'
import { serializer } from 'dream-wallet/lib/types'

const devToolsConfig = {
  serialize: serializer,
  actionsBlacklist: []
}

const configureStore = () => {
  const history = createBrowserHistory()
  const sagaMiddleware = createSagaMiddleware()
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(devToolsConfig) : compose
  const walletPath = settings.WALLET_IMMUTABLE_PATH
  const reduxRouterMiddleware = routerMiddleware(history)

  const store = createStore(
    connectRouter(history)(rootReducer),
    composeEnhancers(
      applyMiddleware(
        reduxRouterMiddleware,
        autoDisconnection,
        notifications,
        // coreMiddleware.walletSync({isAuthenticated: auth.getIsAuthenticated, api, walletPath}),
        coreMiddleware.socket({ socket, walletPath, isAuthenticated: auth.getIsAuthenticated }),
        sagaMiddleware
      )
    )
  )
  sagaMiddleware.run(rootSaga)

  return {
    store,
    history
  }
}

export default configureStore
