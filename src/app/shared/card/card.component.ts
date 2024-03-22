import { Component, Input } from '@angular/core';
import { Content } from 'src/app/core/interfaces.interfaz';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  @Input()
  public data: Content[] = [];
  @Input()
  public title: string = '';
  @Input()
  public img: string = '';

}
