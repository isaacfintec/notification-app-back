export const Sports = 'Sports';
export const Finance = 'Finance';
export const Movies = 'Movies';
export const SMS = 'SMS';
export const EMail = 'EMail';
export const Push = 'Push';

export const CATEGORIES = {
  Sports,
  Finance,
  Movies,
};

export const NOTIFICATIONS = {
  SMS,
  EMail,
  Push,
};

export const ALL_CATEGORIES = Object.values(
  CATEGORIES,
) as (keyof typeof CATEGORIES)[];

export const ALL_NOTIFICATIONS = Object.values(
  NOTIFICATIONS,
) as (keyof typeof NOTIFICATIONS)[];
