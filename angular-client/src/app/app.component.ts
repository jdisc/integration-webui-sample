import { Component, ContentChild, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { JdiscIntegrationComponent } from './jdisc-integration/jdisc-integration.component';

@Component({
  selector: 'ext-root',
  template: `
    <!--The content below is only a placeholder and can be replaced.-->
    <div style="text-align:center" class="content">
      <h1>Welcome to {{ title }}!</h1>
    </div>
    <h2>With the following fields you can start JDisc UI integration:</h2>
    <fieldset title="Fields to access JDisc UI" class="field-container">
      <div>
        <label for="server">Server UI URL for Iframe</label>
        <input
          id="server"
          name="server"
          type="text"
          style="width: 100%"
          [(ngModel)]="server"
          placeholder="JDisc URL to view"
        />
        <span
          >Example of the URL:
          https://192.168.185.23/reports/device-details/general-info/device-info?deviceId=49330&showTopNav=false</span
        >
      </div>
      <div>
        <label for="apiserver">Server API URL for Login</label>
        <input
          id="apiserver"
          name="apiserver"
          type="text"
          style="width: 100%"
          [(ngModel)]="apiserver"
          placeholder="JDisc API URL"
        />
        <span>Example of the URL: https://192.168.185.23/graphql</span>
      </div>
      <div>
        <label for="username">Username</label>
        <input id="username" name="username" type="text" [(ngModel)]="username" placeholder="JDisc user's login'" />
      </div>
      <div>
        <label for="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          [(ngModel)]="password"
          placeholder="JDisc user's password"
        />
      </div>
      <div>
        <button id="submit" type="button" (click)="showJDiscUI()">Show JDisc UI</button>
        <button id="refresh" type="button" (click)="refreshJDiscUI()">Refresh JDisc UI</button>
        <button id="redirect" type="button" (click)="redirectJDiscUI()">Redirect JDisc UI</button>
      </div>
    </fieldset>
    {{ server }} - {{ username }} - Password will not be shown
    <router-outlet></router-outlet>
  `,
  styles: [
    'fieldset { display: flex; flex-direction: column; }',
    'div { display: flex; flex: auto; flex-direction: row; margin-bottom: 2rem }',
  ],
})
export class AppComponent {
  title = 'Sample of application with Integration for JDisc Web UI';

  // server: string = "https://192.168.185.23/reports/device-details/general-info/device-info?deviceId=49330&showTopNav=false";
  // apiserver: string = "https://192.168.185.23/graphql";
  // username: string = "administrator";
  password = '';

  server = 'https://localhost/reports/device-details/general-info/device-info?deviceId=96&showTopNav=false';
  apiserver = 'https://localhost/graphql';
  username = 'gennadiyt';

  constructor(private router: Router) {}

  showJDiscUI() {
    void this.router.navigate(['jdisc'], {
      replaceUrl: false,
      state: { api: this.apiserver, server: this.server, username: this.username, password: this.password },
      skipLocationChange: true,
    });
  }

  integration!: JdiscIntegrationComponent;

  refreshJDiscUI() {
    this.integration.refresh();
  }

  redirectJDiscUI() {
    this.integration.redirect(this.server);
  }
}
