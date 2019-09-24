import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RespuestaMDB, PeliculaDetalle, PeliculaActores, ResultadoBusqueda, Genre } from '../interfaces/interfaces';
import { environment } from 'src/environments/environment';

const URL = environment.url;
const apiKey = environment.apiKey;

@Injectable({
	providedIn: 'root'
})
export class MoviesService {
	private pagePopulares = 0;
	generos: Genre[] = [];
	constructor(private http: HttpClient) {}

	private ejecutarQuery<T>(query: string) {
		query = URL + query;
		query += `&api_key=${apiKey}&language=es&include_image_lenguage=es`;

		// ---------------------------------------------------
		// ESTO ES SOLO PARA CREAR DOS INTERFACES, <PeliculaDetalle> y <PeliculaActores>

		console.log(query);
		// https://api.themoviedb.org/3/movie/420818?a=1&api_key=83970b5ff81e73ba079594bf4bad6e04&language=es&include_image_lenguage=es

		// Quiero obtener el URL completo del QUERY para pegarlo en POSTMAN o en el BROWSER y obtener todo el JSON de los
		// detalles de la película, para así poder crear mi nueva interface. En INTERFACES.TS ahora voy a crear mi nueva
		// interfase desde click derecho en VSCode > Paleta de comandos... > busco el plugin JSON to TS: Convert from Clipboard.

		// //interface RootObject {
		// export interface peliculaDetalle {

		// Ahora puedo declarar mi respuesta de la función ejecutarQuery en el metodo getPeliculaDetalle como <peliculaDetalle>
		// ---------------------------------------------------

		return this.http.get<T>(query);
	}

	getFeature() {
		// Voy a reconstruir
		// primary_release_date.gte=2019-06-1
		// primary_release_date.lte=2019-06-30

		const hoy = new Date();
		const ultimoDia = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0).getDate();
		// Si yo traigo el año, mes +1, día 0, es como traer el último día del mes en curso.
		const mes = hoy.getMonth();
		let mesString;

		if (mes < 10) {
			mesString = '0' + mes;
		} else {
			mesString = mes;
		}

		const inicio = `${hoy.getFullYear()}-${mesString}-01`;
		const fin = `${hoy.getFullYear()}-${mesString}-${ultimoDia}`;

		// tslint:disable-next-line:max-line-length
		// return this.http.get<RespuestaMDB>(`https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2019-06-1&primary_release_date.lte=2019-06-30&`);
		return this.ejecutarQuery<RespuestaMDB>(
			`/discover/movie?primary_release_date.gte=${inicio}&primary_release_date.lte=${fin}`
		);
	}

	getPopular() {
		this.pagePopulares++;
		const query = `/discover/movie?sort_by=popularity.desc&page=${this.pagePopulares}`;
		return this.ejecutarQuery<RespuestaMDB>(query);
	}

	getPeliculaDetalle(id: string) {
		// https://api.themoviedb.org/3/movie/420818?a=1&api_key=83970b5ff81e73ba079594bf4bad6e04&language=es&include_image_lenguage=es
		// le respuesta puede ser un poco diferente a la propuesta en la interface <respuestaMDB> por lo tanto tendríamos
		// que crear una nueva interface.

		return this.ejecutarQuery<PeliculaDetalle>(`/movie/${id}?a=1`);
		// le adjunto ?a=1 ya que si no lo hago, el metodo ejecutarQuery le va a adjuntar otros argumentos con ampersand &, pero
		// el primer argumento tiene que ir precedido del signo de interrogación ?. Por lo tanto invento un argumento, que no va
		// a causar ningún error en el backend simplemente lo va a ignorar.
	}

	getPeliculaActores(id: string) {
		// https://api.themoviedb.org/3/movie/420818/credits?a=1&api_key=83970b5ff81e73ba079594bf4bad6e04&language=es&include_image_lenguage=es
		// En esta respuesta veo que la estructura del JSON es diferente, empieza con {"id":420818,"cast":, por lo tanto voy a crear
		// una interface nueva para esta respuesta. Copio el JSON y creo la interface en INTERFACES.TS con el plugin JSON to TS.
		return this.ejecutarQuery<PeliculaActores>(`/movie/${id}/credits?a=1`);
	}

	buscarPelicula(texto: string) {
		// https://api.themoviedb.org/3/search/movie?query=avengers&api_key=83970b5ff81e73ba079594bf4bad6e04
		return this.ejecutarQuery<ResultadoBusqueda>(`/search/movie?query=${texto}&page=1`);
	}

	cargarGeneros(): Promise<Genre[]> {
		// https://api.themoviedb.org/3/genre/movie/list?api_key=83970b5ff81e73ba079594bf4bad6e04&language=es&include_image_language=es

		// no hago un return del observable, yo quiero trabajar con promesas porque así como yo quiero trabajar la respuesta.
		// la promesa se va a resolver cuando haya ejecutado los generos.

		return new Promise((resolve) => {
			this.ejecutarQuery(`/genre/movie/list?a=1`).subscribe((resp: any) => {
				this.generos = resp.genres;
				resolve(this.generos);
			});
		});
	}
}
