export type User = {
  id: number;
  user_name: string;
  email: string;
};

export type ApiResponseObject = {
  ok: boolean;
  message: 'string';
  data: any;
};
