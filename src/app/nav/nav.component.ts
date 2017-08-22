import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UiService} from '../services/ui.service';

@Component({
  selector: 'wbc-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(private router: Router, public uiService: UiService) { }

    ngOnInit() {
    }

}
