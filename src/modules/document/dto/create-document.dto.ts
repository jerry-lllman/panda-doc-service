import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreateDocumentDto {
  @ApiProperty({
    description: 'The title of the document',
    example: 'My Document',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'The icon of the document',
    example: 'happy',
  })
  @IsString()
  @IsNotEmpty()
  icon: string;

  @ApiProperty({
    description: 'The content of the document',
    example: 'This is the content of the document',
  })
  @IsString()
  content: string = '';

  @ApiProperty({
    description: 'The created by of the document',
    example: 'Jerry',
  })
  @IsString()
  @IsNotEmpty()
  createdBy: string;
}