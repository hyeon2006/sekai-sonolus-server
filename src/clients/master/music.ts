import { fetchMaster } from './fetch.js'
export type MasterMusicInfo = {
    title: string
    creator: string
    lyricist: string
    composer: string
    arranger: string
}

export type MasterMusic = {
    id: number
    title: string
    pronunciation: string
    lyricist: string
    composer: string
    arranger: string
    assetbundleName: string
    publishedAt: number
    fillerSec: number
    infos?: MasterMusicInfo[]
}

export const fetchMusics = fetchMaster<MasterMusic[]>('/musics.json')
