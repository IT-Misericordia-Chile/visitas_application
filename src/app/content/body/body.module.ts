import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MapComponent } from './map/map.component';


@NgModule({
  declarations: [MapComponent],
  exports: [MapComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BodyModule {}
