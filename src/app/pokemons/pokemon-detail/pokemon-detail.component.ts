import { Location } from '@angular/common';
import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pokemon } from '../models/pokemon';
import { PokemonService } from '../pokemon.service';
import {TeamComponent} from "../team/team.component";

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {
  pokemon?: Pokemon;
  @Input() pokemonId = 1
  @ViewChild(TeamComponent)
  private TeamComponent ?: TeamComponent

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

  addPokemonToTeam(id: number): void{
    this.TeamComponent?.addPokemon(id)
  }
}
