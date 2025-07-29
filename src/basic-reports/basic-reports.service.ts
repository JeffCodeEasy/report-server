import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BasicReportsService {

    constructor(
        private prisma: PrismaService,
    ){}

    async hello(){
        return await this.prisma.employees.findFirst();
    }

}
