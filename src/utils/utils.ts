const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
});

export const formatAsPrice = (price: number) => priceFormatter.format(price);

export const getAuthorizationTokenFromLocalStorage = () => {
  const token = localStorage.getItem("authorization_token");
  if (token) {
    return {
      "Authorization": token
    };
  }
  return null;
};
