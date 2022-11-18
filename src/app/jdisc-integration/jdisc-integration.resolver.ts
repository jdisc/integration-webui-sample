import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JdiscIntegrationResolver implements Resolve<RouterStateSnapshot> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<RouterStateSnapshot> {
    return of(state);
  }
}
