import { Component, OnInit } from '@angular/core';
import { PeliculaDetalle, Genre } from '../interfaces/interfaces';
import { DataLocalService } from '../services/data-local.service';
import { MoviesService } from '../services/movies.service';

@Component({
	selector: 'app-tab3',
	templateUrl: 'tab3.page.html',
	styleUrls: [ 'tab3.page.scss' ]
})
export class Tab3Page implements OnInit {
	peliculas: PeliculaDetalle[] = [];
	generos: Genre[] = [];
	favoritosPorGenero: any[] = [];

	constructor(private storage: DataLocalService, private movieService: MoviesService) {}

	async ngOnInit() {
		// lo movi a ionViewWillEnter, otro cliclo de vida de ionic que se ejecuta cada vez que
		// voy a entrar. ngOnInit sólo se ejecuta una vez.

		// obtengo los generos por única vez.
		this.generos = await this.movieService.cargarGeneros();
	}

	async ionViewWillEnter() {
		console.log('Entrando a Favoritos...');
		this.pelisPorGenero();
	}

	async pelisPorGenero() {
		// armo un nuevo array que voy a ir llenando con las peliculas según su genero.
		this.peliculas = await this.storage.cargarFavoritos();
		this.favoritosPorGenero = [];
		for (let i = 0; i <= this.generos.length - 1; i++) {
			this.favoritosPorGenero.push({
				id: this.generos[i].id,
				name: this.generos[i].name,
				pelis: this.peliculas.filter((peli) => {
					return peli.genres.find((genre) => genre.id === this.generos[i].id);
				})
			});
		}

		// recorro todas las peliculas, y dentro de cada pelicula recorro cada genero, luego recorro el array
		// creado para ir metiendo dentor la pelicula según el genero que le corresponde.
		// for (let i = 0; i <= pelis.length - 1; i++) {
		// 	for (let e = 0; e <= pelis[i].genres.length - 1; e++) {
		// 		this.favoritosPorGenero.forEach((data) => {
		// 			if (pelis[i].genres[e].id === data.id) {
		// 				data.pelis.push(pelis[i]);
		// 			}
		// 		});
		// 	}
		// }

		// filtro los generos que no tienen peliculas.
		this.favoritosPorGenero = this.favoritosPorGenero.filter((value, index, arr) => {
			return value.pelis.length !== 0;
		});

		console.log('favoritosPorGenero despues', this.favoritosPorGenero);
	}

	// este metodo se llama, cuando se cierra el modal de detalle de la pelicula, desde el padre escucho el modal
	// regresar() {
	// 	this.modalController.dismiss('Cerrando el modal');
	// }

	// desde el padre slideshow-poster.component.ts escucho el cierre del modal y emite un evento
	//  modal.onDidDismiss().then((resp) => {
	// 		console.log(resp.data);
	// 		this.refrescaLista.emit('cerrado');
	// 	});

	// ese evento es escuchado desde tab3.page.html que llama a un evento que actualiza el array de las pelis por genero.
	// <app-slideshow-poster [peliculas]="categoria.pelis" (refrescaLista)="actualizarFavoritos($event)"></app-slideshow-poster>

	actualizarFavoritos(event) {
		console.log(event);
		this.pelisPorGenero();
	}
}
