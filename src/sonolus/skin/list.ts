import { filterSkins, paginateItems } from '@sonolus/express'
import { sonolus } from '../index.js'
import { skinSearches } from './search.js'

export const installSkinList = () => {
    sonolus.skin.listHandler = ({ search: { type, options }, page }) => {
        const items = sonolus.skin.items

        if (type === 'quick') {
            return {
                ...paginateItems(filterSkins(items, options.keywords), page),
                searches: skinSearches,
            }
        }
        const isFilterActive = (opts: Record<string, boolean>) => Object.values(opts).some((v) => v)

        const filteredItems = items.filter(({ meta }) => {
            const serverMatch = isFilterActive(options.server) && options.server[meta.server]
            const versionMatch = isFilterActive(options.version) && options.version[meta.version]
            const refinedMatch = isFilterActive(options.refined) && options.refined[meta.refined]

            return serverMatch && versionMatch && refinedMatch
        })

        const finalItems = filterSkins(filteredItems, options.keywords)

        return {
            ...paginateItems(finalItems, page),
            searches: skinSearches,
        }
    }
}
