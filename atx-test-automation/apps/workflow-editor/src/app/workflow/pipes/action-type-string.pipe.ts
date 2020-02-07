import { ActionTypes } from './../model/actions';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'actionTypeString'
})
export class ActionTypeStringPipe implements PipeTransform {
  transform(actionTypeID: number): string {
    const matchingObjects = ActionTypes.filter(a => a.ActionTypeID === Number(actionTypeID));
    return matchingObjects.length > 0 ? matchingObjects[0].ActionTypeDesc : 'Unknown action type';
  }
}
