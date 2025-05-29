import {Request, Response, Router} from "express";
import {CreateVideoInputModel, Resolutions, UpdateVideoInputModel, Video} from "../models/video_model";
import {APIErrorResult} from "../models/errors_model";
import {validateResolutions} from "../features/resolutions_handling";
import {addOneDay} from "../features/date_handling";
//import {app} from "../index";

export const videos_router = Router({})

export let videos: Video[] = [
    {
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
    }
    ]

export function clearDB(){
    videos = []
}
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



videos_router.post('/', (req: Request, res: Response) => {
    let gatheredErrors: APIErrorResult = {errorMessages:[]}
    if (!req.body.title || req.body.title.length>40 || typeof req.body.title!=='string'){
        gatheredErrors.errorMessages.push({
            message:"Invalid passed value",
            field:"title"
        })
    }
    if (!req.body.author || req.body.author.length>20 || typeof req.body.author!=='string'){
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
        id: videos.length+1,
        title: req.body.title,
        author: req.body.author,
        availableResolutions: parsedResolutions,
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: new Date().toISOString(),
        publicationDate: addOneDay(Date.now()).toISOString(),
    }
    videos.push(newVideo)
    res.status(201).send(newVideo)
})


videos_router.put('/:id', (req: Request, res: Response) => {
    let updatedId: number = NaN
    const searchId = +req.params.id
    for (const videoId in videos){
        if (searchId === videos[videoId].id) {
            updatedId = +videoId
        }
    }
    if (!updatedId){
        res.sendStatus(404)
        return
    }
    let gatheredErrors: APIErrorResult = {errorMessages:[]}
    if (!req.body.title || req.body.title.length>40 || typeof req.body.title!=='string'){
        gatheredErrors.errorMessages.push({
            message:"Invalid passed value",
            field:"title"
        })
    }
    if (!req.body.author || req.body.author.length>20 || typeof req.body.title!=='string'){
        gatheredErrors.errorMessages.push({
            message:"Invalid passed value",
            field:"author"
        })
    }
    const parsedResolutions: Resolutions[] = validateResolutions(req.body.availableResolutions,gatheredErrors)
    if (typeof req.body.canBeDownloaded !== "boolean"){
        gatheredErrors.errorMessages.push({
            message:"Invalid passed value",
            field:"canBeDownloaded"
        })
    }
    if ((req.body.minAgeRestriction>18 || req.body.minAgeRestriction<1)&&req.body.minAgeRestriction){
        gatheredErrors.errorMessages.push({
            message:"Invalid passed value",
            field:"minAgeRestriction"
        })
    }
    if (gatheredErrors.errorMessages.length>0){
        res.status(400).send(gatheredErrors)
        return
    }
    const updatedVideo: Video = {
        id: videos[updatedId].id,
        title: req.body.title,
        author: req.body.author,
        availableResolutions: parsedResolutions,
        canBeDownloaded: req.body.canBeDownloaded,
        minAgeRestriction: req.body.minAgeRestriction,
        createdAt: videos[updatedId].createdAt,
        publicationDate: req.body.publicationDate,
    }
    videos[updatedId]=updatedVideo
    res.sendStatus(204)
})

videos_router.delete('/:id', (req: Request, res: Response) => {
    const searchId = +req.params.id
    for (let videoId in videos){
        if (videos[videoId].id === searchId){
            videos=videos.slice(+videoId,1)
            res.sendStatus(204)
            return
        }
    }
    res.sendStatus(404)
})

