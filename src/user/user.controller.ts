import { UserEntity } from './user.entity';
import {CreateUserDto} from './dto/createUser.dto'
import {UserService} from './user.service'
import {Body, Controller, Post} from '@nestjs/common'

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('users')
  async createUser(@Body('user') createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.userService.createUser(createUserDto)
  }
}
