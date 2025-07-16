import { PlaylistItemModel } from '@sonolus/express'
import { format } from '../utils/i18n.js'

const descriptionTemplate = {
    ja: '作詞: {}\n作曲: {}\n編曲: {}\n\n{}',
    en: 'Lyrics: {}\nComposer: {}\nArrangement: {}\n\n{}',
    ko: '작사: {}\n작곡: {}\n편곡: {}\n\n{}',
    zht: '作詞: {}\n作曲: {}\n編曲: {}\n\n{}',
    zhs: '歌词: {}\n作曲: {}\n编曲: {}\n\n{}',
    es: 'Letras: {}\nCompositor: {}\nArreglos: {}\n\n{}',
}

export const translatePlaylist = (playlist: PlaylistItemModel): PlaylistItemModel => {
    const info = playlist.meta.infos?.[0]
    if (!info) return playlist

    const translatedPlaylist = {
        ...playlist,
        title: { ...playlist.title },
        subtitle: { ...playlist.subtitle },
    }

    if (info.title) translatedPlaylist.title.ko = info.title

    const lyricist = { ...playlist.meta.lyricist }
    if (info.lyricist) lyricist.ko = info.lyricist

    const composer = { ...playlist.meta.composer }
    if (info.composer) composer.ko = info.composer

    const arranger = { ...playlist.meta.arranger }
    if (info.arranger) arranger.ko = info.arranger

    translatedPlaylist.description = format(descriptionTemplate, [
        lyricist,
        composer,
        arranger,
        { ja: playlist.meta.keywords },
    ])

    return translatedPlaylist
}

export const translatePlaylists = (playlists: PlaylistItemModel[]): PlaylistItemModel[] =>
    playlists.map((playlist) => translatePlaylist(playlist))
