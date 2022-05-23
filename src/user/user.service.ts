import {UserResponseInterface} from './types/userResponse.interface'
import {UserEntity} from './user.entity'
import {CreateUserDto} from './dto/createUser.dto'
import {HttpException, HttpStatus, Injectable} from '@nestjs/common'
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
    const userByEmail = await this.userRepository.findOne({
      email: createUserDto.email,
    })
    const userByUsername = await this.userRepository.findOne({
      username: createUserDto.username,
    })
    if (userByEmail || userByUsername) {
      throw new HttpException('Email or username are taken', HttpStatus.UNPROCESSABLE_ENTITY)
    }

    const newUser = new UserEntity() //instead
    Object.assign(newUser, createUserDto)
    return await this.userRepository.save(newUser)
  }

  generateJwt(user: UserEntity): string {
    //string not String(mistake)
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
