export interface ILocationService {
  getAllLocations(onlyActive?: boolean): Promise<{ success: boolean; message: string; data?: SafeAny }>;
  getLocationById(id: string): Promise<{ success: boolean; message: string; data?: SafeAny }>;
  createLocation(data: SafeAny): Promise<{ success: boolean; message: string; data?: SafeAny }>;
  updateLocation(id: string, data: SafeAny): Promise<{ success: boolean; message: string; data?: SafeAny }>;
  deleteLocation(id: string): Promise<{ success: boolean; message: string }>;
}
