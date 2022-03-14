import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { PokemonListComponent } from './pokemons/pokemon-list/pokemon-list.component';
import {MatListModule} from '@angular/material/list'
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatChipsModule} from '@angular/material/chips';
import { PokemonDetailComponent } from './pokemons/pokemon-detail/pokemon-detail.component';
import {MatIconModule} from "@angular/material/icon";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {MatSidenavModule} from "@angular/material/sidenav";
import {PokedexComponent} from "./pokemons/pokedex/pokedex.component";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {PokemonsModule} from "./pokemons/pokemons.module";
import {TeamComponent} from "./pokemons/team/team.component";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSnackBarModule} from "@angular/material/snack-bar";


@NgModule({
  declarations: [
    AppComponent,
    PokemonListComponent,
    PokemonDetailComponent,
    PokedexComponent,
    TeamComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    MatListModule,
    MatCardModule,
    MatGridListModule,
    MatChipsModule,
    MatIconModule,
    BrowserAnimationsModule,
    InfiniteScrollModule,
    MatSidenavModule,
    MatInputModule,
    FormsModule,
    PokemonsModule,
    FlexLayoutModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
