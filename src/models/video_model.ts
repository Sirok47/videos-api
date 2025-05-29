import {type} from "os";

export enum Resolutions {P144 = "P144", P240 = "P240", P360 = "P360", P480 = "P480", P720 = "P720", P1080 = "P1080", P1440 = "P1440", P2160 = "P2160"}

export type Video = {
    id:	number
    title: string
    author:	string
    canBeDownloaded: boolean
    minAgeRestriction: number | null
    createdAt: string
    publicationDate: string
    availableResolutions: string[]//Resolutions[]
}

export type CreateVideoInputModel = {
    title:	string
    author:	string
    availableResolutions: string[]//Resolutions[]
}

export type UpdateVideoInputModel = {
    title:	string
    author:	string
    availableResolutions: string[]//Resolutions[]
    canBeDownloaded: boolean
    minAgeRestriction:	number
    publicationDate: string
}