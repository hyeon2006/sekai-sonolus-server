import { Icon, Text } from '@sonolus/core'
import { ServerFormsModel } from '@sonolus/express'
import { toMultiValues } from '../utils/form.js'

export const skinSearches = {
    advanced: {
        title: { en: Text.Advanced },
        icon: Icon.Advanced,
        requireConfirmation: false,
        options: {
            keywords: {
                name: { en: Text.Keywords },
                required: false,
                type: 'text',
                placeholder: { en: Text.KeywordsPlaceholder },
                def: '',
                limit: 0,
                shortcuts: [],
            },
            server: {
                name: { en: 'Server', ko: '서버' },
                required: false,
                type: 'multi',
                values: toMultiValues({
                    ja: { title: { en: 'ja', ko: '일섭' } },
                    en: { title: { en: 'en', ko: '글섭' } },
                }),
            },
            version: {
                name: { en: 'Interface Version', ko: '인터페이스 버전' },
                required: false,
                type: 'multi',
                values: toMultiValues({
                    '1.0.0': { title: { en: 'v1 interface', ko: 'v1 인터페이스' } },
                    '3.0.0': { title: { en: 'v3 interface', ko: 'v3 인터페이스' } },
                }),
            },
            refined: {
                name: { en: 'refined', ko: '개선' },
                required: false,
                type: 'multi',
                values: toMultiValues({
                    normal: { title: { en: 'Original', ko: '일반' } },
                    blending: { title: { en: 'Blending', ko: '블렌딩' } },
                }),
            },
        },
    },
} satisfies ServerFormsModel
