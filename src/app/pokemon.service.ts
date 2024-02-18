import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { PokeDialogComponent } from './poke-dialog/poke-dialog.component';


@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  pokemon: any[] = []
  typeNames: Set<string> = new Set<string>();
  filteredPokemons: any[] = [];
  showAllPokemon = true; 
  dialogPokemon: any[] = []


  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient,private matDialog:MatDialog) { }

  getPokemons() {
    return this.http.get(this.apiUrl);
  }
  getMoreDate(name:string){
    return this.http.get(`${this.apiUrl}/${name}`);
  }
  initialPokemon() {
    return new Promise<void>((resolve) => {
      this.getPokemons().subscribe((response: any) => {
        const requests = response.results.map((result: any) =>
          this.getMoreDate(result.name).toPromise()
        );
  
        Promise.all(requests).then((pokemonArray: any[]) => {
          this.pokemon = pokemonArray;
          this.pokeTypeCategory(this.pokemon);
          resolve();
        });
      });
    });
  }

  pokeTypeCategory(pokemon: any[]) { 
    this.typeNames.add('ALL');
    this.pokemon.forEach(pokemon => {
      const typeNames1 = pokemon.types[0].type.name;
      this.typeNames.add(typeNames1);
      //2 tipus ellenörzése hogy letezik-e ha létezik akkor használjuk 
      if (pokemon.types[1] && pokemon.types[1].type && pokemon.types[1].type.name) {
        const typeNames2 = pokemon.types[1].type.name;
        this.typeNames.add(typeNames2);
      }
    }
    ); 
    this.showAllPokemon = true;
  console.log(this.typeNames)


  }

  //szürés
  filterByType(type: string) {
    if (type === 'ALL') {
      this.pokemon
      this.showAllPokemon = true;

    } else {
      this.showAllPokemon = false;
      this.filteredPokemons = this.pokemon.filter(p => p.types && p.types.some((t: any) => t.type.name === type));
    }
  
  }


  getBackgroundColor(pokemon: any): string {
    if (pokemon && pokemon.types && pokemon.types.length > 0) {
      const type = pokemon.types[0].type.name;
      if (type === 'grass') {
        return 'green-background';
      }
      else if (type === 'fire') {
        return 'red-background';
      }
      else if (type === 'water') {
        return 'water-background';
      }
      else if (type === 'bug') {
        return 'bug-background';
      }
      else if (type === 'normal') {
        return 'normal-background';
      }
    }
    return '';
  }
  dialogClick(index: number) {
    const dialogPokemon = { ...this.pokemon[index] };
    this.dialogPokemon=[dialogPokemon]
    this.openDialog()
  }

  filterDialogClick(index: number) {
    const dialogPokemon = { ...this.filteredPokemons[index] };
    this.dialogPokemon = [dialogPokemon];
    this.openDialog();
  }

  openDialog(){
   
    this.matDialog.open(PokeDialogComponent)
  }
}
