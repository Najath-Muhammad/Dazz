import { Types } from 'mongoose';

/**
 * Validates whether a string is a valid MongoDB ObjectId.
 * Prevents CastErrors from propagating as unhandled 500s.
 */
export const isValidObjectId = (id: string): boolean => {
  return Types.ObjectId.isValid(id) && new Types.ObjectId(id).toString() === id;
};
