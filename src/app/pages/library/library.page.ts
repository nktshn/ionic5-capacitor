import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/api-contracts/games';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { skipWhile, take } from 'rxjs/operators';
import { ProfileService } from 'src/app/stores/profile.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.page.html',
  styleUrls: ['./library.page.scss'],
})
export class LibraryPage implements OnInit {

  games: Game[] = [];
  
  constructor(
    private profileService: ProfileService,
    private loaderService: LoaderService,
  ) { }

  ngOnInit() {
    this.loadProfile();
  }

  private loadProfile(): void {
    this.profileService.retrieveProfile();
    this.profileService.profile.pipe(
      skipWhile(profile => !profile),
      take(1)
    ).subscribe(profile => {
      this.games = profile.games;
    });
  }

}
