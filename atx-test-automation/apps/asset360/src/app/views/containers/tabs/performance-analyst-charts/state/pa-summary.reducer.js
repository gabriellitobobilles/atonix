import * as tslib_1 from "tslib";
import { PaActionTypes } from './pa-summary.actions';
var initialState = {
    summaryCharts: null,
    message: '',
    pending: true
};
export function paSummaryReducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case PaActionTypes.CountIssueAndAlertsFailure:
            return tslib_1.__assign({}, state, { message: action.payload, pending: false });
        case PaActionTypes.CountIssueAndAlerts:
            return tslib_1.__assign({}, state, { pending: true });
        case PaActionTypes.ConfigurePieChartsSuccess:
            return tslib_1.__assign({}, state, { summaryCharts: action.payload, pending: false });
        default:
            return state;
    }
}
//# sourceMappingURL=pa-summary.reducer.js.map