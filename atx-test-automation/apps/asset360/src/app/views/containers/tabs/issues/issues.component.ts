import { Component, OnInit } from '@angular/core';
import {
  faCog,
  faArrowCircleDown,
  faArrowCircleUp,
  faArrowDown,
  faArrowUp,
  faSave,
  faBan,
  faTimes,
  faPlus,
  faCaretDown,
  faCaretUp
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'atx-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss']
})
export class IssuesComponent implements OnInit {
  constructor() {}

  faIcons = {
    faCog,
    faArrowCircleDown,
    faArrowCircleUp,
    faArrowDown,
    faArrowUp,
    faSave,
    faBan,
    faTimes,
    faPlus,
    faCaretDown,
    faCaretUp
  };

  ngOnInit() {}
}
