declare module '@sonolus/express' {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface SkinItemModel {
        meta: {
            server: 'ja' | 'en'
            version: '1.0.0' | '3.0.0'
            refined: 'normal' | 'blending'
        }
    }
}
