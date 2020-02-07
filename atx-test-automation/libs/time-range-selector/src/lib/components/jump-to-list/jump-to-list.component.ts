import { Component, OnInit } from '@angular/core';
import { TimeRangeSelectorFacade } from '../../state/time-range-selector.facade';
import { Observable } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { parseCookieValue } from '@angular/common/src/cookie';

@Component({
  selector: 'atx-jump-to-list',
  templateUrl: './jump-to-list.component.html',
  styleUrls: ['./jump-to-list.component.scss']
})
export class JumpToListComponent implements OnInit {
  jumpToList$: Observable<any[]>;

  public form = new FormGroup({
    coValue: new FormControl('')
  });

  constructor(private facade: TimeRangeSelectorFacade) {
    this.jumpToList$ = facade.jumpToList$;
  }

  ngOnInit() {
    this.facade.GetDefaultJumpToList();
  }

  SelectionChanged($event) {
    if ($event.value) {
      this.facade.SelectJumpToListItem($event.value);
      this.form.reset();
    }
  }
}
