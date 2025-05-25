import { Injectable } from '@nestjs/common';
import { CreateDocumentDto } from './dto/create-document.dto';
import { Document } from './entities/document.entity';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class DocumentService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createDocumentDto: CreateDocumentDto): Promise<Document> {
    // Create a dummy user if not exists for testing purposes
    const user = await this.ensureUser(createDocumentDto.createdBy);

    const document = await this.prisma.document.create({
      data: {
        title: createDocumentDto.title,
        ownerId: user.id,
        content: {
          create: {
            content: createDocumentDto.content ? JSON.parse(createDocumentDto.content) : {},
            rawContent: createDocumentDto.content || '',
          },
        },
      },
      include: {
        content: true,
        owner: true,
      },
    });

    // Convert to the Document entity format
    return {
      id: document.id,
      title: document.title,
      content: document.content?.rawContent || '',
      createdBy: document.owner.name || document.owner.email,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    };
  }

  async findAll(): Promise<Document[]> {
    const documents = await this.prisma.document.findMany({
      include: {
        content: true,
        owner: true,
      },
    });

    return documents.map(doc => ({
      id: doc.id,
      title: doc.title,
      content: doc.content?.rawContent || '',
      createdBy: doc.owner.name || doc.owner.email,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    }));
  }

  async findOne(id: string): Promise<Document | undefined> {
    const document = await this.prisma.document.findUnique({
      where: { id },
      include: {
        content: true,
        owner: true,
      },
    });

    if (!document) return undefined;

    return {
      id: document.id,
      title: document.title,
      content: document.content?.rawContent || '',
      createdBy: document.owner.name || document.owner.email,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    };
  }

  // Helper method to ensure a user exists
  private async ensureUser(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (user) return user;

    return this.prisma.user.create({
      data: {
        email,
        name: email.split('@')[0],
      },
    });
  }
} 