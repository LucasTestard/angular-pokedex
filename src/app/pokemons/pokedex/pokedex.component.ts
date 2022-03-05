import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {
  pokemonId = 1
  search ?: string
  constructor() { }

  ngOnInit(): void {
  }

  getPokemonId(id : number){
    console.log(id)
    this.pokemonId=id
  }

  searchPokemon(search : string){
    console.log("POKEDEX" + search)
    this.search = search
  }


}
