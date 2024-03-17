import axios from "./customizeAxios";

const logBid = (amount, date, memberId, auctionId, isWining) => {
  return axios.post("/bids", {
    amount: amount,
    date: date,
    memberId: memberId,
    auctionId: auctionId,
    isWining: isWining,
  });
};

const getBidInfoById = (id) => {
  return axios.get(`/bids/${id}`);
};

export { logBid, getBidInfoById };
