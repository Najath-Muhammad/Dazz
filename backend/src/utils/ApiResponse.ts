export class ApiResponse<T> {
  public success: boolean;
  public message: string;
  public data?: T;

  constructor(success: boolean, message: string, data?: T) {
    this.success = success;
    this.message = message;
    this.data = data;
  }

  static success<T>(message: string, data?: T): ApiResponse<T> {
    return new ApiResponse(true, message, data);
  }

  static error<T>(message: string, data?: T): ApiResponse<T> {
    return new ApiResponse(false, message, data);
  }
}
