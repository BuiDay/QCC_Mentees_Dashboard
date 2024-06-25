import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ICourse } from '../../../types'

interface IUser {
  _id?: string
  name?: string
  menteeId?: string
  email?: string
  address?: {
    distric: string,
    province: string
  }
  gender?: string
  phone?: string
  yearOfBirth: string
  jobOrientation: string
  skills: string
  courses: Array<ICourse>
  universityName?: string
  engLevel?: string
  level?: string
  linkPortfolio?: string
  linkProject?: string[]
  companyNumber?: string
  jobNumber?: string
  attitudeScore?: number
  thinkingScore?: number
  updatedAt?: Date
  isUpdate: boolean,
  avatar?: {
    public_id: string,
    url: string,
  };
}

interface IinitialState {
  token?: string
  user?: IUser
}

const initialState: IinitialState = {
  token: '',
  user: undefined
}

const authSilce = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userRegistration: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token
    },
    userLoggedIn: (state, action: PayloadAction<{ accessToken: string; user: IUser }>) => {
      state.token = action.payload.accessToken
      state.user = action.payload.user
    },
    userUpdateAvatar: (state, action: PayloadAction<{ user: IUser }>) => {
      state.user = action.payload.user
    },
    userLoggedOut: (state) => {
      state.token = ''
      state.user = undefined
    }
  }
})

export const { userRegistration, userLoggedIn, userLoggedOut ,userUpdateAvatar} = authSilce.actions
export default authSilce.reducer
