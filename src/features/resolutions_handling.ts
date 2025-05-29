import {APIErrorResult} from "../models/errors_model";
import {Resolutions} from "../models/video_model";

export function validateResolutions(passedValues: string[], gatheredErrors: APIErrorResult):Resolutions[]{
    let approvedResolutions: Resolutions[] = []
    for (let value of passedValues){
        const foundResolution = Object.values(Resolutions).find((e)=>e === value)
        if (!foundResolution){
            gatheredErrors.errorsMessages.push({
                message: "Passed value "+ value +" not supported",
                field: "availableResolutions"
            })
            return []
        }
        approvedResolutions.push(foundResolution)
    }
    return approvedResolutions
}