/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import { LevelItemModel } from '@sonolus/express'
import { databaseEngineItem } from 'sonolus-pjsekai-js'
import {
    getMusicBgmPath,
    getMusicChartPath,
    getMusicCoverPath,
    getMusicPreviewPath,
} from '../../clients/asset/music.js'
import { difficulties } from '../../clients/master/difficulty.js'
import { config } from '../../config.js'
import { Repository } from '../../repository/index.js'
import { asset } from '../../utils/asset.js'
import { notUndefined } from '../../utils/object.js'
import { sonolus } from '../index.js'
import { format, join } from '../utils/i18n.js'
import { getLevelDataUrl } from './data.js'

const descriptionTemplate = {
    ja: '作詞: {}\n作曲: {}\n編曲: {}\n\n{}',
    en: 'Lyrics: {}\nComposer: {}\nArrangement: {}\n\n{}',
    ko: '작사: {}\n작곡: {}\n편곡: {}\n\n{}',
    zht: '作詞: {}\n作曲: {}\n編曲: {}\n\n{}',
    zhs: '歌词: {}\n作曲: {}\n编曲: {}\n\n{}',
    es: 'Letras: {}\nCompositor: {}\nArreglos: {}\n\n{}',
}

const characterSeparator = {
    ja: ' & ',
    en: ' & ',
    ko: ' & ',
    zht: ' & ',
    zhs: ' & ',
    es: ' & ',
}

export const updateLevelItems = (repository: Repository) => {
    const levels: LevelItemModel[] = []

    for (const musicDifficulty of Object.values(repository.musicDifficulties)) {
        const music = repository.musics[musicDifficulty.musicId]
        if (!music) continue

        const chart = asset(
            musicDifficulty.server,
            getMusicChartPath(music.id, musicDifficulty.musicDifficulty),
        )
        if (!repository.whitelist.has(chart.url)) continue

        const musicVocals = Object.values(repository.musicVocals).filter(
            ({ musicId }) => musicId === music.id,
        )

        const cover = asset(music.server, getMusicCoverPath(music.assetbundleName))

        for (const musicVocal of musicVocals) {
            const vocalTypeKey =
                musicVocal.caption.ja ||
                musicVocal.caption.en ||
                musicVocal.caption.ko ||
                musicVocal.caption.zht ||
                musicVocal.assetbundleName

            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const musicVocalTypeTitle =
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                repository.musicVocalTypes[vocalTypeKey]?.title ?? musicVocal.caption

            const bgm = asset(musicVocal.server, getMusicBgmPath(musicVocal.assetbundleName))
            if (!repository.whitelist.has(bgm.url)) continue

            const name = `${config.sonolus.prefix}-${music.id}-${musicVocal.id}-${musicDifficulty.musicDifficulty}`

            const preview = asset(
                musicVocal.server,
                getMusicPreviewPath(musicVocal.assetbundleName),
            )

            const characterIds = musicVocal.characters.map(
                (character) => `${character.characterType}_${character.characterId}` as const,
            )
            const characters = characterIds
                .map((characterId) => repository.characters[characterId])
                .filter(notUndefined)

            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const artists = characters.length
                ? join(
                      characterSeparator,
                      characters.map((character) => character.title),
                  )
                : musicVocalTypeTitle

            const description = format(descriptionTemplate, [
                music.lyricist,
                music.composer,
                music.arranger,
                { ja: music.keywords },
            ])

            levels.push({
                name,
                version: 1,
                rating: musicDifficulty.playLevel,
                title: music.title,
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                artists,
                author: databaseEngineItem.subtitle,
                tags: [
                    { title: difficulties[musicDifficulty.musicDifficulty].title },
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    { title: musicVocalTypeTitle },
                ],
                description,
                engine: databaseEngineItem.name,
                useSkin: { useDefault: true },
                useBackground: { useDefault: true },
                useEffect: { useDefault: true },
                useParticle: { useDefault: true },
                cover,
                bgm,
                preview,
                data: { url: getLevelDataUrl(name) },
                meta: {
                    musicId: music.id,
                    musicVocalId: musicVocal.id,
                    musicVocalType: musicVocal.musicVocalType,
                    vocalTypeKey: vocalTypeKey,
                    publishedAt: music.publishedAt,
                    characterIds: [...characterIds].sort(),
                    difficulty: musicDifficulty.musicDifficulty,
                    fillerSec: music.fillerSec,
                    server: musicVocal.server,
                    infos: music.infos,
                    lyricist: music.lyricist,
                    composer: music.composer,
                    arranger: music.arranger,
                    keywords: music.keywords,
                },
            })
        }
    }

    sonolus.level.items = levels.sort(
        (a, b) =>
            b.meta.publishedAt - a.meta.publishedAt ||
            b.meta.musicId - a.meta.musicId ||
            difficulties[a.meta.difficulty].index - difficulties[b.meta.difficulty].index,
    )
}
