import moment from 'moment';

import { IUser } from 'types';

export function getFullName(user: IUser) {
  const userObj = { ...user };
  const fullName = (Object.keys(userObj).length === 0)
    ? ''
    : `${userObj.first_name} ${userObj.last_name}`;

  return fullName;
}

export function getReadableDate(date) {
  if (!date) return '';

  return moment(date).format('DD-MMM-YYYY');
}

export function getReadableTime(time) {
  if (!time) return '';

  return moment(time).format('HH:mm');
}

export function handleKeyDown(
  event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  fn: (params: any) => unknown
) {
  if (event.key === 'Enter') fn(event);
}
