/**
 * Type Definitions
 */

export type CreateAlbumData = {
  title: string;
};

export type UpdateAlbumData = {
  title?: string;
};

export type CreatePhotoData = {
  title: string;
  url: string;
  comment?: string;
};

export type UpdatePhotoData = {
  title?: string;
  url?: string;
  comment?: string;
};

export type CreateUserData = {
  name: string;
  email: string;
  password: string;
};

export type JwtPayload = {
  sub: number;
  name: string;
  email: string;
  iat?: number;
  exp?: number;
};
