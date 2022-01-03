import { TestBed } from '@angular/core/testing';
import { PokemonInfoComponent } from './pokemon-info/pokemon-info.component';
import { PokemonService } from './pokemon.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';





describe('PokemonService', () => {
 let name: string  = '';
 let search_term: string  = ' '

 

  beforeEach(() => {
    TestBed.configureTestingModule({
     
      imports: [HttpClientTestingModule], 
      declarations:[PokemonInfoComponent],
      providers: [PokemonService]
    });

  });

  it('should be created ? ', () => {
    const service: PokemonService = TestBed.get(PokemonService);
    expect(service).toBeTruthy();
  });
  
  it("should get Pokemon function  ?",() =>{
    const service: PokemonService = TestBed.get(PokemonService);
    expect(service.getPokemon).toBeTruthy()
   
  })
  it("should get Description function  ?",() =>{
    const service: PokemonService = TestBed.get(PokemonService);
    expect(service.getDescription).toBeTruthy();
   
  })
  it('get Pokemon', (done) =>{
    const service: PokemonService = TestBed.get(PokemonService);
    search_term = 'Charizard'
    name = '';
    search_term = search_term.toLowerCase();

    service.getPokemon(search_term)
    .subscribe((response:any)=>{
      name = response.name
      if(name != null){
        expect(name).toBeTruthy()
      }
      // expect(name).toBeTruthy()
      (done)
    })
  })
//  it('test', inject([PokemonService],async (pokemonService:PokemonService) => {
//     const result = await pokemonService.getPokemon('charizard')
//     .subscribe((response:any)=>{
//       name = response.name
      
//     })
//     expect(result).toMatch('charizard')
//  }))



});
