import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signup(email: string, password: string) {
    //see if email is in use
    const users = await this.userService.find(email);

    if (users.length) {
      throw new BadRequestException('User with email already exists!');
    }

    //hash the user password
    //create salt
    const salt = randomBytes(8).toString('hex');

    //hash the salt and password together
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    //join the hashed result and salt together
    const result = salt + '.' + hash.toString('hex');

    //create a user and store it
    const user = this.userService.create(email, result);

    return user;
  }

  async signin(email: string, password: string) {
    const [user] = await this.userService.find(email);

    if (!user) {
      throw new NotFoundException('User with this email does not exist!');
    }

    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('Wrong crdentials!');
    }
    return user;
  }
}
