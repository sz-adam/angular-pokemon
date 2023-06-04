import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';


@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {
  constructor(public service: PokemonService, ) { }


  ngOnInit(): void {
  
    this.service.initialPokemon()
    setTimeout(() => {
      this.service.pokeTypeCategory(this.service.pokemon)
    }, 100)
  }





}
