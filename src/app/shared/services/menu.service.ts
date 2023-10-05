import { EventEmitter, Injectable, Output } from '@angular/core'

@Injectable({
    providedIn: 'root',
})
export class MenuService {
    menuActive = false

    @Output() toggleMenu = new EventEmitter()

    constructor() {}

    menuState() {
        this.menuActive = !this.menuActive
        this.toggleMenu.emit(this.menuActive ? 'active' : '')
    }
}
