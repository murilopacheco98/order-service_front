import { Component, HostListener, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  @ViewChild('sidenav') sidenav!: MatDrawer;
  @HostListener('window:resize', ['$event'])
  onResize(event: { target: { innerWidth: number; }; }) {
      if (event.target.innerWidth < 1100) {
          this.sidenav.close();
      }
      if (event.target.innerWidth > 1100) {
         this.sidenav.open();
      }
  }
}
