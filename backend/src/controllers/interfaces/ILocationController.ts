import { Request, Response } from 'express';

export interface ILocationController {
  getActiveLocations(req: Request, res: Response): Promise<void>;
  getAllLocations(req: Request, res: Response): Promise<void>;
  getLocationById(req: Request, res: Response): Promise<void>;
  createLocation(req: Request, res: Response): Promise<void>;
  updateLocation(req: Request, res: Response): Promise<void>;
  deleteLocation(req: Request, res: Response): Promise<void>;
}
