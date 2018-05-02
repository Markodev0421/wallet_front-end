import { takeLatest } from 'redux-saga/effects'
import * as AT from './actionTypes'
import sagas from './sagas'

export default ({ api, options }) => {
  const dataSfoxSagas = sagas({ api, options })

  return function * () {
    yield takeLatest(AT.FETCH_METADATA_BUYSELL_SUCCESS, dataSfoxSagas.init)
    yield takeLatest(AT.SFOX_FETCH_ACCOUNTS, dataSfoxSagas.fetchAccounts)
    yield takeLatest(AT.FETCH_PROFILE, dataSfoxSagas.fetchProfile)
    yield takeLatest(AT.FETCH_TRADES, dataSfoxSagas.fetchTrades)
    yield takeLatest(AT.SFOX_FETCH_QUOTE, dataSfoxSagas.fetchQuote)
    yield takeLatest(AT.SFOX_FETCH_SELL_QUOTE, dataSfoxSagas.fetchSellQuote)
    yield takeLatest(AT.GET_BANK_ACCOUNTS, dataSfoxSagas.getBankAccounts)
    yield takeLatest(AT.RESET_PROFILE, dataSfoxSagas.resetProfile)
  }
}
