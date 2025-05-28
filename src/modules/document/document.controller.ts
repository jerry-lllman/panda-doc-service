import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DocumentService } from './document.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { Document } from './entities/document.entity';

@ApiTags('documents')
@Controller('documents')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) { }

  @Post()
  @ApiResponse({ type: Document })
  @ApiOperation({ summary: 'Create a new document' })
  async create(@Body() createDocumentDto: CreateDocumentDto): Promise<Document> {
    return this.documentService.create(createDocumentDto);
  }

  @Get()
  @ApiResponse({ type: [Document] })
  @ApiOperation({ summary: 'Get all documents' })
  async findAll(): Promise<Document[]> {
    return this.documentService.findAll();
  }

  @Get(':id')
  @ApiResponse({ type: Document })
  @ApiOperation({ summary: 'Get a document by id' })
  async findOne(@Param('id') id: string): Promise<Document> {
    return this.documentService.findOne(id);
  }

  @Put(':id')
  @ApiResponse({ type: Document })
  @ApiOperation({ summary: 'Update a document by id' })
  async update(@Param('id') id: string, @Body() updateDocumentDto: UpdateDocumentDto): Promise<Document> {
    return this.documentService.update(id, updateDocumentDto);
  }
} 