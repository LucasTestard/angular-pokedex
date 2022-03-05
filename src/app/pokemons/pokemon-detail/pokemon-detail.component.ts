import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pokemon } from '../models/pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {
  pokemon?: Pokemon;
  @Input() pokemonId = 1
  constructor(private route: ActivatedRoute, private pokemonService: PokemonService, private location: Location) { }

  ngOnInit(): void {
    this.getPokemon()
  }

  ngOnChanges(id : number){
    console.log("OnChange" + id)
    this.getPokemon()
  }

  getPokemon(): void{
    const id =  this.pokemonId
    this.pokemonService.getPokemon(id).subscribe(pokemon => {this.pokemon = pokemon; console.log(pokemon)})
  }

  playSound(id?: number) {
    let audio = new Audio();
    audio.src=`../assets/audio/${id}.mp3`
    audio.load()
    audio.play()
  }

  goBack(): void {
    this.location.back()
  }
}
