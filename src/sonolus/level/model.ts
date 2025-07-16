import { LocalizationText } from '@sonolus/core'
import { MasterDifficulty } from '../../clients/master/difficulty.js'
import { MasterMusicInfo } from '../../clients/master/music.js'
import { Server } from '../../clients/master/server.js'
import { CharacterId } from '../../repository/character.js'

declare module '@sonolus/express' {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface LevelItemModel {
        meta: {
            musicId: number
            musicVocalId: number
            musicVocalType: string
            publishedAt: number
            vocalTypeKey: string
            characterIds: CharacterId[]
            difficulty: MasterDifficulty
            fillerSec: number
            server: Server
            infos?: MasterMusicInfo[]
            lyricist: LocalizationText
            composer: LocalizationText
            arranger: LocalizationText
            keywords: string
        }
    }
}
