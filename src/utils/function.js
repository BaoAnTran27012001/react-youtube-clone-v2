import moment from "moment";
export const convertDate = (data) => {
  return moment(data).fromNow();
};
export const convertDuration = (data) => {
  // Chuyển ISO string thành milisecond
  const milisecond = moment.duration(data).asMilliseconds();
  // Từ millisecond mới format về Minute và second
  return moment(milisecond).format("mm:ss");
};
