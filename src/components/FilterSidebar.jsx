function FilterSidebar({
  selectedBrand,
  setSelectedBrand,
  sortBy,
  setSortBy,
}) {
  const brands = [
    "Apple",
    "Samsung",
    "Xiaomi",
    "OPPO",
    "Huawei",
  ];

  return (
    <div className="bg-white p-5 rounded-lg shadow-lg">

      <h2 className="text-2xl font-bold mb-5">
        Filters
      </h2>

      <h3 className="font-semibold mb-2">
        Brand
      </h3>

      <select
        value={selectedBrand}
        onChange={(e) =>
          setSelectedBrand(
            e.target.value
          )
        }
        className="w-full border p-2 rounded mb-5"
      >
        <option value="">
          All Brands
        </option>

        {brands.map((brand) => (
          <option
            key={brand}
            value={brand}
          >
            {brand}
          </option>
        ))}

      </select>

      <h3 className="font-semibold mb-2">
        Sort By
      </h3>

      <select
        value={sortBy}
        onChange={(e) =>
          setSortBy(
            e.target.value
          )
        }
        className="w-full border p-2 rounded"
      >
        <option value="">
          Default
        </option>

        <option value="low">
          Price Low → High
        </option>

        <option value="high">
          Price High → Low
        </option>

        <option value="rating">
          Highest Rating
        </option>

      </select>

    </div>
  );
}

export default FilterSidebar;