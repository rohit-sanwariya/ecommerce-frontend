import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

import { CartSchema } from '../Interfaces/cart-schema';
import { ProductSchema } from '../Interfaces/product-schema';

import { WishlistSchema } from '../Store/Wishlist/wishlist.reducers';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  baseURL: string = `http://localhost:5000`;
  cartURL: string = `http://localhost:5000/api/cart`;

  constructor(private http: HttpClient) {}

  getUserWithAccessTokenFromApi() {
    return this.http.get(`${this.baseURL}/api/users/single`);
  }

  getWishlist(id: string) {
    return this.http.get<WishlistSchema>(
      `http://localhost:5000/api/wish/${id}`
    );
  }

  incrmentProductInCart(cart: CartSchema) {
    const id = cart.id;
    const { type, loading, error, updatedAt, createdAt, ...newCart }: any = {
      ...cart,
    };

    return this.http.put(`${this.cartURL}/${id}`, newCart);
  }

  getCartDetails(id: string) {
    return this.http.get<CartSchema>(`${this.cartURL}/find/${id}`);
  }

  getProducts() {
    return this.http.get<ProductSchema[]>(`${this.baseURL}/api/products/`);
  }

  removeProductFromWishlist(newWishlist: WishlistSchema) {
    return this.http.put<WishlistSchema>(
      `http://localhost:5000/api/wish/${newWishlist.id}`,
      newWishlist
    );
  }

  getUserAddress(userId: string) {
    return this.http.get(`${this.baseURL}/api/address/${userId}`);
  }

  postUserAddress(UserAddress: any) {
    const { loading, error, type, ...payloadUserAddress }: any = {
      ...UserAddress,
    };
    return this.http.post(
      `${this.baseURL}/api/address/${payloadUserAddress.id}`,
      payloadUserAddress
    );
  }
  putUserAddress(UserAddress: any) {
    const { loading, error, type, ...payloadUserAddress }: any = {
      ...UserAddress,
    };
    return this.http.put(
      `${this.baseURL}/api/address/${payloadUserAddress.id}`,
      payloadUserAddress
    );
  }
}
