import { Component, ChangeDetectorRef, AfterViewChecked, HostBinding } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { UiService } from '../services/ui.service';


declare abstract class WaitForChangeDetection {
  abstract waitForChangeDetection(): Promise<boolean>;
}


@Component({})
class WaitForChangeDetectionImpl implements AfterViewChecked, WaitForChangeDetection {
  constructor(protected cdRef: ChangeDetectorRef){
    this.viewChecked$ = new Subject<void>();
  }

  viewChecked$: Subject<void>;
  waitForChangeDetection(): Promise<boolean>{
    this.cdRef.detectChanges();
    return new Promise((resolve) => this.viewChecked$.subscribe(() => resolve(true)));
  }

  ngAfterViewChecked(){
    this.viewChecked$.next();
  }
}

@Component({})
export class Slideable extends WaitForChangeDetectionImpl {
  constructor(protected cdRef: ChangeDetectorRef, private uiService: UiService){
    super(cdRef);
  }

  @HostBinding('@slideVertical')
  get slideVertical(){
    let slideDirection = this.uiService.getDirection();
    if(slideDirection){
      return slideDirection === 'top' ? 'fromTop' : 'fromBot';
    }
    return null;
  }
}
