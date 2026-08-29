export interface ILocationService {
  getAllLocations(onlyActive?: boolean): Promise<{ success: boolean; message: string; data?: any }>;
  getLocationById(id: string): Promise<{ success: boolean; message: string; data?: any }>;
  createLocation(data: any): Promise<{ success: boolean; message: string; data?: any }>;
  updateLocation(id: string, data: any): Promise<{ success: boolean; message: string; data?: any }>;
  deleteLocation(id: string): Promise<{ success: boolean; message: string }>;
}
