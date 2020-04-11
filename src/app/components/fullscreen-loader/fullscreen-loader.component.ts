import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-fullscreen-loader',
  templateUrl: './fullscreen-loader.component.html',
  styleUrls: ['./fullscreen-loader.component.scss'],
})
export class FullscreenLoaderComponent implements OnInit {

  loaderShouldBeShown = false;

  constructor(
    private loaderService: LoaderService,
  ) { }

  ngOnInit() {
    this.subscribeToLoaderState();
  }

  subscribeToLoaderState() {
    this.loaderService.loaderState.subscribe(state => {
      this.loaderShouldBeShown = state;
    })
  }
}
