import * as casual from 'casual';
import { browser } from 'protractor';

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
enum appName {
  adaptivePlanning = 'Adaptive Planning Performance Analyst',
  airPermit = 'Air Permits',
  alerts = 'Alerts',
  arcFlash = 'Arc Flash',
  asset360 = 'Asset 360',
  assetExplorer = 'Asset Explorer',
  // criteriaObjectUtility: 'Criteria Object Utility',
  // csapr: 'CSAPR',
  // environmentalDashboard: 'Environmental Dashboard',
  investmentAccelerator = 'Investment Accelerator',
  issuesManagement = 'Issues Management',
  performanceAnalyst = 'Performance Analyst',
  workManagement = 'Work Management',
  programNavigator = 'Program Navigator',
  riskAssessment = 'Risk Assessment'
}

const userObj = {
  email: 'AtonixQATeam@BlackandVeatch.onmicrosoft.com',
  password: 'Passw0rd1!',
};

const clientData = {
  clientGroup: 'Demo Clients',
  clientName: 'Test Asset',
  issueClass: 'Pole Attachment Program',
};

const workflowEditorTestData = {
  actionDataResolution1: {
    group: 'resolution',
    type: 'attribute',
    count: 1,
    details: [`Attribute Name Test`, `Attribute Value Test`],
  },
  actionDataResolution2: {
    group: 'resolution',
    type: 'email',
    count: 1,
    details: [userObj.email, `subject email resolution`, `subject body resolution`],
  },
  actionDataOpen: {
    group: 'open',
    type: 'email',
    count: 1,
    details: [userObj.email, `email subject open`, `email body open`],
  },
  actionDataClosed: {
    group: 'closed',
    type: 'attribute',
    count: 1,
    details: [`Attribute Name Closed`, `Attribute Value Closed`],
  },
};
// -- Category Data -->
const automationAssetData = {
  clientGroup: 'nD Test Client',
  clientName: 'nD Test StationGroup',
};

const date = new Date();
const actionStatus = {
  entering: 'Entering',
  leaving: 'Leaving',
};

const downloadFileType = {

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

const downloadFileName = {
  FilePNG: 'chart.png',
  FileJPEG: 'chart.jpg',
  FilePDF: 'chart.pdf',
  FileSVG: 'chart.svg',
  FileCSV: 'chart.csv',
  issuesCSV: 'issues.csv',
  downloadCSV: /Download_/
};
const categoryData = {
  categoryName: casual.word + '_' + casual.word + '_' + date.getTime(),
  issueName: 'Membrane Cleaning',
  assetName: ['Generic Station Group'],
  resolutionStatus: [{
    name: '1_reso_' + casual.word,
    actions: [{ // actions for resolution, no logic yet to CreateCategoryComplete
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
      actionName: `2_action_` + casual.word,
      name: casual.word,
      value: `value_` + casual.random,
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
      actionName: `2_action_` + casual.word,
      name: casual.word,
      value: `value_` + casual.random,
      advancedSettings: {
        actionStatus: actionStatus.leaving,
      },
    }],
  },
};

// <-- End category data --

// <---- Server to Test
const serverData = {
  test: 'https://siitest.asset360.com/',
  stage: 'https://stage.asset360.com/',
  stageReload: 'https://siistage.asset360.com/Unauthorized.html#!?returnUrl=https:%2F%2Fsiitest.asset360.com%2F',
};
// const serverToTest = serverData.test;
const serverToTest = serverData[browser.params.env];
// -- End of Server to Test --

const elementType = {
  textField: 'textField', listBox: 'listBox', dropDown: 'dropDown'
};

export {
  appName,
  userObj,
  clientData,
  automationAssetData,
  workflowEditorTestData,
  categoryData,
  downloadFileType,
  downloadFileName,
  serverToTest,
  elementType
};
