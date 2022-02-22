import { isValid } from "date-fns";

export function validateStringDate(stringDate) {
    return isValid(Date.parse(stringDate))
}