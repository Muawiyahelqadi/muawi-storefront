export type BaseParams = { locale: string };

export type Params<E extends object = object> = Promise<BaseParams & E>;

export type PageProps<
  Extra extends object = object,
  Search extends object = object,
> = {
  params: Params<Extra>;
  /** optional: include if you want typed query string */
  searchParams?: Promise<Search>;
};
