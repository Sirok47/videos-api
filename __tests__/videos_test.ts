import {CreateVideoInputModel, Resolutions, UpdateVideoInputModel} from "../src/models/video_model";
import {videos} from "../src/routers/videos_router";
import {app} from "../src";

const request = require("supertest");

describe("/videos", () => {

    it("should return 200 and [2 elements]",async ()=>{
        await request(app)
            .get("/videos")
            .expect(200,videos)
    })

    it("should return 200 and video with id 1",async ()=>{
        await request(app)
            .get("/videos/1")
            .expect(200,{
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
            })
    })

    it("should return 404",async ()=>{
        await request(app)
            .get("/videos/543")
            .expect(404)
    })

    it("should return 400",async ()=>{
        const invalidVideo: CreateVideoInputModel = {
            title: "moreThan40Symbolssssssssssssssssssssssssssssssssssssssssssssssssss",
            author: "moreThan20Symbolsssssssssssssssssssssssssssssssssssssssss",
            availableResolutions: ["badResolution"]
        }
        await request(app)
            .post("/videos")
            .send(invalidVideo)
            .expect(400,{errorMessages:[
                    {
                        message:"Invalid passed value",
                        field:"title"
                    },
                    {
                        message:"Invalid passed value",
                        field:"author"
                    },
                    {
                        message: "Passed value badResolution not supported",
                        field: "availableResolutions"
                    }
                ]})
    })
    it("should return 201 and new video",async ()=> {
        const validVideo: CreateVideoInputModel = {
            title: "goodTitle",
            author: "goodAuthor",
            availableResolutions: [Resolutions.P144, Resolutions.P360, Resolutions.P1080]
        }
        const res = await request(app)
            .post("/videos")
            .send(validVideo)
            .expect(201)
        expect(res.body.id).toBe(3)
        expect(res.body.title).toBe("goodTitle")
        expect(res.body.author).toBe("goodAuthor")
        expect(res.body.availableResolutions).toStrictEqual([Resolutions.P144, Resolutions.P360, Resolutions.P1080])
        expect(res.body.canBeDownloaded).toBe(false)
        expect(res.body.minAgeRestriction).toBe(null)
    })

    it("should return 204",async ()=> {
        const validVideo: UpdateVideoInputModel = {
            title: "goodTitle",
            author: "goodAuthor",
            availableResolutions: [Resolutions.P144, Resolutions.P360, Resolutions.P1080],
            canBeDownloaded: true,
            minAgeRestriction: 10,
            publicationDate: ""
        }
        await request(app)
            .put("/videos/2")
            .send(validVideo)
            .expect(204)
    })
})




