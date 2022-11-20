import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { catchError, map, NEVER, Observable, switchMap, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";

export type LoginResult = {
  accessToken?: string;
  refreshToken?: string;
  status?: string;
}

@Component({
  selector: 'ext-jdisc-integration',
  template: `
    <p>
      {{ timestamp }} The following steps to execute for JDisc WebUI integration!
    </p>
    <ul>
      <li>Login</li>
      <li>Load URL into &gt;iframe&lt;</li>

      <iframe #jdiscIframe style="width: 100%; height: 1024px;"></iframe>
    </ul>
  `,
  styles: []
})
export class JdiscIntegrationComponent implements AfterViewInit {
  timestamp = new Date();
  token?: string;
  @ViewChild('jdiscIframe', {static: false}) iframeRef!: ElementRef<HTMLIFrameElement>;

  constructor(readonly route: ActivatedRoute, readonly router: Router, private http: HttpClient) {

  }

  ngAfterViewInit(): void {
    this.route.data.pipe(map((data) => {
        setTimeout(() => this.timestamp = new Date(), 0);
        return data['state'];
      }),
      switchMap((data) => this.login(data['api'], data['username'], data['password']).pipe(tap((loginResult) => {
        if (loginResult.status == "SUCCESS") {
          this.showJDiscUIInIframe(loginResult.accessToken!, loginResult.refreshToken!, this.iframeRef, data["server"]);
        } else {
          window.alert(loginResult.status)
        }
      }))))
      .subscribe();
  }

  private login(api: string, username: string, password: string): Observable<LoginResult> {
    return this.http.post(api, {
      "operationName": "login",
      "variables": {
        "login": username,
        "password": password,
      },
      "query": "mutation login($login: String!, $password: String!) {\n  authentication {\n    login(login: $login, password: $password) {\n      accessToken\n      refreshToken\n      status\n      __typename\n    }\n    __typename\n  }\n}"
    }).pipe(
      map((loginResult) => (loginResult as any).data?.authentication?.login as LoginResult),
      catchError((err) => {
        return NEVER;
      }));
  }

  private showJDiscUIInIframe(accessToken: string, refreshToken: string, iframeRef: ElementRef<HTMLIFrameElement>, server: string) {
    iframeRef.nativeElement.src = server;
    iframeRef.nativeElement.contentWindow?.postMessage({accessToken, refreshToken}, '*');
    this.token = accessToken
  }
}
