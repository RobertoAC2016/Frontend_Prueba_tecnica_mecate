import { Component } from '@angular/core';
import { Content, Data, DataCard, DataStat, IResp } from 'src/app/core/interfaces.interfaz';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  public global: DataCard[] = [];

  constructor(
    public aps: AppService,
  ){
    this.load_data();
    this.load_data_stats();
  }
  load_data():void {
    this.aps.get_data().subscribe({
      next: (r: IResp) => {
        if (r.status)
        {
          let arr: Content[] = [];
          arr.push({"msg":"Número de respuestas contestadas:", "value": r.data.items.filter(d => d.is_answered === true).length.toString()});
          arr.push({"msg":"Número de respuestas no contestadas:", "value": r.data.items.filter(d => d.is_answered === false).length.toString()});
          const max_rep = Math.max(...r.data.items.map(item => item.owner.reputation));
          const min_views = Math.min(...r.data.items.map(item => item.view_count));
          const olddate = Math.min(...r.data.items.map(item => item.last_activity_date));
          const masvieja = new Date(olddate * 1000);
          const newdate = Math.max(...r.data.items.map(item => item.last_activity_date));
          const masnueva = new Date(newdate * 1000);
          console.log("Mayor reputacion:", max_rep, ", Menor # de vistas:", min_views,
          ', la respuesta mas antigua:', masvieja, ', la respuesta mas nueva:', masnueva);
          this.global.push({
            body: arr,
            title: 'Estadisticas de respuestas',
            img: 'assets/discurso.png'
          });
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
  load_data_stats():void {
    this.aps.get_data_flights().subscribe({
      next: (r: DataStat) => {
        if (r.status)
        {
          let arr: Content[] = [];
          arr.push({"msg":"Nombre aeropuerto que ha tenido mayor movimiento:", "value": r.data.aeropuerto_max_vuelos});
          arr.push({"msg":"Nombre aerolínea que ha realizado mayor número de vuelos:", "value": r.data.aerolinea_max_vuelos});
          arr.push({"msg":"Día se han tenido mayor número de vuelos:", "value": r.data.dia_max_vuelos});
          arr.push({"msg":"Aerolíneas que tienen mas de 2 vuelos por día:", "value": r.data.aerolinea_max_por_dia.join(', ')});
          this.global.push({
            body: arr,
            title: 'Estadisticas de vuelo',
            img: 'assets/stats.png'
          });
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
