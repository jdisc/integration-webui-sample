import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { catchError, map, NEVER, Observable, Subject, switchMap, take, tap } from "rxjs";

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
  private embeddedJDiscReady: Subject<boolean> = new Subject<boolean>();

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

  @HostListener('window:message', ['$event'])
  provideAuthentication($event: any) {
    if ($event.data?.versionInfo?.productName === "JDisc Discovery" && $event.data?.status == "started") {
      this.embeddedJDiscReady.next(true);
    }
  }

  private showJDiscUIInIframe(accessToken: string, refreshToken: string, iframeRef: ElementRef<HTMLIFrameElement>, server: string) {
    this.embeddedJDiscReady.pipe(take(1), tap(() => {
      iframeRef.nativeElement.contentWindow?.postMessage({accessToken, refreshToken}, '*');
      this.token = accessToken
    })).subscribe();
    iframeRef.nativeElement.src = server;
  }
}
