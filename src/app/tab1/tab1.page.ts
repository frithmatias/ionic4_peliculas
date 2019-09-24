import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { RespuestaMDB, Pelicula } from '../interfaces/interfaces';

@Component({
	selector: 'app-tab1',
	templateUrl: 'tab1.page.html',
	styleUrls: [ 'tab1.page.scss' ]
})
export class Tab1Page implements OnInit {
	peliculasRecientes: Pelicula[] = [];
	peliculasPopulares: Pelicula[] = [];
	constructor(private moviesService: MoviesService) {}
	ngOnInit(): void {
		// Recientes
		this.moviesService.getFeature().subscribe((data: RespuestaMDB) => {
			this.peliculasRecientes = data.results;
			console.log('Recientes', this.peliculasRecientes);
		});
		this.getPopulares();
	}

	cargarMas() {
		this.getPopulares();
	}

	getPopulares() {
		// Populares
		this.moviesService.getPopular().subscribe((data: RespuestaMDB) => {
			// Para evitar que las nuevas peliculas PISEN a las anteriores, voy usar PUSH con el operador SPREAD.
			// this.peliculasPopulares = data.results;

			// this.peliculasPopulares.push(...data.results);

			// esto tampoco va a funcionar, la data llega bien pero no le esta cargando los nuevos datos al array
			// peliculasPopulares mediante el push, esto es porque yo lo estoy pasando por el pipe "pares" que no
			// es asincrono, por lo tanto no esta pendiente de los cambios.

			const arrTemp = [ ...this.peliculasPopulares, ...data.results ];
			this.peliculasPopulares = arrTemp;

			console.log('Populares', this.peliculasPopulares);
		});
	}
}
