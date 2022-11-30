export type ListDocument = {
  name: string;
  owner: string;
  sharedWith: string[];
  isDefault?: boolean;
};

export type List = ListDocument & {
  id: string;
};
