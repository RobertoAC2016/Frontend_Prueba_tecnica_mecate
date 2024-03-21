import { Component } from '@angular/core';
import { filter } from 'rxjs';
import { Data, IResp } from 'src/app/core/interfaces.interfaz';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  private data!: Data;
  public ans_yes: number = 0;
  public ans_no: number = 0;

  constructor(
    public aps: AppService,
  ){
    this.load_data();
  }
  load_data():void {
    this.aps.get_data().subscribe({
      next: (r: IResp) => {
        if (r.status)
        {
          this.data = r.data;
          this.ans_yes = this.data.items.filter(d => d.is_answered === true).length;
          this.ans_no = this.data.items.filter(d => d.is_answered === false).length;
          const max_rep = Math.max(...this.data.items.map(item => item.owner.reputation));
          const min_views = Math.min(...this.data.items.map(item => item.view_count));
          const olddate = Math.min(...this.data.items.map(item => item.last_activity_date));
          const masvieja = new Date(olddate * 1000);
          const newdate = Math.max(...this.data.items.map(item => item.last_activity_date));
          const masnueva = new Date(newdate * 1000);
          console.log("Mayor reputacion:", max_rep, ", Menor # de vistas:", min_views,
          ', la respuesta mas antigua:', masvieja, ', la respuesta mas nueva:', masnueva);
        }
        else
        {
          console.log(r.message);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
