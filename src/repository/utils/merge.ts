import { Server } from '../../clients/master/server.js'
import { entries, fromEntries } from '../../utils/object.js'

export const merge = <T extends object, PK extends keyof T, K extends keyof T>(
    data: Record<Server, T[]>,
    primaryKey: PK,
    keys: K[],
) => {
    const result: Record<
        T[PK] & PropertyKey,
        Omit<T, K> & {
            [P in K]-?: Record<string, T[P]>
        } & {
            server: Server
        }
    > = {} as never

    for (const [server, items] of entries(data)) {
        for (const item of items) {
            const id = item[primaryKey] as T[PK] & PropertyKey

            const baseItem: Partial<T> = { ...item }
            for (const key of keys) {
                // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
                delete baseItem[key]
            }

            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            if (!result[id]) {
                result[id] = {
                    ...item,
                    ...fromEntries(keys.map((key) => [key, {}])),
                    server,
                } as never
            } else {
                result[id] = { ...baseItem, ...result[id] }
            }

            for (const key of keys) {
                if (item[key] !== undefined) {
                    result[id][key][server] ??= item[key]
                }
            }
        }
    }

    return result
}
