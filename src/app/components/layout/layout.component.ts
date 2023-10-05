import { Component } from '@angular/core'

@Component({
  selector: 'app-layout',
  template: `
  <div class="container">
    <app-header></app-header>
    <main>
        <router-outlet></router-outlet>
    </main>
    <app-footer></app-footer>
  </div>`,
  styleUrls: ['./layout.component.sass']
})

export class LayoutComponent { }