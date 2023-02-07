export const formatAddress = ({ street, suite, city, zipcode }) => {
  return `${street}, ${suite}, ${city} ${zipcode}`;
};
