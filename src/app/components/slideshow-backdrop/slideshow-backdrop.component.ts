import { Component, OnInit, Input } from '@angular/core';
import { Pelicula } from 'src/app/interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
	selector: 'app-slideshow-backdrop',
	templateUrl: './slideshow-backdrop.component.html',
	styleUrls: [ './slideshow-backdrop.component.scss' ]
})
export class SlideshowBackdropComponent implements OnInit {
	@Input() peliculas: Pelicula[] = [];
	slidesOpts = {
		slidesPerView: 1.1, // se muestra 1 imágen y el 10% de la otra
		freeMode: true
	};
	constructor(private modalController: ModalController) {}

	ngOnInit() {}

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
