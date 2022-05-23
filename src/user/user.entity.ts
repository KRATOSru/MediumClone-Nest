import {BeforeInsert, Column, Entity, PrimaryGeneratedColumn} from 'typeorm'
import {hash} from 'bcrypt'

@Entity({name: 'users'})
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  email: String

  @Column()
  username: String

  @Column({default: ''})
  bio: String

  @Column({default: ''})
  image: String

  @Column()
  password: String

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10)
  }
}
