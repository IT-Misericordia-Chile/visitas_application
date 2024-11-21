import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { CreateLocationModalComponent } from './create-location-modal/create-location-modal.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [CreateLocationModalComponent],
    imports: [CommonModule],
    exports: [CreateLocationModalComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  })
export class UtilsModule {}
