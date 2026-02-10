import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { User } from '../../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { PaginationDto } from '../../common/dto/pagination.dto.js';
import { DEFAULT_PAGE_SIZE } from '../../common/util/common.constants.js';
import { HashingService } from '../../auth/hashing/hashing.service.js';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hashingService: HashingService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User | null> {
    const { password } = createUserDto;
    const hashedPassword = await this.hashingService.hash(password);
    const user = await this.prisma.user.create({
      data: { ...createUserDto, password: hashedPassword },
    });

    return user;
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit, offset } = paginationDto;

    return await this.prisma.user.findMany({
      skip: offset,
      take: limit ?? DEFAULT_PAGE_SIZE.USERS,
    });
  }

  async findOne(id: number) {
    return await this.prisma.user.findUniqueOrThrow({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { password } = updateUserDto;
    const hashedPassword =
      password && (await this.hashingService.hash(password));

    const user = await this.prisma.user.update({
      where: { id },
      data: { ...updateUserDto, password: hashedPassword },
    });
    if (!user) throw new NotFoundException('User not found!');

    return user;
  }

  async remove(id: number) {
    return await this.prisma.user.delete({ where: { id } });
  }
}
