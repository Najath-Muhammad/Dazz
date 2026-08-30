export interface IContactMessageRepository {
  findAll(): Promise<SafeAny[]>;
  findById(id: string): Promise<any | null>;

  create(data: SafeAny): Promise<SafeAny>;
  update(id: string, data: SafeAny): Promise<any | null>;
  delete(id: string): Promise<any | null>;
}
