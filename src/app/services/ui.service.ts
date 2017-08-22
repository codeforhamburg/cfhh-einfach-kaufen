import { Injectable } from '@angular/core';
import { Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class UiService {

    public pos = 0;
    public direction = 'none';
    public currentPosition: number = undefined;
    public showFooter = false;
    public showImpressum = false;
    public showAbout = false;
    public currentIndex = 3;

    public showSelectedFeature = false;
    public showFilter = false;

    public popupFeature;
    public selectedFeature;

    // direction$: Observable<String>;
    // directionSubj : Subject<String>;

    constructor() {
        // this.directionSubj = new Subject<String>();
        // this.direction$ = this.directionSubj.asObservable();
    }

    setDirection(direction: string) {
        this.direction = direction;
    }
    getDirection(): string {
        return this.direction;
    }

}
