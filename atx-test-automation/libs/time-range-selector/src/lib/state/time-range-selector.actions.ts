import { Action } from '@ngrx/store';
import { ICriteria } from '@AtonixWebSites/api';

export enum TimeRangeSelectorActionTypes {
  SetTimeRangeSelector = '[atxTimeRangeSelector] Set Time Range Selector',
  MoveRange = '[atxTimeRangeSelector] Move Range',
  ZoomRange = '[atxTimeRangeSelector] Zoom Range',
  Step = '[atxTimeRangeSelector] Step',
  StepIncrement = '[atxTimeRangeSelector] Step Increment',
  LiveToggle = '[atxTimeRangeSelector] Live Toggle',
  GoToNow = '[atxTimeRangeSelector] Go To Now',
  Popup = '[atxTimeRangeSelector] Popup',
  CenterOn = '[atxTimeRangeSelector] Center On',
  ChooseTimeSelection = '[atxTimeRangeSelector] Choose Time Selection',
  GetDefaultJumpTo = '[atxTimeRangeSelector] Get Default Jump To',
  DefaultJumpToRetrieved = '[atxTimeRangeSelector] Default Jump To Retrieved',
  DefaultJumpToFailed = '[atxTimeRangeSelector] Default Jump To Failed',
  GetSelectedJumpToDates = '[atxTimeRangeSelector] Get Selected Jump To Dates',
  SelectedJumpToDatesRetrieved = '[atxTimeRangeSelector] Selected Jump To Dates Retrieved',
  SelectedJumpToDatesFailed = '[atxTimeRangeSelector] Selected Jump To Dates Failed'
}

export class SetTimeRangeSelector implements Action {
  readonly type = TimeRangeSelectorActionTypes.SetTimeRangeSelector;
  constructor(
    public payload: {
      startDate?: Date;
      endDate?: Date;
      indicator?: Date;
      rangeStart?: Date;
      rangeEnd?: Date;
      nowMarker?: Date;
    }
  ) {}
}

export class MoveRange implements Action {
  readonly type = TimeRangeSelectorActionTypes.MoveRange;
  constructor(public payload: 'left' | 'right') {}
}

export class ZoomRange implements Action {
  readonly type = TimeRangeSelectorActionTypes.ZoomRange;
  constructor(public payload: 'in' | 'out') {}
}

export class Step implements Action {
  readonly type = TimeRangeSelectorActionTypes.Step;
  constructor(public payload: 'left' | 'right') {}
}

export class StepIncrement implements Action {
  readonly type = TimeRangeSelectorActionTypes.StepIncrement;
  constructor(public payload: 'days' | 'weeks' | 'months' | 'quarters' | 'years') {}
}

export class LiveToggle implements Action {
  readonly type = TimeRangeSelectorActionTypes.LiveToggle;
  constructor(public payload?: any) {}
}

export class GoToNow implements Action {
  readonly type = TimeRangeSelectorActionTypes.GoToNow;
  constructor(public payload?: any) {}
}

export class Popup implements Action {
  readonly type = TimeRangeSelectorActionTypes.Popup;
  constructor(public payload: boolean) {}
}

export class CenterOn implements Action {
  readonly type = TimeRangeSelectorActionTypes.CenterOn;
  constructor(public payload: 'future' | 'present' | 'past') {}
}

export class ChooseTimeSelection implements Action {
  readonly type = TimeRangeSelectorActionTypes.ChooseTimeSelection;
  constructor(public payload: 'days' | 'weeks' | 'months' | 'quarters' | 'years') {}
}

export class GetDefaultJumpTo implements Action {
  readonly type = TimeRangeSelectorActionTypes.GetDefaultJumpTo;
  constructor(public payload?) {}
}

export class DefaultJumpToRetrieved implements Action {
  readonly type = TimeRangeSelectorActionTypes.DefaultJumpToRetrieved;
  constructor(public payload: ICriteria[]) {}
}

export class DefaultJumpToFailed implements Action {
  readonly type = TimeRangeSelectorActionTypes.DefaultJumpToFailed;
  constructor(public payload?) {}
}

export class GetSelectedJumpToDates implements Action {
  readonly type = TimeRangeSelectorActionTypes.GetSelectedJumpToDates;
  constructor(public payload: number) {}
}

export class SelectedJumpToDatesRetrieved implements Action {
  readonly type = TimeRangeSelectorActionTypes.SelectedJumpToDatesRetrieved;
  constructor(public payload: { StartDate: Date; EndDate: Date }) {}
}

export class SelectedJumpToDatesFailed implements Action {
  readonly type = TimeRangeSelectorActionTypes.SelectedJumpToDatesFailed;
  constructor(public payload?) {}
}

export type TimeRangeSelectorActions =
  | SetTimeRangeSelector
  | MoveRange
  | ZoomRange
  | Step
  | StepIncrement
  | LiveToggle
  | GoToNow
  | Popup
  | CenterOn
  | ChooseTimeSelection
  | GetDefaultJumpTo
  | DefaultJumpToRetrieved
  | DefaultJumpToFailed
  | GetSelectedJumpToDates
  | SelectedJumpToDatesRetrieved
  | SelectedJumpToDatesFailed;
