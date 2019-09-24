import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pelicula } from 'src/app/interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
	selector: 'app-slideshow-pares',
	templateUrl: './slideshow-pares.component.html',
	styleUrls: [ './slideshow-pares.component.scss' ]
})
export class SlideshowParesComponent implements OnInit {
	@Input() peliculas: Pelicula[] = [];
	@Output() cargarMas = new EventEmitter();

	slidesOpts = {
		slidesPerView: 3.3, // se muestra 1 imágen y el 10% de la otra
		freeMode: true,
		spaceBetween: -10
	};
	constructor(private modalController: ModalController) {}

	ngOnInit() {}

	onClick() {
		console.log('Cargar mas');
		this.cargarMas.emit();
		// de esta manera el slideshow va a emitirle al padre que debe cargar mas peliculas.
		// ese evento lo voy a escuchar en el padre tab1.page.html
	}

	async verDetalle(id: string) {
		// hay que presentar el modal, como es posible que necesite que el modal me devuelva información
		// voy a declararlo en una constante. Recordemos que create() me devuelve una Promesa por lo tanto
		// voy a ponerle el await.
		const modal = await this.modalController.create({
			component: DetalleComponent,
			componentProps: {
				id
			}
		});
		modal.present();
	}
}
