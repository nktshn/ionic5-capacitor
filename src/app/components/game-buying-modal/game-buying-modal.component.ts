import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-game-buying-modal',
  templateUrl: './game-buying-modal.component.html',
  styleUrls: ['./game-buying-modal.component.scss'],
})
export class GameBuyingModalComponent implements OnInit {

  constructor(
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {}

  onCancel(): void {
    this.modalCtrl.dismiss(false);
  }

  onConfirm(): void {
    this.modalCtrl.dismiss(true);
  }

}
