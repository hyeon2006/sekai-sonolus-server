import { LevelItemModel } from '@sonolus/express'
import { format } from '../utils/i18n.js'

const descriptionTemplate = {
    ja: '作詞: {}\n作曲: {}\n編曲: {}\n\n{}',
    en: 'Lyrics: {}\nComposer: {}\nArrangement: {}\n\n{}',
    ko: '작사: {}\n작곡: {}\n편곡: {}\n\n{}',
    zht: '作詞: {}\n作曲: {}\n編曲: {}\n\n{}',
    zhs: '歌词: {}\n作曲: {}\n编曲: {}\n\n{}',
    es: 'Letras: {}\nCompositor: {}\nArreglos: {}\n\n{}',
}

export const translateLevel = (level: LevelItemModel): LevelItemModel => {
    const info = level.meta.infos?.[0]
    if (!info) return level

    const translatedLevel = { ...level, title: { ...level.title }, artists: { ...level.artists } }

    if (info.title) translatedLevel.title.ko = info.title

    const lyricist = { ...level.meta.lyricist }
    if (info.lyricist) lyricist.ko = info.lyricist

    const composer = { ...level.meta.composer }
    if (info.composer) composer.ko = info.composer

    const arranger = { ...level.meta.arranger }
    if (info.arranger) arranger.ko = info.arranger

    translatedLevel.description = format(descriptionTemplate, [
        lyricist,
        composer,
        arranger,
        { ja: level.meta.keywords },
    ])

    return translatedLevel
}

export const translateLevels = (levels: LevelItemModel[]): LevelItemModel[] =>
    levels.map((level) => translateLevel(level))
