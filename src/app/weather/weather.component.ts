import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Data } from '@angular/router';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  isSearch: boolean = false;
  days: any[] = [];
  weatherData: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {}

  onSearch(city: String) {
    let isNew = true;
    this.http.get(`http://api.openweathermap.org/data/2.5/forecast?appid=8073806a0586530b5a4adf67e8467a05&units=metric&q=${city}`)
      .subscribe((data: Data) => {
        data.list.forEach((item) => {

          let obj = {
            date: new Date(item.dt_txt).toUTCString(),
            min_temp: item.main.temp_min,
            max_temp: item.main.temp_max,
            humidity: item.main.humidity
          }
          this.weatherData.push(obj);


          this.days.forEach((day) => {
            if(day === new Date(item.dt_txt).toUTCString().substring(0, 11)) {
              isNew = false;
            }
          })

          if(isNew) {
            this.days.push(new Date(item.dt_txt).toUTCString().substring(0, 11));
          }
          isNew = true;
        })

        console.log(this.weatherData);
        console.log(this.days);
      })

      
  }

}
