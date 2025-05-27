import {CreateVideoInputModel, Resolutions} from "../src/models/video_model";

const request = require("supertest");
import {app} from "../src";
import {videos} from "../src/routers/videos_router";

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
            title: "moreThen40Symbolssssssssssssssssssssssssssssssssssssssssssssssssss",
            author: "moreThen20Symbolsssssssssssssssssssssssssssssssssssssssss",
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
})




