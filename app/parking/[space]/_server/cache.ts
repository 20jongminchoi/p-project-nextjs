import { unstable_cache } from "next/cache";

// eslint-disable-next-line prefer-const
let _parkingData = {
  AI: {
    lastUpdated: "주차 가능 여부를 보려면 새로고침 하세요",
    imageUrl: null,
  },
  center: {
    lastUpdated: "주차 가능 여부를 보려면 새로고침 하세요",
    imageUrl: null,
  },
};

export const setParkingData = (data: Partial<typeof _parkingData>) => {
  Object.assign(_parkingData, data);
  // console.log(_parkingData);
};

export const getParkingData = unstable_cache(
  async () => {
    // console.log("getParkingData", _parkingData);
    return _parkingData;
  },
  [],
  {
    tags: ["parkingData"],
  }
);
