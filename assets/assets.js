// import { Engine } from 'json-rules-engine'
// import { Asset, AssetGroup } from '../assets'
let { Engine } = require('json-rules-engine')
let models = require('../models/models.js')

let engine = new Engine()

let printerData = {
    ID: 1001,
    Name: "Printer1",
    GroupName: "Floor-One",
    Type: "Production-Item",
    X: 30,
    Y: 50,
    Rule: {
        conditions: {
            any: [
                {
                    all: [
                        {
                            fact: "distance",
                            operator: "lessThanInclusive",
                            value: 22,
                        },
                        {
                            fact: "assetType",
                            operator: "equal",
                            value: "Support-Item"
                        },
                    ],
                },
            ],
        },
        event: {  
            type: 'Passed',
            params: {
                passed: true,
                assetType: "Support-Item",
            }
        }
    },
}
let printer1 = new models.Asset(printerData)
printer1.Rule.event.params.assetID = printer1.ID
printer1.Rule.event.params.assetName = printer1.Name

let printerSupplyData = {
    ID: 1002,
    Name: "PrinterSupply1",
    GroupName: "Floor-One",
    Type: "Support-Item",
    X: 10,
    Y: 50,
}
let printerSupply1 = new models.Asset(printerSupplyData)

let workStationData = {
    ID: 1003,
    Name: "WorkStation1",
    GroupName: "Floor-One",
    Type: "WorkStation",
    X: 70,
    Y: 20,
    Rule: {
        conditions: {
            any: [
                {
                    all: [
                        {
                            fact: "distance",
                            operator: "lessThanInclusive",
                            value: 48,
                        },
                        {
                            fact: "assetType",
                            operator: "equal",
                            value: "Production-Item"
                        },
                    ],
                },
            ],
        },
        event: { 
            type: 'Passed',
            params: {
                passed: true,
                assetType: "Production-Item",
            }
        }
    },
}
let workStation1 = new models.Asset(workStationData)
workStation1.Rule.event.params.assetID = workStation1.ID
workStation1.Rule.event.params.assetName = workStation1.Name

let assets = [printer1, workStation1, printerSupply1]


function runRules(){
    for(let j = 0; j < assets.length; j++){
        a = assets[j]
        console.log(a)

        if (a.Rule == undefined) {
            continue
        }
        engine.addRule(a.Rule)

        assetCords = {
            X: a.X,
            Y: a.Y,
        }

        for (let i = 0; i < assets.length; i++){
            if (a.ID == assets[i].ID){
                continue
            } 
            console.log(assets[i].Name)
            compareCords = {
                X: assets[i].X,
                Y: assets[i].Y,
            }
            
            d = getDistance(assetCords, compareCords)

            let facts = {
                distance: d,
                assetType: assets[i].Type,
            }
           
            console.log(`distance: ${facts.distance}`)
            engine.run(facts).then(result => {
                result.events.forEach(evt => {
                    if (evt.params.passed) {
                        console.log(`\nparams: `, evt.params)
                        console.log(`asset ${assets[i].ID}-${assets[i].Name} fulfills asset ${assets[j].Name}'s requirements of proximity. Distance = ${facts.distance}. for ${evt.params.assetType}`)
                    }
                })
            })
        }
        
        console.log(`pass: ${j+1}\n\n`)
    }

}



module.exports = runRules


function getDistance(cordsA, cordsB) {
    input = Math.pow((cordsA.X - cordsB.X), 2) + Math.pow((cordsA.Y - cordsB.Y), 2)
    d = Math.sqrt(input)
    
    return d
}

runRules()