import { PartialType } from '@nestjs/mapped-types';
import { CreateSlateDocDto } from './create-slate-doc.dto';

export class UpdateSlateDocDto extends PartialType(CreateSlateDocDto) {
  id: number;
}
