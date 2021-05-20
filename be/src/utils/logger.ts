const formatMessage = (message: string): string => {
  const now = new Date();
  const HH = String(now.getHours()).padStart(2, '0');
  const MM = String(now.getMinutes()).padStart(2, '0');
  const SS = String(now.getSeconds()).padStart(2, '0');
  const MS = String(now.getMilliseconds()).padStart(3, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const yyyy = now.getFullYear();
  const yyyymmdd = `${yyyy}-${mm}-${dd}`;
  const hhmmssms = `${HH}:${MM}:${SS}.${MS}`;
  return `${yyyymmdd} ${hhmmssms} - ${message}`;
};

const error = (message: string, _error?: Error): void => {
  console.error(formatMessage(message));
  console.error(_error);
};

const info = (message: string): void => {
  console.log(formatMessage(message));
};

export const logger = {
  error,
  info,
};
