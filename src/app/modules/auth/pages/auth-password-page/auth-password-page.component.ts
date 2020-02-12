// Angular
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auth-password-page',
  templateUrl: './auth-password-page.component.html',
  styleUrls: ['./auth-password-page.component.scss']
})
export class AuthPasswordPageComponent {

  private readonly resetToken: string;

  constructor(private route: ActivatedRoute) {
    this.resetToken = this.route.snapshot.params.token;
  }
}
