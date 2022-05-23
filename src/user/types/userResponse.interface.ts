import {UserEntity} from './../user.entity'
import { UserType } from './userType'

export interface UserResponseInterface {
  user: UserType & {token: string}
}
