import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { AssetClassType } from '../../../model/issue-class-and-categories';

@Component({
  selector: 'atx-view-category-settings',
  templateUrl: './view-category-settings.component.html',
  styleUrls: ['./view-category-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewCategorySettingsComponent implements OnInit {
  @Input() categoryDesc: string;
  @Input() issueClassDesc: string;
  @Input() selectedAssetClassTypes: AssetClassType[];
  @Output() closeSettingsClick = new EventEmitter();

  faTimes = faTimes;
  constructor() {}

  ngOnInit() {}

  closeSettings() {
    this.closeSettingsClick.emit();
  }
}
