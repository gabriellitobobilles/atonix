var Asset = /** @class */ (function () {
    function Asset(myAsset) {
        if (myAsset) {
            this.AssetID = myAsset.AssetID;
            this.ParentAssetID = myAsset.ParentAssetID;
            this.AssetAbbrev = myAsset.AssetAbbrev;
            this.AssetDesc = myAsset.AssetDesc;
            this.AssetClassTypeID = myAsset.AssetClassTypeID;
            this.AssetTreeNodeChildConfigurationTypeID = myAsset.AssetTreeNodeChildConfigurationTypeID;
            this.DisplayOrder = myAsset.DisplayOrder;
            this.CreatedBy = myAsset.CreatedBy;
            this.ChangedBy = myAsset.ChangedBy;
            this.CreateDate = myAsset.CreateDate;
            this.ChangeDate = myAsset.ChangeDate;
            this.GlobalId = myAsset.GlobalId;
            this.IsHidden = myAsset.IsHidden;
            this.Track = myAsset.Track;
            this.AssetClassType = myAsset.AssetClassType;
            this.AssetType = myAsset.AssetType;
            this.NumChildren = myAsset.NumChildren;
            this.Keywords = myAsset.Keywords;
            this.IsTheOwner = myAsset.IsTheOwner;
            this.AttributeCategories = myAsset.AttachmentCategories;
            this.AttachmentCategories = myAsset.AttachmentCategories;
            this.Location = myAsset.Location;
            this.power = myAsset.power;
            this.openIssues = myAsset.openIssues;
            this.Loaded = myAsset.Loaded;
        }
    }
    return Asset;
}());
export { Asset };
//# sourceMappingURL=asset.js.map