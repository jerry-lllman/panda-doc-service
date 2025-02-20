import { Injectable } from '@nestjs/common';
import { CreateSlateDocDto } from './dto/create-slate-doc.dto';
import { UpdateSlateDocDto } from './dto/update-slate-doc.dto';

@Injectable()
export class SlateDocService {
  create(createSlateDocDto: CreateSlateDocDto) {
    return 'This action adds a new slateDoc';
  }

  findAll() {
    return `This action returns all slateDoc`;
  }

  findOne(id: number) {
    return `This action returns a #${id} slateDoc`;
  }

  update(id: number, updateSlateDocDto: UpdateSlateDocDto) {
    return `This action updates a #${id} slateDoc`;
  }

  remove(id: number) {
    return `This action removes a #${id} slateDoc`;
  }
}
