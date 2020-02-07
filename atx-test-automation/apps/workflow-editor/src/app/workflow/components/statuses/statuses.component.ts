import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import {
  faCog,
  faArrowCircleDown,
  faArrowCircleUp,
  faArrowDown,
  faArrowUp,
  faCheck,
  faTrash,
  faSave,
  faEdit,
  faBan,
  faTimes,
  faPlus,
  faCaretDown,
  faCaretUp
} from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormArray } from '@angular/forms';
import { AssetClassType } from '../../model/issue-class-and-categories';
import { WorkflowFormState } from '../../model/form-edit-state';
import { WorkflowFormService } from '../../services/workflow-form.service';
import { MatDialog } from '@angular/material';
import { IGeoSpaDropdownItem, IStatesForLayer } from '@AtonixWebSites/api';

@Component({
  selector: 'atx-statuses',
  templateUrl: './statuses.component.html',
  styleUrls: ['./statuses.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatusesComponent implements OnInit {
  @Input() validationMessages: object;
  @Input() showValidationMessages: boolean;
  @Input() issueClassDesc: string | null;
  @Input() selectedAssetClassTypes: AssetClassType[] | null;
  @Input() formState: WorkflowFormState;
  @Input() workflowForm: FormGroup | null;
  @Input() selectedDrawerItemForStatus: number[];
  @Input() numResolutionStatuses: number;
  @Input() editingWhichName?: number;
  @Input() savedNameForEdit?: string;
  @Input() expandAllAccordions: boolean;
  @Input() showSettingsButton: boolean;
  @Input() settingsOpen: boolean;
  @Input() mapsForAsset: IGeoSpaDropdownItem;
  // @Input() assetClassType: string;
  @Input() layerForMap: IStatesForLayer;

  @Output() changeSelectedMap = new EventEmitter();
  @Output() deleteAction = new EventEmitter();
  @Output() deleteResolutionStatus = new EventEmitter();

  @Output() addAction = new EventEmitter();
  @Output() actionTypeChanged = new EventEmitter();
  @Output() selectDrawerItem = new EventEmitter();
  @Output() startEditingName = new EventEmitter();
  @Output() stopEditingName = new EventEmitter();
  @Output() cancelEditingName = new EventEmitter();
  @Output() expandAllToggle = new EventEmitter();

  @Output() openSettings = new EventEmitter();
  @Output() closeSettings = new EventEmitter();
  @Output() settingsButtonClicked = new EventEmitter();

  @ViewChild('resolutionNameInput') resolutionNameInput;

  WorkflowFormStateType = WorkflowFormState;
  faIcons = {
    faCog,
    faArrowCircleDown,
    faArrowCircleUp,
    faCheck,
    faUp: faArrowUp,
    faDown: faArrowDown,
    faDelete: faTrash,
    faSave,
    faBan,
    faEdit,
    faTimes,
    faAdd: faPlus,
    faCaretDown,
    faCaretUp
  };

  constructor(private wffService: WorkflowFormService, public dialog: MatDialog) {}

  ngOnInit() {}

  toggleExpandAll() {
    this.expandAllToggle.emit();
  }
  openSettingsClicked() {
    this.openSettings.emit();
  }

  closeSettingsClicked() {
    this.closeSettings.emit();
  }

  categorySettingsClicked() {
    this.settingsButtonClicked.emit();
  }

  onChangeSelectedMap(selectedMap: string) {
    this.changeSelectedMap.emit(selectedMap);
  }

  selectDrawerItemForStatus(drawerItemIndex: number, whichStatus: number) {
    this.selectDrawerItem.emit({ whichStatus, drawerItemIndex });
  }

  clickDeleteAction(whichAction: number, whichStatus: number) {
    this.deleteAction.emit({ whichAction, whichStatus });
  }
  clickAddAction(whichStatus: number) {
    this.addAction.emit({ whichStatus });
  }
  changeActionType(event: { actionType; whichAction: number }, whichStatus: number) {
    this.actionTypeChanged.emit({ whichStatus, whichAction: event.whichAction, actionType: event.actionType });
  }

  buttonAddResolutionStatus() {
    this.wffService.addResolutionStatus();
  }

  buttonMoveResolutionStatusUp(which: number) {
    this.wffService.moveResolutionStatusUp(which);
  }

  buttonMoveResolutionStatusDown(which: number) {
    this.wffService.moveResolutionStatusDown(which);
  }

  buttonRemoveResolutionStatus(which: number) {
    this.deleteResolutionStatus.emit(which);
  }

  buttonStartEditingName(which: number) {
    this.startEditingName.emit(which);
    setTimeout(() => {
      this.resolutionNameInput.nativeElement.focus();
    }, 0);
  }

  buttonStopEditingName() {
    this.stopEditingName.emit();
  }

  buttonCancelEditingName() {
    this.cancelEditingName.emit();
  }

  handleEditNameKeyStroke(event) {
    if (event.keyCode === 32) {
      event.stopPropagation();
    } else if (event.keyCode === 13) {
      event.stopPropagation();
      this.buttonStopEditingName();
    }
  }
}
