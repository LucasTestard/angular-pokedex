import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { PagedData } from '../models/paged-data';
import { Pokemon } from '../models/pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {
  @Output() pokemonId = new EventEmitter<number>()
  pokemons?: PagedData<Pokemon>
  loginResponse?: string

  @Input() searchString ?: string
  @Output() search = new EventEmitter<string>()

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.getPokemon()
    this.getPokemonsOnScroll(10,10)
  }

  getPokemon():void {
    this.pokemonService.getPokemons().subscribe(pokemons => {
      this.pokemons = pokemons; this.pokemons!.offset += this.pokemons!.limit})
  }

  private getPokemonsOnScroll(offset: number, limit: number): void {
    this.pokemonService.getPokemonsOnScroll(offset,limit).subscribe(pokemon => {
      this.pokemons!.data = this.pokemons!.data.concat(pokemon.data);
      this.pokemons!.offset += this.pokemons!.limit;
    })

  }

  onScroll(): void {
    this.getPokemonsOnScroll(this.pokemons?.offset as number, 10)

  }

  getPokemonId(id : number){
    this.pokemonId.emit(id)
    console.log("clic" + id)
  }

  searchPokemon(search: string) {
    if(search.length){
      this.pokemonService.getPokemonOnSearch(search).subscribe((data => {
        this.pokemons!.data = data.data;
        this.pokemons!.offset += this.pokemons!.limit;
      }))
    }
    else{
      this.getPokemon()
      this.getPokemonsOnScroll(10,10)
    }
  }
}
