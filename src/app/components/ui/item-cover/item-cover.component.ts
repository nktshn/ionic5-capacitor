import { Component, OnInit, Input } from '@angular/core';
import { IBuyable } from 'src/app/models/buyable.interface';

@Component({
  selector: 'app-item-cover',
  templateUrl: './item-cover.component.html',
  styleUrls: ['./item-cover.component.scss'],
})
export class ItemCoverComponent implements OnInit {

  @Input() imageUrl: string;
  @Input() height: number = 0;
  @Input() width: number = 0;

  constructor() { }

  ngOnInit() {}

  getItemCoverNgStyle(item: IBuyable) {
    return {
      'background-image': `url(${this.imageUrl})`,
      'height': `${this.height}px`,
      'width': `${this.width || this.height}px`,
    }
  }

}
