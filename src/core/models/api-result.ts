export interface ApiResult<Resource> {
  data?: Resource;
  isSuccess: string;
  statusCode: string;
  message: string;
  total: number;
}
