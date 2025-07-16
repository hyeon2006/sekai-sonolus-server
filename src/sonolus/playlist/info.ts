import { Icon, Text } from '@sonolus/core'
import { randomize } from '../../utils/math.js'
import { sonolus } from '../index.js'
import { hideSpoilersFromPlaylists } from '../utils/spoiler.js'
import { playlistSearches } from './search.js'
import { translatePlaylists } from './translate.js'

export const installPlaylistInfo = () => {
    sonolus.playlist.infoHandler = ({ options: { spoilers, usingTranslation } }) => {
        let processedPlaylists = hideSpoilersFromPlaylists(spoilers.music, sonolus.playlist.items)

        if (usingTranslation) {
            processedPlaylists = translatePlaylists(processedPlaylists)
        }

        return {
            searches: playlistSearches,
            sections: [
                {
                    title: { en: Text.Random },
                    icon: Icon.Shuffle,
                    itemType: 'playlist',
                    items: randomize(processedPlaylists, 5),
                },
                {
                    title: { en: Text.Newest },
                    itemType: 'playlist',
                    items: processedPlaylists.slice(0, 5),
                },
            ],
            banner: sonolus.banner,
        }
    }
}
