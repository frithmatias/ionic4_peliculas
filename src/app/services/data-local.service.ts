import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { PeliculaDetalle } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
	providedIn: 'root'
})
export class DataLocalService {
	peliculasStorage: PeliculaDetalle[] = [];
	constructor(private storage: Storage, private toastController: ToastController) {
		this.cargarFavoritos();
	}

	async presentToast(message: string) {
		const toast = await this.toastController.create({
			message,
			duration: 2000
		});
		toast.present();
	}

	guardarPelicula(pelicula: PeliculaDetalle) {
		// Vamos a usar la interface PeliculaDetalle, ya que quiero guardar TODA la información detallada de la película y ademas
		// es lo que me devuelve el componente DetalleComponent que es el que se llama en el modal. Ese componente
		// llama al metodo getPeliculaDetalle des servicio moveService.
		// ngOnInit() {
		//   console.log('ID', this.id);
		//   this.moviesService.getPeliculaDetalle(this.id).subscribe((resp: PeliculaDetalle) => {
		//     console.log('Detalle de la película: ', resp);
		//     this.peliculaDetalle = resp;
		//   });
		return new Promise((resolve, reject) => {
			let yaExiste = false;
			let message = '';

			for (const peli of this.peliculasStorage) {
				if (peli.id === pelicula.id) {
					yaExiste = true;
					break;
				}
			}

			console.log('Enviando al Storage: ', pelicula);

			if (yaExiste) {
				this.peliculasStorage = this.peliculasStorage.filter((peli) => peli.id !== pelicula.id);
				message = 'Pelicula removida del Storage';
			} else {
				this.peliculasStorage.push(pelicula);
				message = 'Pelicula guardada en el Storage';
			}

			this.presentToast(message);
			this.storage.set('peliculas', this.peliculasStorage);

			resolve(!yaExiste);
		});
	}

	async cargarFavoritos() {
		const peliculas = await this.storage.get('peliculas');
		// si el get no trae nada entonces devuelve null, por lo tanto peliculas=null

		this.peliculasStorage = peliculas || []; // si es null enotnces devuelve un arreglo vacío.
		return this.peliculasStorage;
	}

	async existePelicula(id) {
		console.log(id);
		id = Number(id);
		console.log(id);

		await this.cargarFavoritos();
		const existe = this.peliculasStorage.find((peli) => peli.id === id);
		return existe ? true : false; // operador ternario
	}
}
