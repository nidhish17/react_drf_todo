import DOMPurify from "dompurify";
import {differenceInDays} from "date-fns";

const createMarkup = function(content) {
    return {__html: DOMPurify.sanitize(content)};
}

const calcNumDaysLeft = function(endDateStr) {
    if (!endDateStr) return;
    const endDate = new Date(endDateStr);
    const currentTime = new Date();
    return differenceInDays(endDate, currentTime);
}

const formatTime = function(time) {
    if (!time) return;
    const date = new Date(time);
    const formattedTime = date.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
    });
    return formattedTime;
}

// receives the localtime of the users' and sets the time to end of the day and then return the converted time in utc
const formatDateTime = function(dateTime) {
    if (!dateTime) return;

    const date = new Date(dateTime);

    date.setHours(23, 59, 59, 0);

    return date.toISOString();
};

function isOverflown(element) {
  return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
}

const BASE_URL = "http://localhost:8000/my-todo/"

export const ACCESS_TOKEN = "accessToken";
export const REFRESH_TOKEN = "refreshToken";

export {createMarkup, calcNumDaysLeft, formatTime, formatDateTime, BASE_URL, isOverflown};
