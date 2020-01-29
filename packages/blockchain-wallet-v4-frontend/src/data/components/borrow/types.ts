import * as AT from './actionTypes'
import { CoinType, NabuApiErrorType, RemoteDataType } from 'core/types'

// Types
export type OfferType = {
  callTerms: {
    callTriggerRatio: number
    liquidationHardRatio: number
    marginTopupTime: number
    minutesBeforeLiquidation: number
  }
  id: string
  status: 'OPEN'
  terms: {
    collateralCcy: CoinType
    collateralRatio: number
    durationHours: number
    format: 'FLEX'
    interestRate: number
    maxYieldingAmount: {
      symbol: CoinType
      value: number
    }
    minPrincipalAmount: {
      symbol: CoinType
      value: number
    }
    principalCcy: CoinType
  }
}

export type BorrowFormValuesType = {
  collateral: any
  maxCollateral?: number
  maxCollateralCounter?: string
  offer: OfferType
  principal: string
}

export type BorrowMinMaxType = {
  maxCrypto: number
  maxFiat: number
  minCrypto: number
  minFiat: number
}

// TODO: move to ticker
export type RatesType = {
  [key in string]: {
    '15m': number
    buy: number
    last: number
    sell: number
    symbol: '$'
  }
}

// TODO: move to payments
export type UTXOType = {
  address: string
  change: boolean
  index: number
  path: string
  script: string
  txHash: string
  value: number
  xpub: {
    m: string
    path: string
  }
}

export type PaymentType = {
  amount: (n: number) => PaymentType
  change: string
  coins: Array<UTXOType>
  effectiveBalance: number
  fee: number
  fees: {
    limits: {
      max: number
      min: number
    }
    priority: number
    regular: number
  }
  from: Array<string>
  fromAccountIdx: number
  fromType:
    | 'ACCOUNT'
    | 'LEGACY'
    | 'WATCH_ONLY'
    | 'EXTERNAL'
    | 'LOCKBOX'
    | 'ADDRESS'
  sign: (pw: string) => PaymentType
  to: (address: string) => PaymentType
  value: () => PaymentType
}

// State
export interface BorrowState {
  borrowHistory: RemoteDataType<NabuApiErrorType, any>
  coin: CoinType
  limits: BorrowMinMaxType
  offer: OfferType | null
  offers: RemoteDataType<NabuApiErrorType, Array<OfferType>>
  payment: RemoteDataType<string | Error, PaymentType>
}

// Actions
interface FetchBorrowOffersFailureAction {
  payload: {
    error: NabuApiErrorType
  }
  type: typeof AT.FETCH_BORROW_OFFERS_FAILURE
}

interface FetchBorrowOffersLoadingAction {
  type: typeof AT.FETCH_BORROW_OFFERS_LOADING
}
interface FetchBorrowOffersSuccessAction {
  payload: {
    offers: Array<OfferType>
  }
  type: typeof AT.FETCH_BORROW_OFFERS_SUCCESS
}
interface FetchUserBorrowHistoryFailureAction {
  payload: {
    error: NabuApiErrorType
  }
  type: typeof AT.FETCH_USER_BORROW_HISTORY_FAILURE
}

interface FetchUserBorrowHistoryLoadingAction {
  type: typeof AT.FETCH_USER_BORROW_HISTORY_LOADING
}
interface FetchUserBorrowHistorySuccessAction {
  payload: {
    borrowHistory: any
  }
  type: typeof AT.FETCH_USER_BORROW_HISTORY_SUCCESS
}
interface InitializeBorrowAction {
  payload: {
    coin: CoinType
    offer: OfferType
  }
  type: typeof AT.INITIALIZE_BORROW
}

interface SetLimitsAction {
  payload: {
    limits: BorrowMinMaxType
  }
  type: typeof AT.SET_LIMITS
}

interface SetOfferAction {
  payload: {
    offer: OfferType | null
  }
  type: typeof AT.SET_OFFER
}

interface SetPaymentFailureAction {
  payload: {
    error: string | Error
  }
  type: typeof AT.SET_PAYMENT_FAILURE
}

interface SetPaymentLoadingAction {
  type: typeof AT.SET_PAYMENT_LOADING
}

interface SetPaymentSuccessAction {
  payload: {
    payment: PaymentType
  }
  type: typeof AT.SET_PAYMENT_SUCCESS
}

export type BorrowActionTypes =
  | FetchBorrowOffersFailureAction
  | FetchBorrowOffersLoadingAction
  | FetchBorrowOffersSuccessAction
  | FetchUserBorrowHistoryFailureAction
  | FetchUserBorrowHistoryLoadingAction
  | FetchUserBorrowHistorySuccessAction
  | InitializeBorrowAction
  | SetLimitsAction
  | SetOfferAction
  | SetPaymentFailureAction
  | SetPaymentLoadingAction
  | SetPaymentSuccessAction
