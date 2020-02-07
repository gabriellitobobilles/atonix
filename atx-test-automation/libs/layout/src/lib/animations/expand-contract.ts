import { trigger, state, style, transition, animate } from '@angular/animations';

export const expandContract = trigger('expandContract', [
  state(
    'expand',
    style({
      width: '{{ width }}'
    }),
    { params: { width: '0' } }
  ),
  state(
    'contract',
    style({
      width: '{{ width }}'
    }),
    { params: { width: '0' } }
  ),
  transition('contract => expand', [animate('0.25s ease-out')]),
  transition('expand => contract', [animate('0.15s ease-out')])
]);
