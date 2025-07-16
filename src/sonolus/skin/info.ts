import { sonolus } from '../index.js'
import { skinSearches } from './search.js'

export const installSkinInfo = () => {
    sonolus.skin.infoHandler = () => {
        const jaskins = sonolus.skin.items.filter((item) => item.meta.server === 'ja')
        const enskins = sonolus.skin.items.filter((item) => item.meta.server === 'en')
        const v1skins = sonolus.skin.items.filter((item) => item.meta.version === '1.0.0')
        const v3skins = sonolus.skin.items.filter((item) => item.meta.version === '3.0.0')
        const normal = sonolus.skin.items.filter((item) => item.meta.refined === 'normal')
        const blending = sonolus.skin.items.filter((item) => item.meta.refined === 'blending')
        const createMultiOptions = <T extends Record<string, unknown>>(
            allValues: T, // skinSearches에 정의된 values 객체
            selected: Partial<Record<keyof T, boolean>>, // 선택하고 싶은 옵션
        ): Record<keyof T, boolean> => {
            // 모든 옵션의 키를 가져와 기본값을 false로 설정한 객체를 만듭니다.
            const defaultOptions = Object.fromEntries(
                Object.keys(allValues).map((key) => [key, false]),
            ) as Record<keyof T, boolean>

            return {
                ...defaultOptions,
                ...selected,
            }
        }
        return {
            searches: skinSearches,
            sections: [
                {
                    search: {
                        value: {
                            type: 'advanced',
                            rawOptions: {
                                version: createMultiOptions(
                                    skinSearches.advanced.options.version.values,
                                    {
                                        '1.0.0': true,
                                    },
                                ),
                            },
                        },
                    },
                    title: {
                        en: 'v1 interface',
                        ko: 'v1 인터페이스',
                    },
                    itemType: 'skin',
                    items: v1skins.slice(0, 2),
                },
                {
                    search: {
                        value: {
                            type: 'advanced',
                            rawOptions: {
                                version: createMultiOptions(
                                    skinSearches.advanced.options.version.values,
                                    {
                                        '3.0.0': true,
                                    },
                                ),
                            },
                        },
                    },
                    title: {
                        en: 'v3 interface',
                        ko: 'v3 인터페이스',
                    },
                    itemType: 'skin',
                    items: v3skins.slice(0, 2),
                },
                {
                    search: {
                        value: {
                            type: 'advanced',
                            rawOptions: {
                                server: createMultiOptions(
                                    skinSearches.advanced.options.server.values,
                                    {
                                        ja: true,
                                    },
                                ),
                            },
                        },
                    },
                    title: {
                        en: 'ja',
                        ko: '일섭',
                    },
                    itemType: 'skin',
                    items: jaskins.slice(0, 2),
                },
                {
                    search: {
                        value: {
                            type: 'advanced',
                            rawOptions: {
                                server: createMultiOptions(
                                    skinSearches.advanced.options.server.values,
                                    {
                                        en: true,
                                    },
                                ),
                            },
                        },
                    },
                    title: {
                        en: 'en',
                        ko: '글섭',
                    },
                    itemType: 'skin',
                    items: enskins.slice(0, 2),
                },
                {
                    search: {
                        value: {
                            type: 'advanced',
                            rawOptions: {
                                type: createMultiOptions(
                                    skinSearches.advanced.options.refined.values,
                                    {
                                        normal: true,
                                    },
                                ),
                            },
                        },
                    },
                    title: {
                        en: 'original',
                        ko: '일반',
                    },
                    itemType: 'skin',
                    items: normal.slice(0, 2),
                },
                {
                    search: {
                        value: {
                            type: 'advanced',
                            rawOptions: {
                                type: createMultiOptions(
                                    skinSearches.advanced.options.refined.values,
                                    {
                                        blending: true,
                                    },
                                ),
                            },
                        },
                    },
                    title: {
                        en: 'blending',
                        ko: '블렌딩',
                    },
                    itemType: 'skin',
                    items: blending.slice(0, 2),
                },
            ],
            banner: sonolus.banner,
        }
    }
}
