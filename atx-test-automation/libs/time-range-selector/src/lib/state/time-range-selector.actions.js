export var TimeRangeSelectorActionTypes;
(function (TimeRangeSelectorActionTypes) {
    TimeRangeSelectorActionTypes["SetTimeRangeSelector"] = "[atxTimeRangeSelector] Set Time Range Selector";
    TimeRangeSelectorActionTypes["MoveRange"] = "[atxTimeRangeSelector] Move Range";
    TimeRangeSelectorActionTypes["ZoomRange"] = "[atxTimeRangeSelector] Zoom Range";
    TimeRangeSelectorActionTypes["Step"] = "[atxTimeRangeSelector] Step";
    TimeRangeSelectorActionTypes["StepIncrement"] = "[atxTimeRangeSelector] Step Increment";
    TimeRangeSelectorActionTypes["LiveToggle"] = "[atxTimeRangeSelector] Live Toggle";
    TimeRangeSelectorActionTypes["GoToNow"] = "[atxTimeRangeSelector] Go To Now";
    TimeRangeSelectorActionTypes["Popup"] = "[atxTimeRangeSelector] Popup";
    TimeRangeSelectorActionTypes["CenterOn"] = "[atxTimeRangeSelector] Center On";
    TimeRangeSelectorActionTypes["ChooseTimeSelection"] = "[atxTimeRangeSelector] Choose Time Selection";
    TimeRangeSelectorActionTypes["GetDefaultJumpTo"] = "[atxTimeRangeSelector] Get Default Jump To";
    TimeRangeSelectorActionTypes["DefaultJumpToRetrieved"] = "[atxTimeRangeSelector] Default Jump To Retrieved";
    TimeRangeSelectorActionTypes["DefaultJumpToFailed"] = "[atxTimeRangeSelector] Default Jump To Failed";
    TimeRangeSelectorActionTypes["GetSelectedJumpToDates"] = "[atxTimeRangeSelector] Get Selected Jump To Dates";
    TimeRangeSelectorActionTypes["SelectedJumpToDatesRetrieved"] = "[atxTimeRangeSelector] Selected Jump To Dates Retrieved";
    TimeRangeSelectorActionTypes["SelectedJumpToDatesFailed"] = "[atxTimeRangeSelector] Selected Jump To Dates Failed";
})(TimeRangeSelectorActionTypes || (TimeRangeSelectorActionTypes = {}));
var SetTimeRangeSelector = /** @class */ (function () {
    function SetTimeRangeSelector(payload) {
        this.payload = payload;
        this.type = TimeRangeSelectorActionTypes.SetTimeRangeSelector;
    }
    return SetTimeRangeSelector;
}());
export { SetTimeRangeSelector };
var MoveRange = /** @class */ (function () {
    function MoveRange(payload) {
        this.payload = payload;
        this.type = TimeRangeSelectorActionTypes.MoveRange;
    }
    return MoveRange;
}());
export { MoveRange };
var ZoomRange = /** @class */ (function () {
    function ZoomRange(payload) {
        this.payload = payload;
        this.type = TimeRangeSelectorActionTypes.ZoomRange;
    }
    return ZoomRange;
}());
export { ZoomRange };
var Step = /** @class */ (function () {
    function Step(payload) {
        this.payload = payload;
        this.type = TimeRangeSelectorActionTypes.Step;
    }
    return Step;
}());
export { Step };
var StepIncrement = /** @class */ (function () {
    function StepIncrement(payload) {
        this.payload = payload;
        this.type = TimeRangeSelectorActionTypes.StepIncrement;
    }
    return StepIncrement;
}());
export { StepIncrement };
var LiveToggle = /** @class */ (function () {
    function LiveToggle(payload) {
        this.payload = payload;
        this.type = TimeRangeSelectorActionTypes.LiveToggle;
    }
    return LiveToggle;
}());
export { LiveToggle };
var GoToNow = /** @class */ (function () {
    function GoToNow(payload) {
        this.payload = payload;
        this.type = TimeRangeSelectorActionTypes.GoToNow;
    }
    return GoToNow;
}());
export { GoToNow };
var Popup = /** @class */ (function () {
    function Popup(payload) {
        this.payload = payload;
        this.type = TimeRangeSelectorActionTypes.Popup;
    }
    return Popup;
}());
export { Popup };
var CenterOn = /** @class */ (function () {
    function CenterOn(payload) {
        this.payload = payload;
        this.type = TimeRangeSelectorActionTypes.CenterOn;
    }
    return CenterOn;
}());
export { CenterOn };
var ChooseTimeSelection = /** @class */ (function () {
    function ChooseTimeSelection(payload) {
        this.payload = payload;
        this.type = TimeRangeSelectorActionTypes.ChooseTimeSelection;
    }
    return ChooseTimeSelection;
}());
export { ChooseTimeSelection };
var GetDefaultJumpTo = /** @class */ (function () {
    function GetDefaultJumpTo(payload) {
        this.payload = payload;
        this.type = TimeRangeSelectorActionTypes.GetDefaultJumpTo;
    }
    return GetDefaultJumpTo;
}());
export { GetDefaultJumpTo };
var DefaultJumpToRetrieved = /** @class */ (function () {
    function DefaultJumpToRetrieved(payload) {
        this.payload = payload;
        this.type = TimeRangeSelectorActionTypes.DefaultJumpToRetrieved;
    }
    return DefaultJumpToRetrieved;
}());
export { DefaultJumpToRetrieved };
var DefaultJumpToFailed = /** @class */ (function () {
    function DefaultJumpToFailed(payload) {
        this.payload = payload;
        this.type = TimeRangeSelectorActionTypes.DefaultJumpToFailed;
    }
    return DefaultJumpToFailed;
}());
export { DefaultJumpToFailed };
var GetSelectedJumpToDates = /** @class */ (function () {
    function GetSelectedJumpToDates(payload) {
        this.payload = payload;
        this.type = TimeRangeSelectorActionTypes.GetSelectedJumpToDates;
    }
    return GetSelectedJumpToDates;
}());
export { GetSelectedJumpToDates };
var SelectedJumpToDatesRetrieved = /** @class */ (function () {
    function SelectedJumpToDatesRetrieved(payload) {
        this.payload = payload;
        this.type = TimeRangeSelectorActionTypes.SelectedJumpToDatesRetrieved;
    }
    return SelectedJumpToDatesRetrieved;
}());
export { SelectedJumpToDatesRetrieved };
var SelectedJumpToDatesFailed = /** @class */ (function () {
    function SelectedJumpToDatesFailed(payload) {
        this.payload = payload;
        this.type = TimeRangeSelectorActionTypes.SelectedJumpToDatesFailed;
    }
    return SelectedJumpToDatesFailed;
}());
export { SelectedJumpToDatesFailed };
//# sourceMappingURL=time-range-selector.actions.js.map