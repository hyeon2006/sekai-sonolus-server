import { PlaylistItemModel } from '@sonolus/express'
import { config } from '../../config.js'
import { Repository } from '../../repository/index.js'
import { sonolus } from '../index.js'

export const updatePlaylistItems = (repository: Repository) => {
    const playlists = new Map<number, PlaylistItemModel>()

    for (const level of sonolus.level.items) {
        const playlist = playlists.get(level.meta.musicId)

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        const musicVocalTypeTitle = repository.musicVocalTypes[level.meta.vocalTypeKey]?.title ?? {
            en: level.meta.musicVocalType,
        }

        if (playlist) {
            playlist.levels.push(level.name)

            if (!playlist.meta.musicVocalTypes.has(level.meta.vocalTypeKey)) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                playlist.tags.push({ title: musicVocalTypeTitle })
                playlist.meta.musicVocalTypes.add(level.meta.vocalTypeKey)
            }

            for (const characterId of level.meta.characterIds) {
                playlist.meta.characterIds.add(characterId)
            }

            if (level.meta.publishedAt < playlist.meta.publishedAt) {
                playlist.meta.publishedAt = level.meta.publishedAt
            }
        } else {
            playlists.set(level.meta.musicId, {
                name: `${config.sonolus.prefix}-${level.meta.musicId}`,
                version: 1,
                title: level.title,
                subtitle: level.artists,
                author: level.author,
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                tags: [{ title: musicVocalTypeTitle }],
                description: level.description,
                levels: [level.name],
                meta: {
                    musicVocalTypes: new Set([level.meta.vocalTypeKey]),
                    characterIds: new Set(level.meta.characterIds),
                    publishedAt: level.meta.publishedAt,
                    infos: level.meta.infos,
                    lyricist: level.meta.lyricist,
                    composer: level.meta.composer,
                    arranger: level.meta.arranger,
                    keywords: level.meta.keywords,
                },
            })
        }
    }

    sonolus.playlist.items = [...playlists.values()]
}
