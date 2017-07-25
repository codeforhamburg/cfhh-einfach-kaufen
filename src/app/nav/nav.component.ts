import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UiService} from '../services/ui.service';

@Component({
  selector: 'wbc-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

    constructor(private router: Router, private uiService: UiService) { 
    }

    // activateRoute(route, id) {
    //     if (id > this.uiService.currentPosition) {
    //         this.uiService.direction = 'down';
    //     } else {
    //         this.uiService.direction = 'up';
    //     }
    //     this.uiService.currentPosition = id;
    //     this.router.navigateByUrl(route);
    // }

    ngOnInit() {
    }

}
