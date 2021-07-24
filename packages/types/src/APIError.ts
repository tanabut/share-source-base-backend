export interface APIError {
  ref?: string;
  message: string;
  statusCode: number;
  data?: { [key: string]: unknown };
}
