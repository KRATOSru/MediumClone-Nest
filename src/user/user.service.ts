import {CreateUserDto} from './dto/createUser.dto'
import {Injectable} from '@nestjs/common'
// import {InjectRepository} from '@nestjs/typeorm'

@Injectable()
export class UserService {
  async createUser(createUserDto: CreateUserDto) {
    return createUserDto
  }
}
