class Asset {
    constructor(data){
        this.ID = data.ID
        this.Name = data.Name
        this.GroupID = data.GroupID
        this.Type = data.Type
        this.X = data.X
        this.Y = data.Y
        this.Rule = data.Rule
    }
}

class AssetGroup {
    constructor(data){
        this.ID = data.ID
        this.GroupName = data.GroupName
        this.InitialX = data.InitialX
        this.InitialY = data.InitialY
        this.UnitsX = data.UnitsX
        this.UnitsY = data.UnitsY
        this.UnitsType = data.UnitsType
    }
}

class Rule {
    constructor(data) {
        this.ID = data.ID
        this.AssetId = data.AssetId
        this.Active = data.Active
        this.Rule = data.Rule
    }

    set Status(status){
        this.Status = status
    }
    get Status(){
        return this.Status
    }


}

exports.Rule = Rule
exports.Asset = Asset
exports.AssetGroup = AssetGroup