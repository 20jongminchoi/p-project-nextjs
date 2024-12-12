import { unstable_cache } from 'next/cache';

export const _parkingData = {
  AI: {
    lastUpdated: "주차 가능 여부를 보려면 새로고침 하세요",
    imageUrl: null,
  },
  center: {
    lastUpdated: "주차 가능 여부를 보려면 새로고침 하세요",
    imageUrl: null,
  },
};

export const getParkingData = () => _parkingData;

export const parkingData = unstable_cache(getParkingData, ["parkingData"]);