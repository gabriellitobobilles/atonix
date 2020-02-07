/*ANGULAR*/
import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
/*SERVICE*/
import { WorkflowService } from './workflow.service';
describe('Service: WorkflowService', function () {
    beforeEach(function () {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [WorkflowService]
        }).compileComponents();
    });
    var asset = {
        AssetID: 274014,
        ParentAssetID: 2325,
        AssetAbbrev: 'Adani Power',
        AssetDesc: 'Adani Power',
        AssetClassTypeID: 2000,
        AssetTreeNodeChildConfigurationTypeID: null,
        DisplayOrder: 0,
        CreatedBy: 'hellerpr@atonix.com',
        ChangedBy: 'BardeM@atonix.com',
        CreateDate: '2017-07-31T12:27:51.417-05:00',
        ChangeDate: '2018-04-30T09:48:45.637',
        GlobalId: '26173682-d847-4b45-9305-fd3e390e0685',
        IsHidden: false,
        Track: true,
        AssetClassType: {
            AssetClassTypeID: 2000,
            AssetTypeID: 2,
            AssetClassTypeKey: 'GenericStationGroup',
            AssetClassTypeAbbrev: 'GenericStationGroup',
            AssetClassTypeDesc: 'Generic Station Group',
            DisplayOrder: 0
        },
        AssetType: {
            AssetTypeID: 2,
            AssetTypeEnum: 2,
            AssetTypeAbbrev: 'SG',
            AssetTypeDesc: 'StationGroup'
        },
        NumChildren: 1,
        Keywords: [],
        IsTheOwner: false,
        AttributeCategories: [],
        AttachmentCategories: []
    };
    it('should return asset Tree', inject([WorkflowService, HttpTestingController], function (workflowService, httpTest) {
        var result;
        workflowService.populateAssetTree().subscribe(function (data) {
            result = data;
        });
        httpTest.expectOne({ url: '/Services/api/Assets/PopulateAssetTree?appContext=40&stopLevel=9' }).flush(asset);
        httpTest.verify();
        expect(result).toEqual(asset);
    }));
});
//# sourceMappingURL=workflow.service.spec.js.map