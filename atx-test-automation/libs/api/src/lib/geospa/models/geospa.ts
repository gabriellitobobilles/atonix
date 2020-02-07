import { ICategory } from '../../assets/category';

export interface IGeoSpaMapConfig {
  displayLegend: boolean;
  allowSplitMaps: boolean;
  displayTrend: boolean;
}

export interface IGeoSpa {
  GeoSpaID: number;
  Title: string;
  GeoSpaDesc: string;
  MapTypeID: number;
  BaseMapID: number;
  IsPublic: boolean;
  DisplayOrder: number;
  GeoSpaKey: string;
  InitialExtent: string;
  CreatedBy: string;
  ChangedBy: string;
  CreateDate: Date;
  ChangeDate: Date;
  ParentGeoSpaID: number;
  MapConfig: string;
  mapConfig?: IGeoSpaMapConfig;

  OwningAssetID: number;
  GlobalID: string;
  TimeBaseID?: number;
  AggregationTypeID?: number;
  Decimate: boolean;
  Categories: ICategory[];
  GeoSpaLayers: IGeoSpaLayer[];
  GeoSpaAncillaryLayers: IGeoSpaAncillaryLayer[];

  StaticRasterLayer: IStaticRasterLayer;

  HasDescendants: boolean;
  HasSpatialData: boolean;
  ProcessDataNeedsMet: boolean;
  Mappable: boolean;

  gspaLayerDict: { [id: number]: IGeoSpaSekoiaLayer };
  valueTypes: string[];
  assetClassTypeIDs: number[];
  pdAssetClassTypeIDs: number[];

  loaded: boolean;
}

export interface IGeoSpaSekoiaLayer {
  GeoSpaLayerID: number;
  MapLayerID: string;
  gspaAssetGroups: { [id: number]: IGeoSpaAssetGroup };
  AvailableInMap: boolean;
  DecimationLayer: boolean;
}

export interface IGeoSpaLayer {
  GeoSpaLayerID: number;
  GeoSpaID: number;
  Title: string;
  GeoSpaLayerDesc: string;
  IsPublic: boolean;
  DisplayOrder: number;
  DisplayScaleMin: string;
  DisplayScaleMax: string;
  CreatedByUserID: number;
  ChangedByUserID: number;
  CreateDate: Date;
  ChangeDate: Date;

  GeoSpaAssetGroups: IGeoSpaAssetGroup[];

  MapLayerID: string;
}

export interface IGeoSpaAssetGroup {
  GeoSpaAssetGroupID: number;
  AssetClassTypeID: number;
  GeometryTypeID: number;
  DisplayOrder: number;
  GeoSpaSourceID: number;
  Icon: string;
  SelectedIcon: string;
  SymbologyProperties: string;
  AttributeSourceID: number;

  GeoSpaSource: IGeoSpaSource;
  AttributeSource: IAttributeSource;

  AssetClassTypeAbbrev: string;

  AssetGlobalIDs: string[];
  Symbology?: IGeoSpaSymbology;

  Legend?: ILegend;

  HasDescendants: boolean;

  GeoJsonContent: IGeoJsonContent;
  Empty: boolean;
  ChildrenCount: number;
}

export interface ITileLevelExtentRequest {
  TileLevel: number;
  RequestedExtent: ITileExtent;
}

export interface IGeoSpaContentRequest {
  AstGroups: IGeoSpaAssetGroup[];
  OwningAssetID?: string | number;
  NodeID?: string;
  FilterGuids: string[];
  Decimate: boolean;
  RequestedExtents?: { [id: number]: ITileLevelExtentRequest };
}

export interface IGeoSpaContentResponse {
  Payload: { [id: number]: IGeoJsonContent };
  ErrorMessage?: string;
}

export interface IGeoJsonContent {
  type: string;
  features: IGeoJsonFeature[];
  Decimations: { [id: number]: IDecimationCellBase[] };
}

export enum GeoSpaSourceType {
  GeoJson = 1,
  Sql = 2,
  Rest = 3
}

export interface IGeoSpaSource {
  GeoSpaSourceID: number;
  GeoSpaSourceType: GeoSpaSourceType;
  GeoSpaSourceGUID: string;

  GeoJsonSource: IGeoSpaJson;
  GeoSqlSource: IGeoSpaSql;
  GeoRestSource: IGeoSpaRest;
}

export interface IGeoSpaJson {
  JsonID: number;
  ContentID: string;
}
export interface IGeoSpaSql {
  GeoSpaSqlID: number;
  ContentID: string;
  TableName: string;
  GeoSpaFK: string;
  TablePK: string;
  IncludeFields: string;
  ExcludeFields: string;
}
export interface IGeoSpaRest {
  GeoSpaRestID: number;
  ContentID: string;
  RestUrl: string;
  GeoSpaRestLayerTypeID: number;
  Credentials: string;
}

export enum AttributeSourceType {
  Sql = 1,
  GeoSpa = 2
}

export interface IAttributeSource {
  AttributeSourceID: number;
  AttributeSourceType: AttributeSourceType;
  AttributeSourceGUID: string;
  AttributesSqlSource: IAttributesSql;
}

export interface IAttributesSql {
  AttributesSqlID: number;
  ContentID: string;
  TableName: string;
  GeoSpaFK: string;
  TablePK: string;
  IncludeFields: string;
  ExcludeFields: string;
}

export interface IGeoSpaAncillaryLayer {
  GeoSpaAncillaryLayerID: number;
  GeoSpaID: number;
  LayerIDExtension: string;
  Title: string;
  AncillaryDescription: string;
  IsPublic: boolean;
  DisplayOrder: number;
  DisplayScaleMin: string;
  DisplayScaleMax: string;
  CreatedByUserID: number;
  ChangedByUserID: number;
  CreateDate: Date;
  ChangeDate: Date;
  AncillaryLayerSourceMaps: IAncillaryLayerSourceMap[];
  visible?: boolean;
}

export interface IAncillaryLayerSourceMap {
  AncillaryLayerSourceMapID: number;
  GeoSpaAncillaryLayerID: number;
  GeoSpaSourceID: number;
  AttributeSourceID: number;
  GeoSpaSource: IGeoSpaSource;
  AttributeSource: IAttributeSource;
}

export interface IStaticRasterLayer {
  StaticRasterLayerID: number;
  GeoSpaID: number;
  RasterContentID: string;

  StaticRasterGroups: IStaticRasterGroup[];
}

export interface IStaticRasterGroup {
  StaticRasterGroupID: number;
  StaticRasterLayerID: number;
  DisplayOrder: number;

  StaticRasterWidgets: IStaticRasterWidget[];
}

export interface IStaticRasterWidget {
  StaticRasterWidgetID: number;
  StaticRasterGroupID: number;
  WidgetTypeID: number;
  RelativeXPosition: number;
  RelativeYPosition: number;
  AssetID?: number;
  AssetVariableTypeTagMapID?: number;

  WidgetType: IWidgetType;
}

export interface IWidgetType {
  WidgetTypeID: number;
  WidgetAbbrev: string;
  WidgetDesc: string;
  WidgetBehavior: string;
}

export interface IGeoSpaItem {
  AssetGlobalId: string;
  AssetId: number;
  AssetClassTypeId: number;
  AssetDesc: string;
  CostsTotal: number;
  RevenueTotal: number;
  NetTotal: number;
  ProjectImage: string;
  StartDate: Date;
  ProjectStartOrder: number;
  Type: string;
  ProcessData: IProjectCashFlowItem[];
  GeoSpaLayerID?: string;
  GeoSpaAssetGroupID?: string;
  AssetMin?: number;
}

export interface IGeoJsonFeature {
  type: string;
  geometry: IGeoJsonGeometry;
  properties: IGeoJsonProperties;

  GeoSpaAssetGroupID: number;
  GeoSpaAssetGroup: IGeoSpaAssetGroup;
}

export interface IGeoJsonGeometry {
  type: string;
  coordinates: number[];
  lineString: string;
  polygonString: string;
}

export interface IGeoJsonProperties {
  GlobalID: string;
  AssetID: number;
  AssetAbbrev: string;
  AssetDesc: string;
}

export interface IGeoSpaFeatureAttributes extends IGeoJsonProperties {
  CostsTotal: number;
  RevenueTotal: number;
  NetTotal: number;
  ProjectImage: string;
  StartDate: Date;
  ProcessData: IProjectCashFlowItem[];
  GeoSpaLayerID: string;
  GeoSpaAssetGroupID: number;
  GeoSpaAssetGroup: IGeoSpaAssetGroup;
}

export interface IDecimationCellBase extends IGeoJsonFeature {
  TileX: number;
  TileY: number;
  TileLevel: number;
  SkinnyNorthNeighbor: ISkinnyDecimationCell;
  SkinnyEastNeighbor: ISkinnyDecimationCell;
  SkinnySouthNeighbor: ISkinnyDecimationCell;
  SkinnyWestNeighbor: ISkinnyDecimationCell;
  SkinnyNorthwestNeighbor: ISkinnyDecimationCell;
  SkinnyNortheastNeighbor: ISkinnyDecimationCell;
  SkinnySoutheastNeighbor: ISkinnyDecimationCell;
  SkinnySouthwestNeighbor: ISkinnyDecimationCell;
  AssetGuids: string[];
  CenterGeoJsonFeature: IGeoJsonFeature;
  DecimatedCashFlow: IProjectCashFlowItem;
}

export interface ISkinnyDecimationCell {
  TileX: number;
  TileY: number;
  TileLevel: number;
}

export interface ITileExtent {
  MinCol: number;
  MaxCol: number;
  MinRow: number;
  MaxRow: number;
}

export interface IGeoExtent {
  WGS84LatMin: number;
  WGS84LatMax: number;
  WGS84LonMin: number;
  WGS84LonMax: number;
  WGS84CenterLat: number;
  WGS84CenterLon: number;
  WMASXMin: number;
  WMASXMax: number;
  WMASYMin: number;
  WMASYMax: number;
  WMASCenterX: number;
  WMASCenterY: number;
  GoogleWorldXMin: number;
  GoogleWorldXMax: number;
  GoogleWorldYMin: number;
  GoogleWorldYMax: number;
  GoogleWorldCenterX: number;
  GoogleWorldCenterY: number;
  PixelXMin: number;
  PixelXMax: number;
  PixelYMin: number;
  PixelYMax: number;
  PixelCenterX: number;
  PixelCenterY: number;
  TileX: number;
  TileY: number;
  TileLevel: number;
}

export interface IBVESRILODDictionary {
  [id: number]: IBVESRILOD;
}

export interface IBVESRILOD {
  level: number;
  levelValue: string;
  resolution: number;
  scale: number;
  Decimations: IGeoJsonFeature[];
  DecimationGraphics: { [id: string]: any }; // any will be casted into ESRI.Graphic
}

export interface IGeoSpaSymbology {
  driver: IDriver;
  symbologyScheme: ISymbologyScheme;
  heatmaps?: any;
  driverValues?: IDriverValues[];
}

export interface IDriver {
  driverType: string;
  scheme: string;
  driverKey: string;
  driverValue?: string;
  driverValues?: IDriverValues[];
  jsType: string;
}

export interface IDriverValues {
  driverValue: string;
}

export interface ISymbologyScheme {
  gsVisible?: boolean;
  base: ISymbology;
  selection: ISymbology;
  palettes?: IPalette[];
}

export interface IFill {
  fillStyle: string;
  driverKeyIndex?: number;
  palette?: IPalette;
}

export interface ISymbology {
  graphicType: string;
  marker?: ISymbol;
  border?: ISymbol;
  palette?: IPalette;
  palettes?: IPalette[];
  icon?: string;
  fill: IFill;
  driverKeyIndex?: number;
  lineWidth?: number;
  lineStyle?: string;
  noData?: ISymbology;
}

export interface ISymbol {
  graphicType: string;
  driverKeyIndex?: number;
  size?: number;
  rotation?: number;
  xoffset?: number;
  yoffset?: number;
  lineStyle?: string;
  lineWidth?: number;
  palette?: IPalette;
  svgPath?: string;
}

export interface IPalette {
  shared?: boolean;
  sharedIndex?: number;
  paletteType?: string;
  colorType?: string;
  specifics?: IPaletteSpecificItem[];
  ranges?: IPaletteRangeItem[];
  rgb?: IRGB;
  hexValue?: string;
  icon?: string;
  transparency?: number;
}

export interface IPaletteSpecificItem {
  specificValue: number;
  label: string;
  colorType: string;
  rgb?: IRGB;
  hexValue?: string;
  icon?: string;
  transparency?: number;
}

export interface IPaletteRangeItem {
  rangeMin?: number;
  rangeMax?: number;
  label: string;
  colorType: string;
  hexValue?: string;
  transparency?: number;
  rgb?: IRGB;
}

export interface IRGB {
  r: IRGBItem;
  g: IRGBItem;
  b: IRGBItem;
  a?: IRGBItem;
}

export interface IRGBItem {
  rType?: string;
  rValue?: number;
  gType?: string;
  gValue?: number;
  bType?: string;
  bValue?: number;
  aType?: string;
  aValue?: number;
}

export interface ILegend {
  symbolType: string;
  paletteType: string;
  symbols: ILegendSymbol[];
}

export interface ILegendSymbol {
  myFill?: string;
  myLabel?: string;
  myIcon?: string;
  symbolSVGPath?: string;
  specific?: IPaletteSpecificItem;
  range?: IPaletteRangeItem;
}

export interface IColorDictionary {
  [key: number]: IColorDictionaryItem;
}

export interface IColorDictionaryItem {
  label: string;
  r?: number;
  g?: number;
  b?: number;
  hex?: string;
}

export interface IPieSlice {
  y: number;
  name: string;
  color: string;
}

interface IOldGeoSpaLayers {
  ApplyVisibilities: boolean;
  GeoSpaAncillaryLayersDict: { [id: string]: IGeoSpaAncillaryLayer };
  GeoSpaAncillaryLayers: IGeoSpaAncillaryLayer[];
  GeoSpaLayers: IGeoSpaLayer[];
}

interface IBaseMapOption {
  BaseMapID: number;
  name: string;
  clearHeatmap: boolean;
  selected: boolean;
  hoverText: string;
}

export interface IStatus {
  colorType: string;
  hexValue: string;
  label: string;
  specificValue: number;
}

export interface ICollatedProcessDataStatuses {
  processDataStatuses: IProcessDataStatus[];
  collatedStatusName: string;
  collatedStatus: { key: number; label: string };
  collatedExpectedStatus: { key: number; label: string };
  assetDescsString: string;
  othersCount: number;
}

export interface IProcessDataStatus {
  assetClassTypeID: number;
  assetClassTypeAbbrev: string;
  statusOptions: Array<{ key: number; label: string }>;
  status: { key: number; label: string };
  expectedStatus: { key: number; label: string; targetDate: Date };
  statusName: string;
  nowStatus: { key: number; label: string; targetDate: Date };
  nowStatusName: string;
  assetGuids: string[];
  assetDescs: string[];
  assetDescsString: string;
  saving?: boolean;
  setResult?: number;
  savedStatus?: string;
}

export interface IGeoSpaDropdownItem {
  Title: string;
  MapType: number;
  Id: number;
}

export interface IGeoSpaAssets {
  config: string;
  geoSpaAssets: { [id: string]: IGeoSpaItem };
  Decimations?: { [id: number]: ICapPriorDecimationCell[] };
}

export interface ICapPriorDecimationCell {
  TileLevel: number;
  TileX: number;
  TileY: number;
  AssetGuids: string[];
  DecimatedCashFlow: IProjectCashFlowItem;
}

export interface ISearchableMap {
  GeoSpaId: number;
  Name: string;
  AvailableStatuses: ISearchableMapStatus[];
  StatusCodeMap: IGeoSpaStatusCodeAndDescription[]; // IGeoSpaLayerStatuses are not ideal for status value/text map for status change search
  SearchAttributeName: string; // may not be the same as the Name; comes from LayerStatus AttributeName instead of GeoSpa Title
}

export interface ISearchableMapStatus {
  Label: string;
  Selected: boolean;
  GeoSpaLayerStatuses: IGeoSpaLayerStatus[];
}

export interface ICodeMapForGeoSpa {
  GeoSpaId: number;
  StatusCodeMap: IGeoSpaStatusCodeAndDescription[];
}

export interface ISearchableMapsAndCodeMaps {
  SearchableMaps: ISearchableMap[];
  CodeMaps: ICodeMapForGeoSpa[];
}

export interface IGeoSpaStatusCodeAndDescription {
  StatusCode: number;
  StatusDescription: string;
}

export interface IGeoSpaLayerStatus {
  Label: string;
  GeoSpaId: number;
  GeoSpaLayerId: number;
  AttributeName: string;
  AttributeValue: number;
  FieldNameContainingValue: string;
}

export interface IGeoSpaCashflowSearchCriteria {
  GeoSpaId: number;
  GeoSpaLayerStatuses: IGeoSpaLayerStatus[];
  AsOf: Date;
  SearchMode: string;
  From: Date;
  To: Date;
  // these two properties critical for status change search when there are no LayerStatuses
  // moved this from IGeoSpaLayerStatus so every layer status doesn't have the repeated code/value mapping
  StatusCodesAndDescription: IGeoSpaStatusCodeAndDescription[];
  AttributeName: string; // same as LayerStatus.AttributeName above
}

export interface IProjectCashFlowItem {
  ProjectCashFlowID: number;
  IsCost: boolean;
  IsRevenue: boolean;
  UnitOfMeasure: string;
  AssetID: number;
  AssetGlobalID: string;
  Timestamp: Date;
  Type: string;
  Status: number;
  Value: number;
  ProjectName: string;
  ProjectTypeID: number;
  PortfolioID: number;
  ScenarioID: number;
  PortfolioDesc: string;
  ScenarioDesc: string;
}
