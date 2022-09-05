export interface ITypes {
  id: number;
  name: string;
}
export interface IBrands {
  id: number;
  name: string;
}
export interface IDevice {
  id: number;
  img: string;
  name: string;
  price: number;
}
export interface IDeviceStore {
  setPage(page: number): void;
  setLimit(limit: number): void;
  setTypes(types: ITypes[]): void;
  setBrands(brands: IBrands[]): void;
  setSelectedType(type: ITypes): void;
  setDevices(device: IDevice[]): void;
  setSelectedBrand(brand: IBrands): void;
  setTotalCount(totalCount: number): void;
  get page(): number;
  get limit(): number;
  get types(): ITypes[];
  get brands(): IBrands[];
  get devices(): IDevice[];
  get totalCount(): number;
  get selectedType(): ITypes;
  get selectedBrand(): IBrands;
}
