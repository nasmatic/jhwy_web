import moment from 'moment';

export function num(tp, stamp, id) {
    if (!stamp || !id) {
        return '';
    }

    return `${tp}${moment(stamp).format('YYYYMMDD')}${id}`;
}
