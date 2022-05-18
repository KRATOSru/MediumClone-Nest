import {UserEntity} from './user.entity'
import {CreateUserDto} from './dto/createUser.dto'
import {Injectable} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}
  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const newUser = new UserEntity()//instance,,,
    Object.assign(newUser, createUserDto)
    return await this.userRepository.save(newUser)
  }
}
