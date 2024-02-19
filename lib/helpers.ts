import { bech32m } from "bech32"

export const NATIVE_SCALE = 1000000

export function truncateHash(hash: string, prefixLength: number = 4, suffixLength: number = 4): string {
  if (hash.length <= prefixLength + suffixLength) {
    return hash; // No need to truncate if the hash is already short
  }

  const prefix = hash.substring(0, prefixLength);
  const suffix = hash.substring(hash.length - suffixLength);

  return `${prefix}...${suffix}`;
}

export function timeAgo(timestamp: string): string {
  const currentTime = new Date();
  const previousTime = new Date(timestamp);

  const timeDifferenceInSeconds = Math.floor((currentTime.getTime() - previousTime.getTime()) / 1000);

  if (timeDifferenceInSeconds < 60) {
    return `${timeDifferenceInSeconds} seconds ago`;
  } else if (timeDifferenceInSeconds < 3600) {
    const minutes = Math.floor(timeDifferenceInSeconds / 60);
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else if (timeDifferenceInSeconds < 86400) {
    const hours = Math.floor(timeDifferenceInSeconds / 3600);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else {
    const days = Math.floor(timeDifferenceInSeconds / 86400);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  }
}

export function humanizedTime(timestamp: string): string {
  const date = new Date(timestamp)
  const formattedDate = date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'UTC',
  })
  return formattedDate
}

export function validateAddress(address: string): boolean {
  // check if valid bech32 with prefix 'tnam'
  try {
    const decoded = bech32m.decodeUnsafe(address)
    return decoded?.prefix === 'tnam' && decoded?.words.length === 34
  } catch (error) {
    return false
  }
}

export function validateTmAddress(address: string): boolean {
  // check if valid hex string of length 40
  const hexRegex = /^[0-9A-Fa-f]+$/g
  return hexRegex.test(address) && address.length === 40
}

export function validateHash(hash: string): boolean {
  // check if valid hex string of length 64
  const hexRegex = /^[0-9A-Fa-f]+$/g
  return hexRegex.test(hash) && hash.length === 64
}

export function validateHeight(height: string): boolean {
  // check if valid positive integer
  const positiveIntegerRegex = /^[1-9]\d*$/;
  return positiveIntegerRegex.test(height);
}