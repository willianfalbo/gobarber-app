import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import BaseEntity from '@shared/base.entity';

@Entity('users')
class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ name: 'avatar_filename', nullable: true })
  avatarFilename: string;
}

export default User;
