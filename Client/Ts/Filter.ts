export interface Filter {
  count: number;
  onMaterialChange: (material: string) => void;
  onSizeChange: (size: string) => void;

}

export type FilterOptions = {
  Material: string[];
  Tamaño: string[];
};

export type ShowOptions = {
  [K in keyof FilterOptions]: boolean;
};