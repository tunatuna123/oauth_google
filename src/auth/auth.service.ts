import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserDto } from './user/user.dto';
import { Profile } from 'passport-google-oauth20';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async validateUser(email: string, name: string, photo: string) {
    console.log('Attempting to validate user');
    console.log('Email:', email);
    console.log('Name:', name);
    console.log('Photo:', photo);

    const user = await this.prisma.user.findUnique({
      where: { email: String(email) },
    });
    console.log('User:', user);

    if (user) {
      return user;
    }
    console.log('Creating user');
    return await this.prisma.user.create({
      data: {
        email: String(email),
        name: String(name),
        photo: String(photo),
      },
    });
  }
}
