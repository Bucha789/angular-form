import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {
  provideRouter,
  RouterModule,
  Routes,
  Router,
  ActivatedRoute,
} from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  styleUrl: './styles.css',
  template: `
    <div class="container">
      <h2>Iniciar sesión</h2>
      <form (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="username">Nombre de usuario:</label>
          <input type="text" id="username" name="username" [(ngModel)]="username" required>
        </div>
        <div class="form-group">
          <label for="password">Contraseña:</label>
          <input type="password" id="password" name="password" [(ngModel)]="password" required>
        </div>
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  `,
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    // Aquí normalmente validarías las credenciales
    this.router.navigate(['/welcome', this.username]);
  }
}

@Component({
  selector: 'app-welcome',
  standalone: true,
  styleUrl: './styles.css',
  template: `
    <div class="container">
      <h2>Bienvenido, {{username}}</h2>
      <button (click)="logout()">Cerrar sesión</button>
    </div>
  `,
})
export class WelcomeComponent {
  username: string = '';

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe((params) => {
      this.username = params['username'];
    });
  }

  logout() {
    this.router.navigate(['/login']);
  }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  template: '<router-outlet></router-outlet>',
})
export class AppComponent {}

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'welcome/:username', component: WelcomeComponent },
];

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)],
}).catch((err) => console.error(err));
