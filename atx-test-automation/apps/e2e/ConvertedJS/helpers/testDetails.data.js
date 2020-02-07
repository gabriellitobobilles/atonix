"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var casual = require("casual");
var protractor_1 = require("protractor");
// const appName = {
//   adaptivePlanning: 'Adaptive Planning Performance Analyst',
//   airPermits: 'Air Permits',
//   alerts: 'Alerts',
//   arcFlash: 'Arc Flash',
//   asset360: 'Asset 360',
//   assetExplorer: 'Asset Explorer',
//   // criteriaObjectUtility: 'Criteria Object Utility',
//   // csapr: 'CSAPR',
//   // environmentalDashboard: 'Environmental Dashboard',
//   investmentAccelerator: 'Investment Accelerator',
//   issuesManagement: 'Issues Management',
//   performanceAnalyst: 'Performance Analyst',
//   workManagement: 'Work Management',
//   programNavigator: 'Program Navigator',
//   riskAssessment: 'Risk Assessment'
// };
var appName;
(function (appName) {
    appName["adaptivePlanning"] = "Adaptive Planning Performance Analyst";
    appName["airPermit"] = "Air Permits";
    appName["alerts"] = "Alerts";
    appName["arcFlash"] = "Arc Flash";
    appName["asset360"] = "Asset 360";
    appName["assetExplorer"] = "Asset Explorer";
    // criteriaObjectUtility: 'Criteria Object Utility',
    // csapr: 'CSAPR',
    // environmentalDashboard: 'Environmental Dashboard',
    appName["investmentAccelerator"] = "Investment Accelerator";
    appName["issuesManagement"] = "Issues Management";
    appName["performanceAnalyst"] = "Performance Analyst";
    appName["workManagement"] = "Work Management";
    appName["programNavigator"] = "Program Navigator";
    appName["riskAssessment"] = "Risk Assessment";
})(appName || (appName = {}));
exports.appName = appName;
var userObj = {
    email: 'AtonixQATeam@BlackandVeatch.onmicrosoft.com',
    password: 'Passw0rd1!',
};
exports.userObj = userObj;
var clientData = {
    clientGroup: 'Demo Clients',
    clientName: 'Test Asset',
    issueClass: 'Pole Attachment Program',
};
exports.clientData = clientData;
var workflowEditorTestData = {
    actionDataResolution1: {
        group: 'resolution',
        type: 'attribute',
        count: 1,
        details: ["Attribute Name Test", "Attribute Value Test"],
    },
    actionDataResolution2: {
        group: 'resolution',
        type: 'email',
        count: 1,
        details: [userObj.email, "subject email resolution", "subject body resolution"],
    },
    actionDataOpen: {
        group: 'open',
        type: 'email',
        count: 1,
        details: [userObj.email, "email subject open", "email body open"],
    },
    actionDataClosed: {
        group: 'closed',
        type: 'attribute',
        count: 1,
        details: ["Attribute Name Closed", "Attribute Value Closed"],
    },
};
exports.workflowEditorTestData = workflowEditorTestData;
// -- Category Data -->
var automationAssetData = {
    clientGroup: 'nD Test Client',
    clientName: 'nD Test StationGroup',
};
exports.automationAssetData = automationAssetData;
var date = new Date();
var actionStatus = {
    entering: 'Entering',
    leaving: 'Leaving',
};
var downloadFileType = {
    /** these object list for Performance Analyst */
    PNG: 1,
    JPEG: 2,
    PDF: 3,
    SVG: 4,
    /** these object list for data explorer */
    png: 0,
    jpeg: 1,
    pdf: 2,
    svg: 3,
};
exports.downloadFileType = downloadFileType;
var downloadFileName = {
    FilePNG: 'chart.png',
    FileJPEG: 'chart.jpg',
    FilePDF: 'chart.pdf',
    FileSVG: 'chart.svg',
    FileCSV: 'chart.csv',
    issuesCSV: 'issues.csv',
    downloadCSV: /Download_/
};
exports.downloadFileName = downloadFileName;
var categoryData = {
    categoryName: casual.word + '_' + casual.word + '_' + date.getTime(),
    issueName: 'Membrane Cleaning',
    assetName: ['Generic Station Group'],
    resolutionStatus: [{
            name: '1_reso_' + casual.word,
            actions: [{
                    type: 'email',
                    actionName: '1_action_' + casual.word,
                    recipient: userObj.email,
                    subject: casual.word,
                    messageBody: casual.sentence,
                    allowOverride: false,
                    advancedSettings: {
                        actionStatus: actionStatus.entering,
                    },
                }],
        }, {
            name: '2_reso_' + casual.word,
            actions: [],
        }],
    issueActivities: {
        open: [{
                type: 'email',
                actionName: '1_action_' + casual.word,
                recipient: userObj.email,
                subject: casual.word,
                messageBody: casual.sentence,
                advancedSettings: {
                    actionStatus: actionStatus.entering,
                },
            }, {
                type: 'attribute',
                actionName: "2_action_" + casual.word,
                name: casual.word,
                value: "value_" + casual.random,
                advancedSettings: {
                    actionStatus: actionStatus.leaving,
                },
            }],
        closed: [{
                type: 'email',
                actionName: '1_action_' + casual.word,
                recipient: userObj.email,
                subject: casual.word,
                messageBody: casual.sentence,
                advancedSettings: {
                    actionStatus: actionStatus.entering,
                },
            }, {
                type: 'attribute',
                actionName: "2_action_" + casual.word,
                name: casual.word,
                value: "value_" + casual.random,
                advancedSettings: {
                    actionStatus: actionStatus.leaving,
                },
            }],
    },
};
exports.categoryData = categoryData;
// <-- End category data --
// <---- Server to Test
var serverData = {
    test: 'https://siitest.asset360.com/',
    stage: 'https://stage.asset360.com/',
    stageReload: 'https://siistage.asset360.com/Unauthorized.html#!?returnUrl=https:%2F%2Fsiitest.asset360.com%2F',
};
// const serverToTest = serverData.test;
var serverToTest = serverData[protractor_1.browser.params.env];
exports.serverToTest = serverToTest;
// -- End of Server to Test --
var elementType = {
    textField: 'textField', listBox: 'listBox', dropDown: 'dropDown'
};
exports.elementType = elementType;
//# sourceMappingURL=testDetails.data.js.map