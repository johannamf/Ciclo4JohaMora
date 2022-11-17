import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { NosotrosComponent } from './nosotros/nosotros.component';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    
  ],
  declarations: [
    PagesComponent,
    NosotrosComponent,
  ],
})
export class PagesModule {
}
