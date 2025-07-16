import { Icon, Text } from '@sonolus/core'
import { LevelItemModel } from '@sonolus/express'
import { randomize } from '../../utils/math.js'
import { sonolus } from '../index.js'
import { hideSpoilers } from '../utils/spoiler.js'
import { levelSearches } from './search.js'
import { translateLevels } from './translate.js'

export const installLevelInfo = () => {
    sonolus.level.infoHandler = ({ options: { spoilers, usingTranslation } }) => {
        const randomLevels: Record<string, LevelItemModel> = {}

        const newestMusicIds = new Set<number>()
        const newestLevels: LevelItemModel[] = []

        for (const level of hideSpoilers(spoilers.music, sonolus.level.items)) {
            randomLevels[`${level.meta.musicId}-${level.meta.musicVocalId}`] ??= level

            if (newestLevels.length >= 5) continue
            if (newestMusicIds.has(level.meta.musicId)) continue

            newestMusicIds.add(level.meta.musicId)
            newestLevels.push(level)
        }

        let randomItems = randomize(Object.values(randomLevels), 5)
        let newestItems = newestLevels

        if (usingTranslation) {
            randomItems = translateLevels(randomItems)
            newestItems = translateLevels(newestItems)
        }

        return {
            searches: levelSearches,
            sections: [
                {
                    title: { en: Text.Random },
                    icon: Icon.Shuffle,
                    itemType: 'level',
                    items: randomItems,
                },
                {
                    title: { en: Text.Newest },
                    itemType: 'level',
                    items: newestItems,
                },
            ],
            banner: sonolus.banner,
        }
    }
}
