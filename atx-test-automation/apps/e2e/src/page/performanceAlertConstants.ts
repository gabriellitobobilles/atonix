// tslint:disable-next-line:file-name-casing

enum AppName {

  performanceAnalyst = 'Performance Analyst',
  assetExplorer = 'Asset Explorer',
  dataExplorer = 'Data Explorer',
  Alert = 'Alerts'

}

enum customModelErrorMessage {

  InvalidfileSize = 'Invalid file size. Valid file size is 1 KB < x < 100MB',
  InvalidfileExtension = 'Invalid file extension. Valid file extensions are .xls, .xlsx or .xlsm.',


}

enum PerformanceTabName {

  summary = 'Summary',
  alert = 'Alerts',
  financial = 'Financial',
  issues = 'Issues',
  OM = 'OM',
  map = 'Map',
  userChart = 'User Charts',
  forecast = 'Forecast',
  availability = 'Availability',
  report = 'Report',
  dispatch = 'Dispatch',

}

enum alertTimelineVMtempfilter {

  // tslint:disable-next-line:max-line-length
  alertTimelineVMtempfilter = 'History:\'Diagnose Set(0), Diagnose Cleared(0), Model Maintenance Set(0), Model Maintenance Cleared(0), Note Added(0)\''
}
// tslint:disable-next-line:prefer-const
// let displayAs = ['Trend', 'Table', 'Radar'];

const chartSetting = {
  GroupSeriesChart: {
    displayAs: ['Trend', 'Table', 'Radar'],
    chartType: ['Line', 'Symbol', 'Column', 'Area', 'Box and Whiskers'],
  },
  SingleSeriesChart: {
    displayAs: ['Trend', 'Table', 'Radar'],
    chartType: ['Line', 'Symbol', 'Column', 'Area', 'Box and Whiskers'],
  }
};

const priorityOption = {
  priorityOptions: ['-None-', 'High', 'Medium', 'Low']

};

const issueClass = {
  issueClasses: ['Arc Flash', 'Asset Health', 'Compliance', 'Fuels', 'M&D', 'Membrane Cleaning', 'O&M',
    'Pole Attachment Program', 'Project Management']

};


const alertConstraintsTimeDuration = {
  timeDuration: ['Seconds', 'Minutes', 'Hours'],
  FrozenDataDurationtimeDuration: ['', 'Seconds', 'Minutes', 'Hours'],
};

const alertDataDuration = {
  dataDuration: ['21600.9', '360.9', '6.9'],

};

const alertScreeningViewTestData = {
  siitest: `AIR HEATER A ACTUAL GAS SIDE DP`,
  siistage: `MILL 1D PA FLOW (1PU2DP01.PV)`

};

const alertSingleViewTestData = {
  siitest: `ID Fan 1 Motor Winding Temp`,
  siistage: `ID Fan 1 Motor Winding Temp`

};

const mapDropDown = {
  SEKOIADemoClients_UGMHistoricalReliabilityPlan: ['Project Status', 'Program Status', 'SAIDI', 'SAIFI', 'CEMI', 'Voltage Violations',
    'Outage Events', 'Field Area Network'],

  DemoClients_EasternPC1: ['Boiler Air & Gas', 'Turbine Cycle', 'GeoVis Map']
};

const basemapWrap = ['satellite', 'dark-gray', 'gray', 'hybrid', 'national-geographic', 'oceans',
  'osm', 'streets', 'terrain', 'topo'];

const AlertDefaultFilter = ['WATCH:\'FALSE\'', 'ALERT:\'TRUE\'', 'IGNORE:\'FALSE\'', ''];

// tslint:disable-next-line:prefer-const
let getAppList = ['Performance Analyst', 'Investment Accelerator', 'Alerts', 'Issues Management',
  'Asset 360', 'Microgrid', 'Old Water Meter', 'Work Management',
  'Asset Explorer', 'Program Navigator', 'Risk Matrix', 'Risk Assessment'];

const getTagList = ['AMBIENT AIR TEMPERATURE (GPA tag replaced with measured FD Fan Inlet Temp tag) (MEAS:1GPATMBNT)',
  'RELATIVE HUMIDITY (AMBIENT_AIR:HUMIDITY)'];

const pinsType = ['Fixed (date/time entry)', 'Last 30 Minutes (Now)', 'Last 30 Minutes (Selected)',
  'Current Month (Now)', 'Current Month (Selected)', 'Previous Month (Now)',
  'Previous Month (Selected)', 'Yesterday (Now)', 'Yesterday (Selected)'];

const dataRetrieval = ['Use Default', 'Archive Selection', 'Minimum Data Interval'];

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export {

  AppName,
  customModelErrorMessage,
  alertTimelineVMtempfilter,
  PerformanceTabName,
  chartSetting,
  priorityOption,
  issueClass,
  alertConstraintsTimeDuration,
  alertDataDuration,
  alertScreeningViewTestData,
  alertSingleViewTestData,
  mapDropDown,
  basemapWrap,
  AlertDefaultFilter,
  getAppList,
  getTagList,
  pinsType,
  dataRetrieval,
  months,
  days,

};
