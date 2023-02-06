import { Component } from '@angular/core';
import { faXmark, faBars  } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'navbar-component',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  faXmark = faXmark;
  faBars = faBars;
  isOpen = false;

  toggleMenu() {
    return (this.isOpen = !this.isOpen);
  }
}
