import moment from 'moment';

export const dateString = date => moment(date).format('DD MMM YYYY');
export const dateTimeString = date => moment(date).format('DD MMM YYYY (ddd) HH:mm');
export const timeString = date => moment(date).format('HH:mm');
export const yearString = date => moment(date).format('YYYY');
export const monthYearString = date => moment(date).format('MMMM YYYY');
