import {UserResponseInterface} from './types/userResponse.interface'
import {UserEntity} from './user.entity'
import {CreateUserDto} from './dto/createUser.dto'
import {Injectable} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import {sign} from 'jsonwebtoken'
import {JWT_SECRET} from '@app/config'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}
  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const newUser = new UserEntity() //instead
    Object.assign(newUser, createUserDto)
    return await this.userRepository.save(newUser)
  }

  generateJwt(user: UserEntity): string { //string not String(mistake)
    return sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      JWT_SECRET
    )
  }
  buildUserResponse(user: UserEntity): UserResponseInterface {
    return {
      user: {
        ...user,
        token: this.generateJwt(user),
      },
    }
  }
}
