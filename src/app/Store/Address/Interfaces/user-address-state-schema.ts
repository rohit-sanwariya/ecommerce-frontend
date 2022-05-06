export interface UserAddressStateSchema {
  id:string,
  loading: boolean,
  error: boolean,
  addresses: Array<UserAddressSchema>

}

export interface UserAddressSchema {
  _id:string,
  country: string;
  fullname: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
}
