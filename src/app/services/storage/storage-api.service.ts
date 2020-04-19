import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class StorageApiService {
  constructor(

  ) { }

  async set(key: string, value: any) {
    return await Storage.set({
      key,
      value: JSON.stringify(value)
    })
  }

  async get<T>(key: string): Promise<T> {
    const { value } = await Storage.get({ key })
    if (!value) {
      return null;
    }
    return JSON.parse(value) as T;
  }

}

