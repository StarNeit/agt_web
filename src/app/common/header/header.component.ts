import { Component, OnInit } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { LocalService } from '../../services/local.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbar,
    MatIcon,
    MatIconButton,
    RouterLink,
    NgIf,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  public isAuthenticated: string = '';

  constructor(private localService: LocalService) {
  }

  ngOnInit(): void {
    this.isAuthenticated = this.localService.isAuthenticated();
  }

  logout() {
    this.localService.removeData('auth_token');
    window.location.href = '/login';
  }
}
