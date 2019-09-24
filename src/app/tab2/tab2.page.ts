import { Component } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { BusquedaItem } from '../interfaces/interfaces';
import { DetalleComponent } from '../components/detalle/detalle.component';
import { ModalController } from '@ionic/angular';

@Component({
	selector: 'app-tab2',
	templateUrl: 'tab2.page.html',
	styleUrls: [ 'tab2.page.scss' ]
})
export class Tab2Page {
	textoBuscar = '';
	peliculas: BusquedaItem[] = [];
	loading = false;
	ideas: string[] = [ 'Spiderman', 'Avenger', 'El señor de los Anillos' ];

	constructor(private movieService: MoviesService, private modalController: ModalController) {}
	buscar(event) {
		const textoBuscar = event.detail.value;
		if (textoBuscar === '') {
			this.peliculas = [];
			this.loading = false;
			return;
		}
		this.loading = true;
		this.movieService.buscarPelicula(textoBuscar).subscribe((resp) => {
			// this.peliculas = resp.results;
			this.loading = false;
			this.peliculas = resp.results;
			console.log(resp);
		});
	}

	async detalle(id: number) {
		const modal = await this.modalController.create({
			component: DetalleComponent,
			componentProps: {
				id
			}
		});
		modal.present();
	}
}
