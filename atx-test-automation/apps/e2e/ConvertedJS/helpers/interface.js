"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PriorityValues;
(function (PriorityValues) {
    PriorityValues["Low"] = "Low";
    PriorityValues["Medium"] = "Medium";
    PriorityValues["High"] = "High";
    PriorityValues["Critical"] = "Critical";
})(PriorityValues = exports.PriorityValues || (exports.PriorityValues = {}));
var AttributeTypesEnum;
(function (AttributeTypesEnum) {
    AttributeTypesEnum[AttributeTypesEnum["Freeform Text"] = 0] = "Freeform Text";
    AttributeTypesEnum[AttributeTypesEnum["Integer"] = 1] = "Integer";
    AttributeTypesEnum[AttributeTypesEnum["Float"] = 2] = "Float";
    AttributeTypesEnum[AttributeTypesEnum["Discrete List"] = 3] = "Discrete List";
    AttributeTypesEnum[AttributeTypesEnum["Boolean"] = 4] = "Boolean";
    AttributeTypesEnum[AttributeTypesEnum["Date"] = 5] = "Date";
})(AttributeTypesEnum = exports.AttributeTypesEnum || (exports.AttributeTypesEnum = {}));
var AssetEventsViewEnum;
(function (AssetEventsViewEnum) {
    AssetEventsViewEnum[AssetEventsViewEnum["asset"] = 0] = "asset";
    AssetEventsViewEnum[AssetEventsViewEnum["events"] = 1] = "events";
})(AssetEventsViewEnum = exports.AssetEventsViewEnum || (exports.AssetEventsViewEnum = {}));
var EventTypesEnum;
(function (EventTypesEnum) {
    EventTypesEnum[EventTypesEnum["Fault"] = 0] = "Fault";
    EventTypesEnum[EventTypesEnum["Inspection"] = 1] = "Inspection";
    EventTypesEnum[EventTypesEnum["Outage"] = 2] = "Outage";
})(EventTypesEnum = exports.EventTypesEnum || (exports.EventTypesEnum = {}));
var MilestoneStatus;
(function (MilestoneStatus) {
    MilestoneStatus[MilestoneStatus["Not Started"] = 0] = "Not Started";
    MilestoneStatus[MilestoneStatus["Mitigation Plan"] = 1] = "Mitigation Plan";
    MilestoneStatus[MilestoneStatus["Engineering"] = 2] = "Engineering";
    MilestoneStatus[MilestoneStatus["Procurement"] = 3] = "Procurement";
    MilestoneStatus[MilestoneStatus["Permitting"] = 4] = "Permitting";
    MilestoneStatus[MilestoneStatus["Construction"] = 5] = "Construction";
    MilestoneStatus[MilestoneStatus["Close-out"] = 6] = "Close-out";
    MilestoneStatus[MilestoneStatus["Mitigation Complete"] = 7] = "Mitigation Complete";
})(MilestoneStatus = exports.MilestoneStatus || (exports.MilestoneStatus = {}));
var MilestoneType;
(function (MilestoneType) {
    MilestoneType[MilestoneType["Plan"] = 0] = "Plan";
    MilestoneType[MilestoneType["Actual"] = 1] = "Actual";
})(MilestoneType = exports.MilestoneType || (exports.MilestoneType = {}));
//# sourceMappingURL=interface.js.map