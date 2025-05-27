import {Request, Response, Router} from "express";
import {Video, Resolutions, CreateVideoInputModel} from "../models/video_model";
import {APIErrorResult} from "../models/errors_model";
import {validateResolutions} from "../features/resolutions_handling";

export const videos_router = Router({})

export let videos: Video[] = [{
    "id": 1,
    "title": "string",
    "author": "string",
    "canBeDownloaded": true,
    "minAgeRestriction": null,
    "createdAt": "2025-05-25T20:30:08.191Z",
    "publicationDate": "2025-05-25T20:30:08.191Z",
    "availableResolutions": [
        Resolutions.P144
    ]
},
    {
        "id": 2,
        "title": "string",
        "author": "string",
        "canBeDownloaded": true,
        "minAgeRestriction": 5,
        "createdAt": "2025-05-25T20:30:08.191Z",
        "publicationDate": "2025-05-25T20:30:08.191Z",
        "availableResolutions": [
            Resolutions.P144
        ]
    }]
videos_router.get('/', (req: Request, res: Response) => {
    res.status(200).send(videos)
})

videos_router.get('/:id', (req: Request, res: Response) => {
    const searchId = +req.params.id
    for (let video of videos){
        if (video.id === searchId){
            res.status(200).send(video)
            return
        }
    }
    res.sendStatus(404)
})



videos_router.post('/', (req: Request<{}, {},CreateVideoInputModel>, res: Response) => {
    let gatheredErrors: APIErrorResult = {errorMessages:[]}
    if (!req.body.title.trim() || req.body.title.trim().length>40 || typeof req.body.title!=='string'){
        gatheredErrors.errorMessages.push({
            message:"Invalid passed value",
            field:"title"
        })
    }
    if (!req.body.author.trim() || req.body.author.trim().length>20 || typeof req.body.title!=='string'){
        gatheredErrors.errorMessages.push({
            message:"Invalid passed value",
            field:"author"
        })
    }
    const parsedResolutions: Resolutions[] = validateResolutions(req.body.availableResolutions,gatheredErrors)
    if (gatheredErrors.errorMessages.length>0){
        res.status(400).send(gatheredErrors)
        return
    }
    const newVideo: Video = {
        id: videos.length,
        title: req.body.title,
        author: req.body.author,
        availableResolutions: parsedResolutions,
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: new Date().toISOString(),
        publicationDate: addOneDay(new Date()).toISOString(),
    }
    videos.push(newVideo)
    res.status(201).send(newVideo)

})
