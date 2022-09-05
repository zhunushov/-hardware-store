import { makeAutoObservable } from "mobx";
import { IBrands, IDevice, IDeviceStore, ITypes } from "../types/Device";

export default class DeviceStore implements IDeviceStore {
  _page: number;
  _limit: number;
  _totalCount: number;
  _types: ITypes[];
  _brands: IBrands[];
  _devices: IDevice[];
  _selectedType: ITypes;
  _selectedBrand: IBrands;
  constructor() {
    this._page = 1;
    this._limit = 2;
    this._totalCount = 0;
    this._types = [];
    this._brands = [];
    this._devices = [];
    this._selectedType = {} as ITypes;
    this._selectedBrand = {} as IBrands;
    makeAutoObservable(this);
  }
  setTypes(types: ITypes[]) {
    this._types = types;
  }
  setBrands(brands: IBrands[]) {
    this._brands = brands;
  }
  setDevices(device: IDevice[]) {
    this._devices = device;
  }
  setSelectedType(type: ITypes) {
    this.setPage(1);
    this._selectedType = type;
  }
  setSelectedBrand(brand: IBrands) {
    this.setPage(1);
    this._selectedBrand = brand;
  }
  setPage(page: number) {
    this._page = page;
  }
  setLimit(limit: number) {
    this._limit = limit;
  }
  setTotalCount(totalCount: number) {
    this._totalCount = totalCount;
  }
  get types() {
    return this._types;
  }
  get brands() {
    return this._brands;
  }
  get devices() {
    return this._devices;
  }
  get selectedType() {
    return this._selectedType;
  }
  get selectedBrand() {
    return this._selectedBrand;
  }
  get page() {
    return this._page;
  }
  get limit() {
    return this._limit;
  }
  get totalCount() {
    return this._totalCount;
  }
}
