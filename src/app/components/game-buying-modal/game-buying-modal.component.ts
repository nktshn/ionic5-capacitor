import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Profile } from 'src/app/api-contracts/profile';
import { IBuyable } from 'src/app/models/buyable.interface';

@Component({
  selector: 'app-game-buying-modal',
  templateUrl: './game-buying-modal.component.html',
  styleUrls: ['./game-buying-modal.component.scss'],
})
export class GameBuyingModalComponent implements OnInit {

  @Input() itemsToBuy: IBuyable[];
  @Input() profile: Profile;

  constructor(
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
    
  }

  onCancel(): void {
    this.modalCtrl.dismiss(false);
  }

  onConfirm(): void {
    this.modalCtrl.dismiss(true);
  }

  getItemCoverNgStyle(item: IBuyable) {
    return { 'background-image': `url(${item.coverUrl})` }
  }

  getTotalCost(): number {
    return this.itemsToBuy.map(item => item.price).reduce((acc, price) => acc += price);
  }

  calculateIsInsufficientFunds(): boolean {
    const balance = this.profile.balance;
    const total = this.getTotalCost();
    return balance < total;
  }

  getDifferenceBetweenTotalAndBalance(): number {
    const balance = this.profile.balance;
    const total = this.getTotalCost();
    return total - balance;
  }

}
