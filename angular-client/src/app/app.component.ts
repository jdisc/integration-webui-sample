import { Component } from '@angular/core';
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
      <div class="row">
        <label for="server" class="column">Server UI URL for Iframe</label>
        <input
          id="server"
          name="server"
          type="text"
          class="column"
          [(ngModel)]="serverUrl"
          placeholder="JDisc URL to view"
        />
        <span class="column">Example of the URL: /reports/device-details/general-info/device-info?deviceId=49330</span>
      </div>
      <div class="row">
        <label class="column" for="showTopNav">showTopNav</label>
        <select class="column" id="showTopNav" [(ngModel)]="showTopNav">
          <option *ngFor="let showTopNavOption of shopTopNavOptions" [value]="showTopNavOption">
            {{ showTopNavOption }}
          </option>
        </select>
      </div>
      <div class="row">
        <label class="column" for="apiserver">Server API URL for Login</label>
        <input
          id="apiserver"
          name="apiserver"
          type="text"
          class="column"
          [(ngModel)]="apiserver"
          placeholder="JDisc API URL"
        />
        <span class="column">Example of the URL: https://192.168.185.23/graphql</span>
      </div>
      <div class="row">
        <label class="column" for="username">Username</label>
        <input
          id="username"
          name="username"
          type="text"
          class="column"
          [(ngModel)]="username"
          placeholder="JDisc user's login'"
        />
      </div>
      <div class="row">
        <label class="column" for="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          class="column"
          [(ngModel)]="password"
          placeholder="JDisc user's password"
        />
      </div>
      <div class="row">
        <button class="column" id="submit" type="button" (click)="showJDiscUI()">Show JDisc UI</button>
        <button class="column" id="refresh" type="button" (click)="refreshJDiscUI()">Refresh JDisc UI</button>
        <button class="column" id="redirect" type="button" (click)="redirectJDiscUI()">Redirect JDisc UI</button>
      </div>
    </fieldset>
    {{ embedUrl }} - {{ username }} - Password will not be shown
    <router-outlet></router-outlet>
  `,
  styles: [
    '.field-container { display: flex; flex-direction: column; background-color: #f4f4f4; flex-wrap: wrap; gap: 1rem; }',
    '.row { display: flex; flex-direction: row; flex: auto; margin-bottom: 1rem; flex-wrap: nowrap; }',
    '.column { flex: 0 1 calc(33.333% - 16px); box-sizing: border-box;  }',
    '@media (max-width: 768px) { .row { flex-wrap: wrap; } .column { flex: 1 0 100%; } }',
  ],
})
export class AppComponent {
  title = 'Sample of application with Integration for JDisc Web UI';

  // server: string = "/reports/device-details/general-info/device-info?deviceId=49330";
  // apiserver: string = "https://192.168.185.23/graphql";
  // username: string = "administrator";
  password = '';

  apiserver = 'https://localhost/graphql';
  // URL inside JDisc Web UI.
  serverUrl = '/reports/device-details/general-info/device-info?deviceId=96';
  username = 'gennadiyt';

  constructor(private router: Router) {}

  showJDiscUI() {
    void this.router.navigate(['jdisc'], {
      replaceUrl: false,
      state: {
        api: this.apiserver,
        server: this.embedUrl,
        username: this.username,
        password: this.password,
      },
      skipLocationChange: true,
    });
  }

  integration!: JdiscIntegrationComponent;
  showTopNav: 'always' | 'smart' | 'never' = 'smart';
  shopTopNavOptions = ['always', 'smart', 'never'];

  get embedUrl(): string {
    const queryParams = {
      showTopNav: this.showTopNav,
    };

    const urlTree = this.router.parseUrl(this.serverUrl);
    urlTree.queryParams = { ...urlTree.queryParams, ...queryParams };
    const parsedUrl = new URL(this.apiserver);

    const protocol = parsedUrl.protocol;
    const hostname = parsedUrl.hostname;
    const port = parsedUrl.port;
    return `${protocol}//${hostname}${port ? ':' + port : ''}` + this.router.serializeUrl(urlTree);
  }

  refreshJDiscUI() {
    this.integration.refresh();
  }

  redirectJDiscUI() {
    this.integration.redirect(this.embedUrl);
  }
}
