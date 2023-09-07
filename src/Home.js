import React, { useEffect, useState } from "react";

const Home = () => {
  const [filters, setFilters] = useState({
    selectedCate: [],
    selectedCity: [],
    selectedType: [],
    selectedActive: [],
  });

  const dataList = [
    {
      id: 1,
      name: "cerulean",
      catagory: "one",
      type: "A",
      action: "TRUE",
      city: "abc",
    },
    {
      id: 111,
      name: "hello thare",
      catagory: "one",
      type: "A",
      action: "FALSE",
      city: "abc",
    },
    {
      id: 2,
      name: "fuchsia rose",
      catagory: "two",
      type: "A",
      action: "TRUE",
      city: "abc",
    },
    {
      id: 3,
      name: "true red",
      catagory: "two",
      type: "B",
      action: "TRUE",
      city: "xyz",
    },
    {
      id: 4,
      name: "aqua sky",
      catagory: "two",
      type: "B",
      action: "FALSE",
      city: "xyz",
    },
    {
      id: 5,
      name: "tigerlily",
      catagory: "three",
      type: "C",
      action: "FALSE",
      city: "pqr",
    },
    {
      id: 6,
      name: "blue turquoise",
      catagory: "three",
      type: "D",
      action: "FALSE",
      city: "pqr",
    },
    {
      id: 7,
      name: "sand dollar",
      catagory: "four",
      type: "D",
      action: "FALSE",
      city: "opn",
    },
    {
      id: 8,
      name: "chili pepper",
      catagory: "four",
      type: "E",
      action: "TRUE",
      city: "opn",
    },
    {
      id: 9,
      name: "blue iris",
      catagory: "five",
      type: "E",
      action: "TRUE",
      city: "qwe",
    },
    {
      id: 10,
      name: "mimosa",
      catagory: "five",
      type: "E",
      action: "TRUE",
      city: "qwe",
    },
  ];

  const filterDataFuncation = (dataList, filters) => {
    return dataList.filter((item) => {
      if (
        !filters ||
        Object.values(filters).every((filter) => !filter || filter.length === 0)
      ) {
        return true;
      }

      const conditions = [];

      if (filters.selectedCate && filters.selectedCate.length > 0) {
        conditions.push(filters.selectedCate.includes(item.catagory));
      }

      if (filters.selectedCity && filters.selectedCity.length > 0) {
        conditions.push(filters.selectedCity.includes(item.city));
      }

      if (filters.selectedType && filters.selectedType.length > 0) {
        conditions.push(filters.selectedType.includes(item.type));
      }

      if (filters.selectedActive && filters.selectedActive.length > 0) {
        conditions.push(filters.selectedActive.includes(item.action));
      }

      if (conditions.length === 0) {
        return true;
      }

      return conditions.every((condition) => condition);
    });
  };
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState(dataList);
  useEffect(() => {
    let filteredData = filterDataFuncation(dataList, filters);
    const searchVal = searchText.toLowerCase().trim();
    if (searchText !== "") {
      filteredData = dataList.filter((item) => {
        if (item.name.toLowerCase().includes(searchVal.toLowerCase())) {
          return item;
        }
      });
    }
    setData(filteredData);
  }, [filters, searchText]);

  const handleChange = (value, item, type) => {
    if (!item) {
      setSearchText(value);
    }
    if (type === "city") {
      let selectedCityCopy = [...filters.selectedCity];
      if (selectedCityCopy.includes(item.city)) {
        setFilters({
          ...filters,
          selectedCity: selectedCityCopy.filter((data) => data !== item.city),
        });
      } else {
        setFilters({
          ...filters,
          selectedCity: [...filters.selectedCity, item.city],
        });
      }
    }
    if (type === "catagory") {
      let selectedCateCopy = [...filters.selectedCate];
      if (selectedCateCopy.includes(item.catagory)) {
        setFilters({
          ...filters,
          selectedCate: selectedCateCopy.filter(
            (data) => data !== item.catagory
          ),
        });
      } else {
        setFilters({
          ...filters,
          selectedCate: [...filters.selectedCate, item.catagory],
        });
      }
    }
    if (type === "type") {
      let selectedTypeCopy = [...filters.selectedType];
      if (selectedTypeCopy.includes(item.type)) {
        setFilters({
          ...filters,
          selectedType: selectedTypeCopy.filter((data) => data !== item.type),
        });
      } else {
        setFilters({
          ...filters,
          selectedType: [...filters.selectedType, item.type],
        });
      }
    }
    if (type === "action") {
      let selectedActiveCopy = [...filters.selectedActive];
      if (selectedActiveCopy.includes(item.action)) {
        setFilters({
          ...filters,
          selectedActive: selectedActiveCopy.filter(
            (data) => data !== item.action
          ),
        });
      } else {
        setFilters({
          ...filters,
          selectedActive: [...filters.selectedActive, item.action],
        });
      }
    }
  };

  const cityfilter = dataList.map(({ city }) => city);
  const filteredcity = dataList.filter(
    ({ city }, index) => !cityfilter.includes(city, index + 1)
  );
  const catagoryfilter = dataList.map(({ catagory }) => catagory);
  const filteredcatagory = dataList.filter(
    ({ catagory }, index) => !catagoryfilter.includes(catagory, index + 1)
  );
  const actionfilter = dataList.map(({ action }) => action);
  const filteredaction = dataList.filter(
    ({ action }, index) => !actionfilter.includes(action, index + 1)
  );
  const typefilter = dataList.map(({ type }) => type);
  const filteredtype = dataList.filter(
    ({ type }, index) => !typefilter.includes(type, index + 1)
  );

  return (
    <>
      <div>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">name</th>
              <th scope="col">catagory</th>
              <th scope="col">type</th>
              <th scope="col">city</th>
              <th scope="col">action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => (
              <tr key={i}>
                <th scope="row">{item.id}</th>
                <td>{item.name}</td>
                <td>{item.catagory}</td>
                <td>{item.type}</td>
                <td>{item.city}</td>
                <td>{item.action}</td>
              </tr>
            ))}
          </tbody>
        </table>
        Search:{" "}
        <input
          style={{ marginLeft: 5 }}
          type="text"
          placeholder="Type to search..."
          value={searchText}
          onChange={(e) => handleChange(e.target.value, null, "search")}
        />
      </div>
      <div className="d-flex ">
        <div>
          <h1>city</h1>
          {filteredcity.map((item) => (
            <>
              <div className="d-flex">
                <div class="form-check form-switch">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckDefault"
                    checked={filters.selectedCity.includes[item.city]}
                    onChange={(e) => handleChange(e, item, "city")}
                  />
                  <label class="form-check-label" for="flexSwitchCheckDefault">
                    {item.city}
                  </label>
                </div>
              </div>
            </>
          ))}
        </div>
        <div className="ms-4">
          <h1>catagory</h1>
          {filteredcatagory.map((item) => (
            <>
              <div className="d-flex">
                <div class="form-check form-switch">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckDefault"
                    checked={filters.selectedCate.includes[item.catagory]}
                    onChange={(e) => handleChange(e, item, "catagory")}
                  />
                  <label class="form-check-label" for="flexSwitchCheckDefault">
                    {item.catagory}
                  </label>
                </div>
              </div>
            </>
          ))}
        </div>
        <div className="ms-4">
          <h1>action</h1>
          {filteredaction.map((item) => (
            <>
              <div className="d-flex">
                <div class="form-check form-switch">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckDefault"
                    checked={filters.selectedActive.includes[item.action]}
                    onChange={(e) => handleChange(e, item, "action")}
                  />
                  <label class="form-check-label" for="flexSwitchCheckDefault">
                    {item.action}
                  </label>
                </div>
              </div>
            </>
          ))}
        </div>
        <div className="ms-4">
          <h1>type</h1>
          {filteredtype.map((item) => (
            <>
              <div className="d-flex">
                <div class="form-check form-switch">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckDefault"
                    checked={filters.selectedType.includes[item.type]}
                    onChange={(e) => handleChange(e, item, "type")}
                  />
                  <label class="form-check-label" for="flexSwitchCheckDefault">
                    {item.type}
                  </label>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
