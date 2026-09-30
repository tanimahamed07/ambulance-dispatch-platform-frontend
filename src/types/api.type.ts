export interface Meta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// Paginated response এর জন্য wrapper
export interface PaginatedResponse<T> {
  data: T[];
  meta: Meta;
}

// Generic Base Response
export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  // meta: Meta; <- এখান থেকে সরিয়ে দিন, কারণ meta টি data এর ভেতরে থাকে
}
