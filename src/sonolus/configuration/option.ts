import { ServerOptionsModel } from '@sonolus/express'
import { Repository } from '../../repository/index.js'

export const configurationOptions = {
    spoilers: {
        name: {},
        required: false,
        type: 'multi',
        values: {
            music: { title: {}, def: false },
            card: { title: {}, def: false },
        },
    },
    banner: {
        name: {
            en: 'Banner Image',
            ko: '배너 이미지',
        },
        required: true,
        type: 'select',
        def: 'bg2',
        values: {
            bg1: { title: '3rd' },
            bg2: { title: '4th' },
        },
    },
    usingTranslation: {
        name: {
            en: 'This is the setting for the `Translation version (Korean)` option on the Sekai Korean server.\n It does not work in languages ​​other than Korean.',
            ko: '번역 버전(한국어)',
        },
        required: false,
        type: 'toggle',
        def: true,
    },
} satisfies ServerOptionsModel

export const updateConfigurationOptions = (repository: Repository) => {
    configurationOptions.spoilers.name = repository.commonTexts.spoilerContent
    configurationOptions.spoilers.values.music.title = repository.commonTexts.music
    configurationOptions.spoilers.values.card.title = repository.commonTexts.card
}
