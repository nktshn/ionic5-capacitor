import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private readonly _loaderState = new BehaviorSubject<boolean>(false);

  constructor() { }

  get loaderState() {
    return this._loaderState;
  }

  showFullscreenLoader(): void {
    this._loaderState.next(true);
  }

  hideFullscreenLoader(): void {
    this._loaderState.next(false);
  }

}
