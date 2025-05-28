import { Injectable } from '@nestjs/common';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { Document } from './entities/document.entity';
import { PrismaService } from '../../prisma/prisma.service';
import { BusinessException } from '@/common/exceptions/business.exception';
import { ErrorEnum } from '@/constants/error-code.constant';

@Injectable()
export class DocumentService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createDocumentDto: CreateDocumentDto): Promise<Document> {
    // Create a dummy user if not exists for testing purposes
    const user = await this.ensureUser(createDocumentDto.createdBy);

    const document = await this.prisma.document.create({
      data: {
        title: createDocumentDto.title,
        icon: createDocumentDto.icon,
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
      icon: document.icon,
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
      icon: doc.icon,
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

    if (!document) {
      throw new BusinessException(ErrorEnum.DOCUMENT_DOES_NOT_EXIST);
    };

    return {
      id: document.id,
      title: document.title,
      content: document.content?.rawContent || '',
      icon: document.icon,
      createdBy: document.owner.name || document.owner.email,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    };
  }

  async update(id: string, updateDocumentDto: UpdateDocumentDto): Promise<Document> {
    // Check if document exists
    const existingDocument = await this.prisma.document.findUnique({
      where: { id },
      include: { content: true }
    });

    if (!existingDocument) {
      throw new BusinessException(ErrorEnum.DOCUMENT_DOES_NOT_EXIST);
    }

    // 提取基本字段和内容字段
    const { content, ...documentFields } = updateDocumentDto;

    // 构建更新数据，只包含提供的字段
    const updateData = {
      ...documentFields,
      // 只有当内容被提供时才更新内容
      ...(content !== undefined && {
        content: {
          update: {
            content: JSON.parse(content),
            rawContent: content,
          }
        }
      })
    };

    // Update the document with only the provided fields
    const updatedDocument = await this.prisma.document.update({
      where: { id },
      data: updateData,
      include: {
        content: true,
        owner: true,
      },
    });

    return {
      id: updatedDocument.id,
      title: updatedDocument.title,
      content: updatedDocument.content?.rawContent || '',
      icon: updatedDocument.icon,
      createdBy: updatedDocument.owner.name || updatedDocument.owner.email,
      createdAt: updatedDocument.createdAt,
      updatedAt: updatedDocument.updatedAt,
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