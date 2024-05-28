import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertUnixToMMDDYYYYHHMM(unixTimestamp: number) {
  // Convert Unix timestamp to milliseconds
  let date = new Date(unixTimestamp * 1000);

  // Get month, day, and year
  let month = date.getMonth() + 1; // Months are zero-based
  let day = date.getDate();
  let year = date.getFullYear();

  // Get hours and minutes
  let hours = date.getHours();
  let minutes = date.getMinutes();

  // Determine AM or PM
  let amOrPm = hours >= 12 ? 'PM' : 'AM';

  // Convert to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // 0 should be converted to 12

  // Format MM/DD/YYYY HH:MM AM/PM
  let formattedDate = month.toString().padStart(2, '0') + '/' + day.toString().padStart(2, '0') + '/' + year + ' @ ' +
                      hours.toString() + ':' + minutes.toString().padStart(2, '0') + ' ' + amOrPm;

  return formattedDate;
}

