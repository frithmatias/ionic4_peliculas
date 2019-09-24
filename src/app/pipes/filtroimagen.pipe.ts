import { Pipe, PipeTransform } from '@angular/core';
import { PeliculaDetalle } from '../interfaces/interfaces';

@Pipe({
	name: 'filtroimagen'
})
export class FiltroimagenPipe implements PipeTransform {
	transform(peliculas: PeliculaDetalle[]): any {
		return peliculas.filter((peli) => {
			// devuelve sólo las que tienen la imagen en backdrop_path
			return peli.backdrop_path;
		});
	}
}
