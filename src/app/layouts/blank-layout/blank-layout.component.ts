import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavBlankComponent } from '../../components/nav-blank/nav-blank.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-blank-layout',
  standalone: true,
  imports: [NavBlankComponent, RouterOutlet, FooterComponent],
  templateUrl: './blank-layout.component.html',
  styleUrl: './blank-layout.component.css'
})
export class BlankLayoutComponent {

}
