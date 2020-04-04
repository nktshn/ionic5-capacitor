import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/api/backend.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  constructor(
    private backend: BackendService,
  ) { }

  ngOnInit() {
    this.loadStoreGames();
  }

  private async loadStoreGames() {
    const sub = await this.backend.getGames();
    sub.subscribe(gamesRes => {
      console.log(gamesRes);
    })
  }

}
