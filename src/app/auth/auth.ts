import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatTabsModule],
  templateUrl: './auth.html',
  styleUrls: ['./auth.css']
})
export class AuthComponent {
  loginCredentials = { username: '', password: '' };
  registerCredentials = { username: '', email: '', password: '' };

  constructor(private router: Router) {}

  loginUser() {
    if (this.loginCredentials.username && this.loginCredentials.password) {
      localStorage.setItem('authenticated', 'true');
      localStorage.setItem('currentUser', this.loginCredentials.username);
      window.location.href = '/employees';
    }
  }

  registerNewUser() {
    if (this.registerCredentials.username && this.registerCredentials.email && this.registerCredentials.password) {
      localStorage.setItem('authenticated', 'true');
      localStorage.setItem('currentUser', this.registerCredentials.username);
      window.location.href = '/employees';
    }
  }
}