import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from "@angular/router";
import { tap } from "rxjs";

@Component({
  selector: 'ext-jdisc-integration',
  template: `
    <p>
      {{ timestamp }} The following steps to execute for JDisc WebUI integration!
    </p>
    <ul>
      <li>Login</li>
      <li>Load URL into &gt;iframe&lt;</li>
      {{ route.snapshot.toString() }}
    </ul>
  `,
  styles: []
})
export class JdiscIntegrationComponent implements OnInit {
  timestamp = new Date();

  constructor(readonly route: ActivatedRoute, readonly router: Router) {
    route.data.pipe(tap((data) => console.log(data))).subscribe();
  }

  ngOnInit(): void {
  }

}
