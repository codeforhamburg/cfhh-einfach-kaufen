import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';

declare abstract class WaitForChangeDetection {
  abstract waitForChangeDetection(): Promise<boolean>;
}

@Injectable()
export class CanDeactivateAfterChangeDetectionGuard implements CanDeactivate<WaitForChangeDetection> {
  canDeactivate(component: WaitForChangeDetection): Promise<boolean> {
    return component.waitForChangeDetection();
  }
}

// @Injectable()
// export class CanDeactivateAfterChangeDetectionGuard implements CanActivate {
//   canActivate(
//     next: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
//     return true;
//   }
// }
