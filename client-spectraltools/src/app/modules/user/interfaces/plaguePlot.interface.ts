export interface IPlaguePlot {
    id:                number;
    plagueLocation:    IPlagueLocation;
    sampleDate:        Date;
    phenologicalStage: string;
    damagePercentage:  number;
    cropMonthAge:      number;
    cropWeekAge:       number;
    plagueSign:        null;
    phenologicalSign:  null;
    discart:           boolean;
    varietyProductID:  IVarietyProductID;
    plagueID:          IPlagueID;
}

export interface IPlagueID {
    id:             number;
    scientificName: string;
    commonNames:    string;
    gender:         string;
    minTemperature: string;
    maxTemperature: null;
    optTemperature: string;
}

export interface IPlagueLocation {
    x: number;
    y: number;
}

export interface IVarietyProductID {
    id:          number;
    varietyName: string;
}
