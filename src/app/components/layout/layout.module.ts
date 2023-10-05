import { NgModule } from '@angular/core'

import { SidebarComponent } from './sidebar/sidebar.component'
import { LayoutComponent } from './layout.component'
import { HeaderComponent } from './header/header.component'
import { FooterComponent } from './footer/footer.component'

import { LayoutRoutingModule } from './layout-routing.module'
import { CommonModule } from '@angular/common'

import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { AuthInterceptor } from '@shared/interceptors/auth.interceptor'

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})

export class LayoutModule { }