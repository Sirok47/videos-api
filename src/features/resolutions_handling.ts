import {APIErrorResult} from "../models/errors_model";
import {Resolutions} from "../models/video_model";

export function validateResolutions(passedValues: string[], gatheredErrors: APIErrorResult):Resolutions[]{
    let approvedResolutions: Resolutions[] = []
    for (let value of passedValues){
        for (let resolution of Object.values(Resolutions)){
            if (value===resolution){
                approvedResolutions.push(resolution)
                continue
            } else {
                gatheredErrors.errorMessages.push({
                    message: "Passed value "+ value +" not supported",
                    field: "availableResolutions"
                })
                return []
            }
        }
    }
    return approvedResolutions
}