import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DocumentService } from './document.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { Document } from './entities/document.entity';

@Controller('documents')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) { }

  @Post()
  async create(@Body() createDocumentDto: CreateDocumentDto): Promise<Document> {
    return this.documentService.create(createDocumentDto);
  }

  @Get()
  async findAll(): Promise<Document[]> {
    return this.documentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Document> {
    return this.documentService.findOne(id);
  }
} 