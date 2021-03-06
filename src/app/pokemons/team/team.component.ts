import { Component, OnInit } from '@angular/core';
import {PokemonService} from "../pokemon.service";
import {Auth} from "../models/auth";
import {HttpHeaders} from "@angular/common/http";
import {forkJoin, Observable} from "rxjs";
import {Pokemon} from "../models/pokemon";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  loginResponse?: Auth
  myTeamId?: number[]
  myTeam?: Pokemon[]

  constructor(private pokemonService: PokemonService, private snackBar: MatSnackBar) { }

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
    let header = new HttpHeaders()
    header = header.set("Authorization", "Bearer " + this.loginResponse?.access_token)
    console.log(header.get("Authorization"))
    this.pokemonService.putTeam(this.myTeamId!, header).subscribe(data => {
      console.log("PutTeam : " + this.myTeamId)
      this.getTeam()
    })
  }

  deleteById(id?: number): void{
    console.log("Delete : " + id)
    if(this.myTeamId!.length>1){
      this.myTeamId?.splice(this.myTeamId?.indexOf(id!), 1)
      console.log(this.myTeamId)
      this.putTeam()
    }else {
      this.snackBar.open("Vous devez garder au moins 1 pokemon dans votre équipe", "", {duration: 5000, panelClass: ['mat-toolbar', 'mat-warn']})
    }
  }

  addPokemon(id?: number): void{
    console.log("ADD : " + id)
    if(this.myTeamId!.length < 6){
      this.myTeamId?.push(id!)
      this.putTeam()
    }else{
      this.snackBar.open("Vous pouvez ajouter que 6 pokemons dans votre équipe", "", {duration: 5000, panelClass: ['mat-toolbar', 'mat-warn']})
    }
  }

  getTeam(): void{
    console.log("GET TEAM")
    document.getElementById("titre")!.style.display = "block"
    let header = new HttpHeaders()
    header = header.set("Authorization", "Bearer " + this.loginResponse?.access_token)
    console.log(header.get("Authorization"))
    this.pokemonService.getTeam(header).subscribe(data => {
      this.myTeamId = data
      console.log("getTeam" + this.myTeamId)
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
