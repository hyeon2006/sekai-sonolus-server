import { databaseEngineItem } from 'sonolus-pjsekai-js'
import { config } from '../../config.js'
import { sonolus } from '../index.js'

export const installInfo = () => {
    sonolus.title = databaseEngineItem.subtitle
    sonolus.serverInfoHandler = ({ options }) => {
        const getBanner = (banner: string) => {
            if (banner === 'bg1' && config.sonolus.banner1Path) {
                return sonolus.add(config.sonolus.banner1Path)
            } else if (banner === 'bg2' && config.sonolus.banner2Path) {
                return sonolus.add(config.sonolus.banner2Path)
            }
            return undefined;
        }
    return {
        title: sonolus.title,
        configuration: sonolus.configuration,
        description: {
            en: "Proseka Rush, a visual extension engine for the official sekai engine",
            ko: "프로세카 러쉬, sekai engine에서 비쥬얼적으로 확장한 모드 서버입니다"
        },
        buttons: [/*{ type: "authentication" },*/ { type: "post" }, { type: "playlist" }, { type: "level" },
            { type: "background" }, { type: "skin" }, { type: "effect" },
            { type: "particle" }, { type: "engine" }, { type: "configuration" },],
        banner: getBanner(options.banner),
        }
    }
}
