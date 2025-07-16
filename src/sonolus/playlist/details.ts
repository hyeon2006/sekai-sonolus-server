import { Icon, Text } from '@sonolus/core'
import { PlaylistItemModel } from '@sonolus/express'
import { databaseEngineItem } from 'sonolus-pjsekai-js'
import { config } from '../../config.js'
import { randomize } from '../../utils/math.js'
import { sonolus } from '../index.js'
import { nonEmpty } from '../utils/section.js'
import { hideSpoilers, hideSpoilersFromPlaylist } from '../utils/spoiler.js'
import { translatePlaylist, translatePlaylists } from './translate.js'

export const installPlaylistDetails = () => {
    sonolus.playlist.detailsHandler = ({ itemName, options: { spoilers, usingTranslation } }) => {
        if (itemName.startsWith(`${config.sonolus.prefix}-random-`)) {
            const [, , , min, max] = itemName.split('-')
            const minRating = +(min ?? '') || 0
            const maxRating = +(max ?? '') || 0

            return {
                item: {
                    name: itemName,
                    version: 1,
                    title: { en: `${minRating} - ${maxRating}` },
                    subtitle: {},
                    author: databaseEngineItem.subtitle,
                    tags: [{ title: { en: Text.Random } }],
                    levels: randomize(
                        hideSpoilers(spoilers.music, sonolus.level.items)
                            .filter(({ rating }) => rating >= minRating && rating <= maxRating)
                            .map(({ name }) => name),
                        20,
                    ),
                    meta: {
                        musicVocalTypes: new Set(),
                        characterIds: new Set(),
                        publishedAt: Date.now(),
                        lyricist: {},
                        composer: {},
                        arranger: {},
                        keywords: '',
                    },
                },
                actions: {},
                hasCommunity: false,
                leaderboards: [],
                sections: [],
            }
        }

        let item = sonolus.playlist.items.find(({ name }) => name === itemName)
        if (!item) return 404

        if (usingTranslation) {
            item = translatePlaylist(item)
        }

        const randomSection = getRandom(item)
        if (usingTranslation) {
            randomSection.items = translatePlaylists(randomSection.items)
        }

        return {
            item: hideSpoilersFromPlaylist(spoilers.music, item),
            description: item.description,
            actions: {},
            hasCommunity: false,
            leaderboards: [],
            sections: [getRandom(item)].filter(nonEmpty),
        }
    }
}

const getRandom = (item: PlaylistItemModel) => ({
    title: { en: Text.Random },
    icon: Icon.Shuffle,
    itemType: 'playlist' as const,
    items: randomize(
        sonolus.playlist.items.filter((i) => i !== item),
        5,
    ),
})
