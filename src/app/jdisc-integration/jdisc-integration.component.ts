import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from "@angular/router";
import {switchMap, tap} from "rxjs";

@Component({
  selector: 'ext-jdisc-integration',
  template: `
    <p>
      {{ timestamp }} The following steps to execute for JDisc WebUI integration!
    </p>
    <ul>
      <li>Login</li>
      <li>Load URL into &gt;iframe&lt;</li>

      <ng-container *ngIf="token">
        <iframe src="server"></iframe>
      </ng-container>
    </ul>
  `,
  styles: []
})
export class JdiscIntegrationComponent implements OnInit {
  timestamp = new Date();
  token?: string;

  constructor(readonly route: ActivatedRoute, readonly router: Router) {
    route.data.pipe(tap((data) => {
      setTimeout(() =>  this.timestamp = new Date(), 0);
    }),
      ).subscribe();
  }

  ngOnInit(): void {
  }

}
