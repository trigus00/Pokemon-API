import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

import { BaseChartDirective } from 'ng2-charts';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-info',
  templateUrl: './pokemon-info.component.html',
  styleUrls: ['./pokemon-info.component.css']
})
export class PokemonInfoComponent implements OnInit {
  @ViewChild(BaseChartDirective)
  chart!: BaseChartDirective;

  data: Array<any> = [];
  searchTerm: string = '';
  pokemonName: string = '';
  statInfo: Array<number> = [];
  imageURL: String = '';
  displayImage: boolean = false;
  infoPokemon:Array<string>=[];
  weight:Array<number> = [];
  weightInLb:number = 0;
  heightInFt:number = 0;
  height:Array<number> = [];
  type:Array<string>= [];
  catchRate:number = 0 ;
  pictures:any = {};
  clicked:boolean = false;




  constructor(private pokemonservice: PokemonService) { }

  ngOnInit(): void {
   

  }
  getPokemon() {
    this.searchTerm = this.searchTerm.toLowerCase()
    this.pokemonservice.getPokemon(this.searchTerm)
      .subscribe((response: any) => {
        this.pokemonName = response.name
        this.imageURL = response.sprites.front_default;
        
        this.pictures = response.sprites
        console.log(this.pictures)
        
        this.height = response.height;
        this.heightInFt = Math.floor(+this.height * 0.328084)
        this.weight = response.weight;
        this.weightInLb = Math.floor(+this.weight*0.220462);
        // console.log(this.imageURL)
        this.type= response.types[0].type.name
        // console.log(response.sprites.front_shiny)
        
        this.displayImage = true;
        // console.log(this.pokemonName)
        response.stats.forEach((x: any) => {
          // console.log(x.base_stat);
          // console.log(x.stat.name);
          this.data.push(x.stat.name, x.base_stat)
          this.statInfo.push(x.base_stat)
         this.updateChart()
        });
        // this.getFrontPhoto()
       
      })
      this.getDescription()
      this.clear();
      this.clearChart();
    }

  
    getFrontPhoto() {
       this.imageURL = this.pictures.front_default;
        

    
    }

    getBackPhoto() {
      this.imageURL = this.pictures.back_default
      }

    getShinyPhoto(){
      this.imageURL = this.pictures.front_shiny
      // this.imageURL = this.pictures.back_shiny

    } 
    getShinyBackPhoto(){
      this.imageURL = this.pictures.back_shiny
      // this.imageURL = this.pictures.back_shiny

    } 

   getDescription(){
    this.pokemonservice.getDescription(this.searchTerm)
    .subscribe((info: any) => {
      // console.log(info.flavor_text_entries[0]);
      // console.log(info.capture_rate)
      this.catchRate = info.capture_rate
      this.infoPokemon = info.flavor_text_entries[0].flavor_text;
    });
  };

  clear() {
    this.data.length = 0;
    this.searchTerm = '';
    
    // console.log("I've been clear");

  }

  // ------------------ Radar Chart -------------------------------///
  public radarChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      r: {
        beginAtZero:true ,
        max:260,
        ticks: {
          color: 'red',
          
        }
      }
    }
    }
   
  public radarChartLabels: string[] = ['HP', 'Attack', 'Defence', 'Specail-Attack', 'Special-Defence', 'Speed'];
  
  public radarChartData: ChartData<'radar'> = {
    labels: this.radarChartLabels,
    datasets: [{ data: this.statInfo }],
    

  }

  public radarChartType: ChartType = 'radar';

  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
  updateChart() {
    this.radarChartData.datasets[0].data = this.statInfo;
    this.chart.chart?.update();

  }
  clearChart() {
    this.statInfo.length = 0;
    this.radarChartData.datasets[0].data = [0, 0, 0, 0, 0, 0]
    this.chart.chart?.update();
  }
  // --------------------------- Radar chart ends --------------------//
}
