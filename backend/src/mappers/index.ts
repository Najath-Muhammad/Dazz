import { Document } from 'mongoose';

/**
 * Base mapper that strips internal tracking fields and version keys from Mongoose documents.
 */
export class BaseMapper {
  static toDTO<T = any>(doc: SafeAny): T {
    if (!doc) return doc;

    // Convert to plain object if it's a Mongoose document
    const obj = (typeof doc.toObject === 'function') ? doc.toObject() : { ...doc };

    // Standard mappings
    if (obj._id) {
      obj.id = obj._id.toString();
      delete obj._id;
    }

    // Strip internal fields
    delete obj.__v;
    delete obj.translationStatus;
    delete obj.translationMeta;

    return obj as T;
  }

  static toDTOList<T = any>(docs: SafeAny[]): T[] {
    if (!docs || !Array.isArray(docs)) return [];
    return docs.map(doc => this.toDTO<T>(doc));
  }
}

/**
 * Admin mapper ensures sensitive fields like passwordHash are never sent to the client.
 */
export class AdminMapper extends BaseMapper {
  static toDTO(doc: SafeAny): SafeAny {
    const obj = super.toDTO(doc);
    if (!obj) return obj;

    // Strip sensitive fields
    delete obj.passwordHash;

    return obj;
  }

  static toDTOList(docs: SafeAny[]): SafeAny[] {
    if (!docs || !Array.isArray(docs)) return [];
    return docs.map(doc => this.toDTO(doc));
  }
}
