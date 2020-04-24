import { Injectable } from '@angular/core';
import { GameBuyingModalComponent } from 'src/app/components/game-buying-modal/game-buying-modal.component';
import { ModalController, ToastController } from '@ionic/angular';
import { Game } from 'src/app/api-contracts/games';
import { Profile } from 'src/app/api-contracts/profile';
import { LoaderService } from '../loader/loader.service';
import { BackendService } from '../api/backend.service';
import { ProfileService } from 'src/app/stores/profile.service';

@Injectable({
  providedIn: 'root'
})
export class IonModalService {

  constructor(
    private modalCtrl: ModalController,
    private loaderService: LoaderService,
    private backend: BackendService,
    private toastCtrl: ToastController,
    private profileService: ProfileService,
  ) { }

  async showBuyGameModal(profile: Profile, targetGame: Game) {
    // that ionic's modal api is awful...
    const modal = await this.modalCtrl.create({
      component: GameBuyingModalComponent,
      componentProps: {
        itemsToBuy: [targetGame],
        profile:  profile,
      }
    });
    modal.present();
    const modalData = await modal.onWillDismiss();
    const isPurchaseConfirmed = modalData.data as boolean;
    if (!isPurchaseConfirmed) {
      return;
    }
    this.loaderService.showFullscreenLoader();
    const sub = await (this.backend.buyGame(targetGame));
    const toast = await this.toastCtrl.create({
      message: `"${targetGame.title}" added to your Library`,
      duration: 3000
    })
    sub.subscribe(profileResponse => {
      this.profileService.setProfileData(profileResponse);
      toast.present();
      this.loaderService.hideFullscreenLoader();
    })
  }
}
