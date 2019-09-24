import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pelicula } from 'src/app/interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
	selector: 'app-slideshow-poster',
	templateUrl: './slideshow-poster.component.html',
	styleUrls: [ './slideshow-poster.component.scss' ]
})
export class SlideshowPosterComponent implements OnInit {
	@Input() peliculas: Pelicula[] = [];
	slidesOpts = {
		slidesPerView: 3.3, // se muestra 1 imágen y el 10% de la otra
		freeMode: true
	};
	constructor(private modalController: ModalController) {}
	@Output() refrescaLista = new EventEmitter<string>();
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
		modal.onDidDismiss().then((resp) => {
			console.log(resp.data);
			this.refrescaLista.emit('cerrado');
		});
	}
}
