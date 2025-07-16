/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import { RepositoryData } from './data.js'
import { getMusicVocals } from './musicVocal.js'

export const getMusicVocalTypes = (data: RepositoryData) => {
    const musicVocals = getMusicVocals(data)

    // eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style, @typescript-eslint/no-explicit-any
    const vocalsByGroupKey: { [key: string]: any } = {}

    for (const vocal of Object.values(musicVocals)) {
        const groupKey =
            vocal.caption.ja ||
            vocal.caption.en ||
            vocal.caption.ko ||
            vocal.caption.zht ||
            vocal.assetbundleName
        if (!groupKey) continue

        if (!vocalsByGroupKey[groupKey]) {
            vocalsByGroupKey[groupKey] = {
                ...vocal,
                title: vocal.caption,
            }
        }
    }

    return vocalsByGroupKey
}
