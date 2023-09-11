import React, { useEffect, useState } from "react";

const Hometwo = () => {
  const [filters, setFilters] = useState({});

  const dataList = [
    {
      id: 1,
      name: "foo",
      category: "one",
      type: "A",
      action: "TRUE",
      city: "dallas",
      data: "abc",
    },

    {
      id: 2,
      name: "bar",
      category: "two",
      type: "B",
      action: "FALSE",
      city: "dallas",
    },
    {
      id: 3,
      name: "jim",
      category: "two",
      type: "B",
      action: "TRUE",
      city: "san francisco",
    },
    {
      id: 4,
      name: "jane",
      category: "two",
      type: "B",
      action: "FALSE",
      city: "denver",
      datatwo: "xyz",
    },
    {
      id: 5,
      name: "lee",
      category: "three",
      type: "C",
      action: "FALSE",
      city: "america",
    },
    {
      id: 6,
      name: "yexh",
      category: "three",
      type: "D",
      action: "FALSE",
      city: "america",
    },
    {
      id: 7,
      name: "alxe",
      category: "four",
      type: "D",
      action: "FALSE",
      city: "JAPAN",
    },
    {
      id: 8,
      name: "pepper",
      category: "four",
      type: "E",
      action: "TRUE",
      city: "JAPAN",
    },
    {
      id: 9,
      name: "blue",
      category: "five",
      type: "E",
      action: "TRUE",
      city: "xyz",
    },
    {
      id: 10,
      name: "blue",
      category: "five",
      type: "E",
      action: "FALSE",
      city: "xyz",
    },
    {
      id: 11,
      name: "blue",
      category: "five",
      type: "E",
      action: "FALSE",
      city: "xyz",
    },
  ];

  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState(dataList);

  useEffect(() => {
    const filteredData = dataList.filter((item) => {
      if (
        (!filters ||
          Object.values(filters).every(
            (filter) => !filter || filter.length === 0
          )) &&
        (searchText === "" ||
          item.name.toLowerCase().includes(searchText.toLowerCase()))
      ) {
        return true;
      }

      const conditions = [];

      getUniqKey(dataList).forEach((key) => {
        if (filters["selected" + key] && filters["selected" + key].length > 0) {
          conditions.push(filters["selected" + key].includes(item[key]));
        }
      });

      return (
        conditions.every((condition) => condition) &&
        item.name.toLowerCase().includes(searchText.toLowerCase())
      );
    });

    setData(filteredData);
  }, [filters, searchText]);

  const handleChange = (value, item, type) => {
    console.log(item, "itemm");
    if (!item) {
      setSearchText(value);
    }
    getUniqKey(dataList).forEach((key) => {
      if (type === key) {
        let keyname = "selected" + key;
        let selectedkeyvalue =
          filters && filters[keyname] ? [...filters[keyname]] : [];
        if (selectedkeyvalue.includes(item)) {
          let a = { ...filters };
          a[keyname] = selectedkeyvalue.filter((data) => data !== item);
          setFilters(a);
        } else {
          let a = { ...filters };
          a[keyname] =
            filters && filters[keyname] ? [...filters[keyname], item] : [item];
          setFilters(a);
        }
      }
    });
  };

  function getUniqKey(dataList) {
    let keys = [];
    dataList.forEach((element) => {
      Object.keys(element).forEach((key) => {
        keys.indexOf(key) < 0 && keys.push(key);
      });
    });
    return keys;
  }

  function filterUniqueValues(dataList, property) {
    let uniqvalue = [];
    dataList.forEach((element) => {
      element[property] &&
        uniqvalue.indexOf(element[property]) < 0 &&
        uniqvalue.push(element[property]);
    });
    return uniqvalue;
  }

  return (
    <div>
      <>
        <div>
          <table className="table">
            <thead>
              <tr>
                {getUniqKey(dataList).map((key) => (
                  <th scope="col">{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((item, i) => (
                <tr key={i}>
                  {getUniqKey(dataList).map((key) => (
                    <td scope="row">{item[key]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          Search:
          <input
            style={{ marginLeft: 5 }}
            type="text"
            placeholder="Type to search..."
            value={searchText}
            onChange={(e) => handleChange(e.target.value, null, "search")}
          />
        </div>
        <div className="d-flex ">
          {getUniqKey(dataList)
            .filter((key) => !(key == "id" || key == "name"))
            .map((key) => (
              <div className="p-5">
                <h1>{key}</h1>
                {filterUniqueValues(dataList, key).map((item) => (
                  <>
                    <div className="d-flex">
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          id="flexSwitchCheckDefault"
                          checked={
                            filters["selected" + key] &&
                            filters["selected" + key].includes[item[key]]
                          }
                          onChange={(e) => handleChange(e, item, key)}
                        />
                        <label className="form-check-label">{item}</label>
                      </div>
                    </div>
                  </>
                ))}
              </div>
            ))}
        </div>
      </>
    </div>
    //hello
  );
};

export default Hometwo;
