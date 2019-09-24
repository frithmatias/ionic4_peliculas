import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagenPipe } from './imagen.pipe';
import { ParesPipe } from './pares.pipe';
import { FiltroimagenPipe } from './filtroimagen.pipe';

@NgModule({
	declarations: [ ImagenPipe, ParesPipe, FiltroimagenPipe ],
	exports: [ ImagenPipe, ParesPipe, FiltroimagenPipe ],
	imports: [ CommonModule ]
})
export class PipesModule {}
