import {reduce, isEqual} from 'lodash'

export function GetObjectDifference(obj1: any, obj2: any) {
    return reduce(obj2, (result: any, value: any, key: string) => {
        if (!isEqual(value, obj1[key])) {
            result[key] = value
        }
        return result
    }, {})
} 