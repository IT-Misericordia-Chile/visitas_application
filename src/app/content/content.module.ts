import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { BodyComponent } from './body/body.component';
import { ContentComponent } from './content.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BodyModule } from './body/body.module';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { UtilsModule } from '../utils/utils.module';

@NgModule({
  declarations: [ContentComponent, BodyComponent, HeaderComponent, FooterComponent],
  imports: [BrowserModule, IonicModule.forRoot(), BodyModule, UtilsModule],
  exports: [ContentComponent, BodyComponent, HeaderComponent, FooterComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ContentModule {}
