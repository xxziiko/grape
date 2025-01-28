export type PickOne<T> = {
  [P in keyof T]: Record<P, T[P]> &
    Partial<Record<Exclude<keyof T, P>, undefined>>;
}[keyof T];

export type NonNullable<T> = T extends null | undefined ? never : T;

export type HandleErrorParams<T> = PickOne<{
  data: T;
  error: Error;
}>;

export type RemapKeys<T, M extends Record<keyof T, string>> = {
  [K in keyof T as M[K]]: T[K];
};
