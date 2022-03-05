import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from 'rxjs';
import { PagedData } from './models/paged-data';
import { Pokemon } from './models/pokemon';
import {environment} from "../../environments/environment";
import {Auth} from "./models/auth";

@Injectable({
  providedIn: 'root'
})

export class PokemonService {

  myUrl :string = "http://app-ec21e68e-3e55-42d7-b1ae-3eef7507a353.cleverapps.io"
  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T): (error: any) => Observable<T> {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getPokemons(): Observable<PagedData<Pokemon>>{
    return this.http.get<PagedData<Pokemon>>(this.myUrl + "/pokemons")
  }

  getPokemon(id : number): Observable<Pokemon> {
    const url = `${this.myUrl + "/pokemons"}/${id}`
    return this.http.get<Pokemon>(url)
  }

  getPokemonsOnScroll(offset: number, limit: number): Observable<PagedData<Pokemon>>{
    return this.http.get<PagedData<Pokemon>>(this.myUrl+ "/pokemons" +"?offset="+offset+"&limit="+limit).pipe(
      catchError(this.handleError<PagedData<Pokemon>>('getPokemons', {} as PagedData<Pokemon>))
    )
  }

  getPokemonOnSearch(search: string): Observable<PagedData<Pokemon>>{
    return this.http.get<PagedData<Pokemon>>(this.myUrl + "/pokemons" + "?search=" + search).pipe(
      catchError(this.handleError<PagedData<Pokemon>>('getPokemonOnSearch', {} as PagedData<Pokemon>))
    )
  }

  login(): Observable<Auth>{
    const body = {
      email: environment.login,
      password: environment.password
    }
    return this.http.post<Auth>(this.myUrl + "/auth/login", body).pipe(
      catchError(this.handleError<Auth>("login", {} as Auth)))
  }


  putTeam(body: number[], header: HttpHeaders): Observable<any> {
    return this.http.put<string>(this.myUrl + "/trainers/me/team", body, {headers: header}).pipe(
      catchError(this.handleError<string>("putTeam", {} as string))
    )
  }

  getTeam(header: HttpHeaders): Observable<number[]>{
    return this.http.get<number[]>(this.myUrl + "/trainers/me/team",{headers: header}).pipe(
      catchError(this.handleError<number[]>("getTeam", {} as number[]))
    )
  }
}
