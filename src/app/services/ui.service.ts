import { Injectable } from '@angular/core';
import { Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class UiService {

    public pos = 0;
    public direction = 'down';
    public currentPosition: number = undefined;

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
