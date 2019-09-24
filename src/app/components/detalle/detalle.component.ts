import { Component, OnInit, Input } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { PeliculaDetalle } from 'src/app/interfaces/interfaces';
import { PeliculaActores } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DataLocalService } from '../../services/data-local.service';

@Component({
	selector: 'app-detalle',
	templateUrl: './detalle.component.html',
	styleUrls: [ './detalle.component.scss' ]
})
export class DetalleComponent implements OnInit {
	@Input() id;
	peliculaDetalle: PeliculaDetalle = {};
	peliculaActores: PeliculaActores = {};
	slideOptActores = {
		slidesPerView: 3.3,
		freeMode: true,
		spacebetween: -5
	};
	limite = 150;

	staricon = 'star-outline';

	// Si no declaro peliculaDetalle como un objeto vacío, voy a obtener el error
	// DetalleComponent.html:3 ERROR TypeError: Cannot read property 'title' of undefined

	// Esto es porque al momento de cargar el componente, mi propiedad peliculaDetalle no
	// tiene asignado ningún valor todavía, para eso puedo igualarla a un objeto vacío y en
	// la interface declarar todas las propiedades como OPCIONALES con ?. Recordemos que las
	// interfaces de TS no tienen una traducción directa sobre JS, por lo tanto NO va a
	// afectar en nada al HTML.

	// Otra solución, es usar un *ngIf en el HTML y que no se muestre el <ion-label> hasta
	// que tengamos la película. Cualquiera de las dos soluciones es válida.

	constructor(
		private moviesService: MoviesService,
		private storageService: DataLocalService,
		private modalController: ModalController
	) {}

	async ngOnInit() {
		//console.log('ID', this.id);

		// si existe en favoritos le cambio el icono a una estrella llena, sino una estrella vacía.
		this.storageService.existePelicula(this.id).then((existe) => {
			console.log('detalle>component>exste: ', existe);
			existe ? (this.staricon = 'star') : (this.staricon = 'star-outline');
		});
		// --------------

		this.moviesService.getPeliculaDetalle(this.id).subscribe((resp: PeliculaDetalle) => {
			console.log('Detalle de la película: ', resp);
			this.peliculaDetalle = resp;
		});

		this.moviesService.getPeliculaActores(this.id).subscribe((resp) => {
			console.log('Actores de la película: ', resp);
			this.peliculaActores = resp;
		});
	}

	regresar() {
		this.modalController.dismiss('Cerrando el modal');
	}

	favorito() {
		// guardar pelicula es un metodo que en si es una promesa que ya tiene la lógica que verifica
		// si una pelicula existe o no existe, y la devuelve, por lo tanto puedo hacer lo mismo que
		// con la promesa del metodo existePelicula();

		this.storageService.guardarPelicula(this.peliculaDetalle).then((existe) => {
			existe ? (this.staricon = 'star') : (this.staricon = 'star-outline');
		});
	}
}
