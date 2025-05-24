import { Injectable } from '@nestjs/common';
import { CreateDocumentDto } from './dto/create-document.dto';
import { Document } from './entities/document.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class DocumentService {
  // 暂时使用内存存储，后续可以替换为数据库
  private documents: Document[] = [];

  async create(createDocumentDto: CreateDocumentDto): Promise<Document> {
    const now = new Date();
    const document: Document = {
      id: uuidv4(),
      title: createDocumentDto.title,
      content: createDocumentDto.content || '',
      createdBy: createDocumentDto.createdBy,
      createdAt: now,
      updatedAt: now,
    };

    this.documents.push(document);
    console.log('documents', this.documents);
    return document;
  }

  async findAll(): Promise<Document[]> {
    return this.documents;
  }

  async findOne(id: string): Promise<Document | undefined> {
    return this.documents.find(doc => doc.id === id);
  }
} 