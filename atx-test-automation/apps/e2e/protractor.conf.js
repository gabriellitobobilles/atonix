// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

//const { SpecReporter } = require('jasmine-spec-reporter');
var HtmlReporter = require('protractor-beautiful-reporter');
const SpecReporter = require('jasmine-spec-reporter').SpecReporter;
const path = require('path');
const downloadsPath = path.resolve(__dirname, './src/test_Data/DownloadFiles');


// process.env.CHROME_BIN =
//   process.env.CHROME_BIN || require("puppeteer").executablePath();

exports.config = {
  // allScriptsTimeout: 11000,

  params: {
    env: 'test'
  },

  seleniumAddress: 'http://localhost:4444/wd/hub',
  // seleniumServerJar: './selenium-server-standalone-3.141.59.jar',
  // capabilities: {
  // 	'browserName': 'chrome',
  // 	chromeOptions: {
  // 		args: ["incognito", "disable-extensions", "start-maximized"]
  // 	}
  // },

  multiCapabilities: [
    {
      'browserName': 'chrome',
      shardTestFiles: true,
      maxInstances: 3,
      // maxSessions: 3,
      chromeOptions:
      {
        // args: ['--incognito', '--disable-gpu', '--window-size=1920, 1080', '--headless'],
        args: ['--incognito', '--disable-gpu', '--window-size=1600, 1268'],
        // args: ['--incognito', '--disable-extensions', '--start - maximized'],
        // args: ['--headless', '--incognito', '--disable-gpu', '--window-size=1600, 1268'],
        w3c: false,
        prefs: {
          download: {
            prompt_for_download: false,
            directory_upgrade: true,
            default_directory: downloadsPath,
          }
        }
      },
    },
    // {
    //   'browserName': 'firefox',
    //   'marionette': false,
    //   'moz:firefoxOptions':
    //   {
    //     args: ['--window-size=1600, 1268'],
    //     // prefs: {
    //     //   download: {
    //     //     prompt_for_download: false,
    //     //     directory_upgrade: true,
    //     //     default_directory: downloadsPath,
    //     //   }
    //     // }
    //   }
    // },

    // {
    // 	'browserName': 'internet explorer',
    // 	'ignoreProtectedModeSettings': true
    // }
  ],
  specs: ['ConvertedJS/specs/ListView/program-navigator-LV-NonScheduled-inline-filter.e2e-spec.js'],

  suites: {
    // asset360login: './src/asset360login/**/*.e2e-spec.ts',
    // menuselection: './src/menuselection/**/*.e2e-spec.ts',
    // workflowconfig: './src/workflowconfig/**/*.e2e-spec.ts',
    // asset360logout: './src/asset360logout/**/*.e2e-spec.ts',
    // issuesManagement: 'ConvertedJS/specs/IssuesManagement/*.e2e-spec.js',
    issuesManagement: [
      // 'ConvertedJS/specs/IssuesManagement/configureWorkflowCategory.e2e-spec.js',
      // 'ConvertedJS/specs/IssuesManagement/configureWorkflowResolutionStatus.e2e-spec.js',
      // 'ConvertedJS/specs/IssuesManagement/configureWorkflowIssueActivityOpen.e2e-spec.js',
      // 'ConvertedJS/specs/IssuesManagement/configureWorkflowIssueActivityClosed.e2e-spec.js',
      // 'ConvertedJS/specs/IssuesManagement/configureWorkflowCategorySettings.e2e-spec.js',
      // 'ConvertedJS/specs/IssuesManagement/19681-home-list.e2e-spec.js',
      // 'ConvertedJS/specs/IssuesManagement/19680-home-navigator.e2e.spec.js',
      // 'ConvertedJS/specs/IssuesManagement/home-filter-buttons.e2e-spec.js',
      'ConvertedJS/specs/IssuesManagement/configureWorkflowWorkflowManagement.e2e-spec.js',
    ],
    workManagement: [
      // 'ConvertedJS/specs/WorkManagement/configureWorkflowCategory.e2e-spec.js',
      // 'ConvertedJS/specs/WorkManagement/configureWorkflowResolutionStatus.e2e-spec.js',
      // 'ConvertedJS/specs/WorkManagement/configureWorkflowIssueActivityOpen.e2e-spec.js',
      // 'ConvertedJS/specs/WorkManagement/configureWorkflowIssueActivityClosed.e2e-spec.js',
      // 'ConvertedJS/specs/WorkManagement/configureWorkflowCategorySettings.e2e-spec.js',
      // 'ConvertedJS/specs/WorkManagement/19704-home-list.e2e-spec.js',
      // 'ConvertedJS/specs/WorkManagement/19703-home-navigator.e2e.spec.js',
      // 'ConvertedJS/specs/WorkManagement/home-filter-buttons.e2e-spec.js',
      // 'ConvertedJS/specs/WorkManagement/configureWorkflowWorkflowManagement.e2e-spec.js',
      // 'ConvertedJS/specs/WorkManagement/workflow-email-override-Entering-Leaving.e2e-spec.js',
      // 'ConvertedJS/specs/WorkManagement/workflow-action-resolution-status-change.e2e-spec.js',
      // 'ConvertedJS/specs/WorkManagement/workflow-action-resolution-status-change-CRUD.e2e-spec.js',
      // 'ConvertedJS/specs/WorkManagement/workflow-email-tokens-30580.e2e-spec.js',
      // 'ConvertedJS/specs/WorkManagement/workflow-email-override-new-issue-save-bug-31975.e2e.spec.js',
      // 'ConvertedJS/specs/WorkManagement/workflow-email-action.e2e-spec.js',
      'ConvertedJS/specs/WorkManagement/workflow-email-attachment.e2e-spec.js',
    ],
    performanceAnalyst: [

      'ConvertedJS/specs/PerformanceAnalyst/spec01_performanceAnalyst-Home.e2e-spec.js',
      'ConvertedJS/specs/PerformanceAnalyst/spec02_performanceAnalyst-Navigator.e2e-spec.js',
      'ConvertedJS/specs/PerformanceAnalyst/spec03_performanceAnalyst-Donuts.e2e-spec.js',
      'ConvertedJS/specs/PerformanceAnalyst/spec13_performanceAnalyst-Summary-Donuts.e2e-spec.js',
      'ConvertedJS/specs/PerformanceAnalyst/spec04_performanceAnalyst-Charts.e2e-spec.js',
      'ConvertedJS/specs/PerformanceAnalyst/spec05_performanceAnalyst-Var-vs-Var-Charts.e2e-spec.js',
      'ConvertedJS/specs/PerformanceAnalyst/spec06_performanceAnalyst-Alerts-Chart.e2e-spec.js',
      'ConvertedJS/specs/PerformanceAnalyst/spec10_performanceAnalyst-Availability.e2e-spec.js',
      'ConvertedJS/specs/PerformanceAnalyst/spec07_performanceAnalyst-Issues.e2e-spec.js',
      'ConvertedJS/specs/PerformanceAnalyst/spec08_performanceAnalyst-Water.e2e-spec.js',
      'ConvertedJS/specs/PerformanceAnalyst/spec11_performanceAnalyst-Report.e2e-spec.js',
      'ConvertedJS/specs/PerformanceAnalyst/spec09_performanceAnalyst-Forecast-Charts.e2e-spec.js',
      'ConvertedJS/specs/PerformanceAnalyst/spec12_performanceAnalyst-Dispatch-Scenarios-Reports.e2e-spec.js',
      'ConvertedJS/specs/PerformanceAnalyst/spec23_performanceAnalyst-Summary-Report.e2e-spec.js',
      'ConvertedJS/specs/PerformanceAnalyst/spec28_performanceAnalyst-Map.e2e-spec.js',
      'ConvertedJS/specs/PerformanceAnalyst/spec29_performanceAnalyst-BUG-33832.e2e-spec.js',

      'ConvertedJS/specs/PerformanceAnalyst/spec14_dataExplorer-Home.e2e-spec.js',
      'ConvertedJS/specs/PerformanceAnalyst/spec15_dataExplorer-Navigator-Tag-List.e2e-spec.js',
      'ConvertedJS/specs/PerformanceAnalyst/spec16_dataExplorer-Drop-Down-Menu.e2e-spec.js',
      'ConvertedJS/specs/PerformanceAnalyst/spec17_dataExplorer-Header-Buttons.e2e-spec.js',
      'ConvertedJS/specs/PerformanceAnalyst/spec18_dataExplorer-Chart-Settings.e2e-spec.js',
      'ConvertedJS/specs/PerformanceAnalyst/spec19_dataExplorer-Stats Pane.e2e-spec.js',
      'ConvertedJS/specs/PerformanceAnalyst/spec20_dataExplorer-Hamburger (Chart Context) menu.e2e-spec.js',
      'ConvertedJS/specs/PerformanceAnalyst/spec21_dataExplorer-BUG-25218.e2e-spec.js',
      'ConvertedJS/specs/PerformanceAnalyst/spec22_dataExplorer-BUG-15359.e2e-spec.js',
      'ConvertedJS/specs/PerformanceAnalyst/spec24_dataExplorer-Legend.e2e-spec.js',
      'ConvertedJS/specs/PerformanceAnalyst/spec25_dataExplorer-Relative Pinning.e2e-spec.js',
      'ConvertedJS/specs/PerformanceAnalyst/spec26_dataExplorer-Time slider-Selection.e2e-spec.js',
      'ConvertedJS/specs/PerformanceAnalyst/spec27_dataExplorer-Advanced Chart.e2e-spec.js',

      // 'ConvertedJS/specs/PerformanceAnalyst/Custom Model Import Upload XLS or XLSM files.js',


    ],

    Alert: [
      // 'ConvertedJS/specs/Alerts/spec01_Creating_APR_Model.js',
      // 'ConvertedJS/specs/Alerts/spec02_Creating_Rolling_Average_Model.js',
      // 'ConvertedJS/specs/Alerts/spec03_Creating_Fixed_Limit_Model.js',
      // 'ConvertedJS/specs/Alerts/spec04_Creating_Frozen_Data_Model.js',
      // 'ConvertedJS/specs/Alerts/spec05_Model_Config_Add Alerts_Constraints.js',
      // 'ConvertedJS/specs/Alerts/spec07_Right_click_on_model_perform_all_actions.js',
      'ConvertedJS/specs/Alerts/spec06_Quick_Deploy.js',
    ],
    programNavigator: [
      'ConvertedJS/specs/Sekoia/spec06_PNtrends.js',
    ],
    listviewPN: [
      // 'ConvertedJS/specs/ListView/program-navigator-LV-CRUD.e2e-spec.js',
      // 'ConvertedJS/specs/ListView/program-navigator-LV-Unsaved-Popup.e2e-spec.js',
      // 'ConvertedJS/specs/ListView/program-navigator-LV-NonScheduled-column-options.e2e-spec.js',
      // 'ConvertedJS/specs/ListView/program-navigator-LV-NonScheduled-column-filter.e2e-spec.js',
      'ConvertedJS/specs/ListView/program-navigator-LV-NonScheduled-inline-edit.e2e-spec.js',
      // 'ConvertedJS/specs/ListView/program-navigator-LV-NonScheduled-batch-edit.e2e-spec.js',
      // 'ConvertedJS/specs/ListView/program-navigator-LV-Scheduled-CRUD.e2e-spec.js',
      // 'ConvertedJS/specs/ListView/program-navigator-LV-Scheduled-column-options.e2e-spec.js',
      // 'ConvertedJS/specs/ListView/program-navigator-LV-Scheduled-column-filter.e2e-spec.js',
      // 'ConvertedJS/specs/ListView/program-navigator-LV-Scheduled-inline-edit.e2e-spec.js',
      // 'ConvertedJS/specs/ListView/program-navigator-LV-Scheduled-batch-edit.e2e-spec.js',
      // 'ConvertedJS/specs/ListView/program-navigator-LV-BatchEdit-schedule-nonschedule.e2e-spec.js',
    ],
    listviewRA: [
      // 'ConvertedJS/specs/ListView/RA-LV-CRUD.e2e-spec.js',
      'ConvertedJS/specs/ListView/RA-LV-events.e2e-spec.js',
    ],
    maps: [
      // 'ConvertedJS/specs/Maps/program-navigator-maps.e2e-spec.js',
      'ConvertedJS/specs/Maps/program-navigator-maps-info-tray.e2e-spec.js',
      'ConvertedJS/specs/Maps/program-navigator-maps-Info-tray-change-live-status.e2e-spec.js',
      'ConvertedJS/specs/Maps/program-navigator-maps-Info-tray-change-status-plan.e2e-spec.js',
    ],
    assetExplorer: [
      // 'ConvertedJS/specs/AssetExplorer/asset-explorer-physical-tree-permission.e2e-spec.js',
      // 'ConvertedJS/specs/AssetExplorer/asset-explorer-attribute-CRUD.e2e-spec.js'
      // 'ConvertedJS/specs/AssetExplorer/asset-explorer-add-new-entry-blog.e2e-spec.js'
      // 'ConvertedJS/specs/AssetExplorer/asset-explorer-attachments.e2e-spec.js'
      // 'ConvertedJS/specs/AssetExplorer/asset-explorer-info.e2e-spec.js'
      'ConvertedJS/specs/AssetExplorer/asset-explorer-save-asset-save-all-assets.e2e-spec.js'
    ]

  },

  //directConnect: true,
  // directConnect: true,
  baseUrl: 'https://siitest.asset360.com/WorkflowEditor',
  framework: 'jasmine2',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 150000,
    DEFAULT_TIMEOUT_INTERVAL: 150000,
    // print: function () { }
  },
	/* 	onPrepare() {
			require('ts-node').register({
				project: require('path').join(__dirname, './tsconfig.e2e.json')
			});
			jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
		}
	 */
  onPrepare: function () {
    var jasmineReporters = require('jasmine-reporters');
    var trx = require('jasmine-trx-reporter');
    // Add a screenshot reporter and store screenshots to `/tmp/screenshots`:
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.e2e.json')
    });
    let globals = require('protractor');
    let browser = globals.browser;

    browser.manage().window().maximize();
    browser.manage().timeouts().implicitlyWait(5000);
    browser.manage().timeouts().setScriptTimeout(30000);

    jasmine.getEnv().addReporter(new HtmlReporter({
      baseDirectory: './Reports/html/', docName: 'htmlReport.html'
    }).getJasmine2Reporter());

    jasmine.getEnv().addReporter(new SpecReporter({
      spec: {
        displayStackTrace: true,
      },
    }))

    jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
      consolidateAll: false,
      savePath: 'testresults',
      filePrefix: 'reportXMLoutput.',
    }));
    jasmine.getEnv().addReporter(new trx({
      reportName: 'Protractor Test Results',
      folder: 'testresultTrx',
      outputFile: '',
      // browser: browserName,
      groupSuitesIntoSingleFile: false,
      // takeScreenshots: true,
      // takeScreenshotsOnlyOnFailures: true,
      // outputScreenshotsFolder: 'testresultTrx'
    }));
  }
}