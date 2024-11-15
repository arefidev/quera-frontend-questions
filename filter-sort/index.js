const products = [
  { id: 1, name: "Apple iPhone 12", category: "Electronics", price: 999 },
  { id: 2, name: "Adidas running shoes", category: "Sportswear", price: 280 },
  { id: 3, name: "Samsung Galaxy S21", category: "Electronics", price: 850 },
  { id: 4, name: "Nike Air Max", category: "Sportswear", price: 300 },
];

const criteria = {
  categories: ["Electronics", "Sportswear"],
  priceRange: { min: 200, max: 1000 },
  nameLength: { min: 10, max: 25 },
  keywords: ["Galaxy", "Air"],
  sortBy: [
    { field: "price", order: "ascending" },
    { field: "name", order: "descending" },
  ],
};

function filterAndSortProducts(products, criteria) {
  const { categories, priceRange, nameLength, keywords, sortBy } = criteria;

  const filterByKeywords = products.filter((product) =>
    keywords.some((keyword) => product.name.includes(keyword))
  );

  const filterByCategories = filterByKeywords.filter((product) =>
    categories.includes(product.category)
  );

  const filterByPriceRange = filterByCategories.filter(
    (product) =>
      product.price >= priceRange.min && product.price <= priceRange.max
  );

  const filterByNameLength = filterByPriceRange.filter(
    (product) =>
      product.name.length >= nameLength.min &&
      product.name.length <= nameLength.max
  );

  const sortedProducts = filterByNameLength.sort((a, b) => {
    for (const sort of sortBy) {
      if (a[sort.field] < b[sort.field]) {
        return sort.order === "ascending" ? -1 : 1;
      }
      if (a[sort.field] > b[sort.field]) {
        return sort.order === "ascending" ? 1 : -1;
      }
    }
    return 0;
  });

  return sortedProducts;
}

filterAndSortProducts(products, criteria);

module.exports = { filterAndSortProducts };
