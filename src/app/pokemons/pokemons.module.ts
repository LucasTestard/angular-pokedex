import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatListModule} from '@angular/material/list';
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {MatSidenavModule} from "@angular/material/sidenav";


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    MatListModule,
    InfiniteScrollModule,
    MatSidenavModule
  ]
})
export class PokemonsModule { }
