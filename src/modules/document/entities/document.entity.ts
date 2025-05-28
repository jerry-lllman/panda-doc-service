import { ApiProperty } from '@nestjs/swagger'
import { IsDate, IsNotEmpty, IsString } from 'class-validator'
// 基本的返回类型定义
export class Document {
  @ApiProperty({
    description: 'The ID of the document',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    description: 'The title of the document',
    example: 'My Document',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'The content of the document',
    example: 'This is the content of the document',
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    description: 'The icon of the document',
    example: 'https://example.com/icon.png',
  })
  @IsString()
  @IsNotEmpty()
  icon: string;

  @ApiProperty({
    description: 'The created by of the document',
    example: 'Jerry',
  })
  @IsString()
  @IsNotEmpty()
  createdBy: string;

  @ApiProperty({
    description: 'The created at of the document',
    example: '2021-01-01',
  })
  @IsDate()
  @IsNotEmpty()
  createdAt: Date;

  @ApiProperty({
    description: 'The updated at of the document',
    example: '2021-01-01',
  })
  @IsDate()
  @IsNotEmpty()
  updatedAt: Date;

} 