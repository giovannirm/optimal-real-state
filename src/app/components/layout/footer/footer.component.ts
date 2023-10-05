import { Component } from '@angular/core'

@Component({
  selector: 'app-footer',
  template: `<footer>
  <div class="copyrigth">
      &copy; 2023 <strong><span>Optima Inmobiliaria</span></strong> Todos los derechos reservados
  </div>
</footer>`,
  styleUrls: ['./footer.component.sass']
})
export class FooterComponent { }
