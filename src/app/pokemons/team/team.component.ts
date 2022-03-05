import { Component, OnInit } from '@angular/core';
import {PokemonService} from "../pokemon.service";
import {Auth} from "../models/auth";
import {HttpHeaders} from "@angular/common/http";
import {forkJoin, Observable} from "rxjs";
import {Pokemon} from "../models/pokemon";

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  loginResponse?: Auth
  myTeamId?: number[]
  myTeam?: Pokemon[]



  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.login()
  }

  login(): void{
    console.log("LOGIN")
    this.pokemonService.login().subscribe(resp => {
      this.loginResponse = resp
      console.log((this.loginResponse))
    })
  }

  putTeam(): void{
    console.log("PUT TEAM")
    const body = [1,2,3,4,5,10]
    let header = new HttpHeaders()
    header = header.set("Authorization", "Bearer " + this.loginResponse?.access_token)
    console.log(header.get("Authorization"))
    this.pokemonService.putTeam(body, header).subscribe(data => {
      console.log("PutTeam : " + data)
    })
  }

  getTeam(): void{
    console.log("GET TEAM")
    document.getElementById("titre")!.style.display = "block"
    let header = new HttpHeaders()
    header = header.set("Authorization", "Bearer " + this.loginResponse?.access_token)
    console.log(header.get("Authorization"))
    this.pokemonService.getTeam(header).subscribe(data => {
      this.myTeamId = data
      console.log("getTeam" + data)
      this.getTeamDetails()
    })
  }

  getTeamDetails(): void{
    console.log("TEAM DETAIL")
    let pokemonsObs: Observable<Pokemon>[] = this.myTeamId!.map(id => this.pokemonService.getPokemon(id))
    forkJoin(pokemonsObs).subscribe(data => {
      this.myTeam = data
      console.log(this.myTeam)
    })
  }

  playSound(id?: number) {
    let audio = new Audio();
    audio.src=`../assets/audio/${id}.mp3`
    audio.load()
    audio.play()
  }

}
