/* eslint-disable */
const date = new Date();
const y = date.getFullYear();
const m = date.getMonth();

const paramsObj = {
  month: {
    start: new Date(new Date(y, m, 1)).toISOString(),
    end: new Date(new Date(y, m + 1, 0)).toISOString(),
  },
  year: {
    start: new Date(new Date(y, 1, 1)).toISOString(),
    end: new Date(new Date(y, 12, 31)).toISOString(),
  },
  day: {
    start: new Date(new Date().setUTCHours(0, 0, 0, 0)).toISOString(),
    end: new Date(new Date().setUTCHours(23, 59, 59, 999)).toISOString(),
  },
};

const objectToQueryString = (obj) => {
  return Object.keys(obj)
    .map((key) => key + '=' + obj[key])
    .join('&');
};

const fetchData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const generateTableHead = (table, data) => {
  let thead = table.createTHead();
  let row = thead.insertRow();
  for (let key of data) {
    let th = document.createElement('th');
    let text = document.createTextNode(key);
    th.appendChild(text);
    row.appendChild(th);
  }
};

const generateTable = (table, data) => {
  for (let element of data) {
    let row = table.insertRow();
    for (key in element) {
      let cell = row.insertCell();
      let text = document.createTextNode(element[key]);
      cell.appendChild(text);
    }
  }
};

const getProductStats = async (params) => {
  let url = '/admin/orders/productStats';
  if (params) {
    url += '?' + objectToQueryString(params);
  }
  let productStats = await fetchData(url);

  let table = document.querySelector('#productStat');
  if (productStats.length) {
    let data = ['Product', 'Count'];
    generateTableHead(table, data);
    generateTable(table, productStats);
  }
};

const getTotalOrderPrice = async (params) => {
  let url = '/admin/orders/orderstats';
  if (params) {
    url += '?' + objectToQueryString(params);
  }
  let productStats = await fetchData(url);

  let table = document.querySelector('#orderStat');
  if (productStats.length) {
    let data = ['Sum Of All Orders', 'Total Orders'];
    generateTableHead(table, data);
    productStats = productStats.map((item) => {
      return {
        total: item.order_totalPrice,
        count: item.count,
      };
    });

    generateTable(table, productStats);
  }
};

const getOrderCustomers = async (params) => {
  let url = '/admin/orders/customerstats';
  if (params) {
    url += '?' + objectToQueryString(params);
  }
  let productStats = await fetchData(url);

  let table = document.querySelector('#customerStat');
  if (productStats.length) {
    let data = ['Customer', 'Total Orders'];
    generateTableHead(table, data);
    productStats = productStats.map((item) => {
      return {
        name: item._id.name[0],
        count: item.count,
      };
    });
    generateTable(table, productStats);
  }
};

const init = () => {
  getProductStats(paramsObj.month);
  getOrderCustomers(paramsObj.month);
  getTotalOrderPrice(paramsObj.month);
};
init();

const clearTables = () => {
  document.querySelector('#customerStat').innerHTML = "";
  document.querySelector('#orderStat').innerHTML = "";
  document.querySelector('#productStat').innerHTML = "";
}
const getStats = (e) => {
  const params = paramsObj[e.value];
  clearTables();
  getProductStats(params);
  getOrderCustomers(params);
  getTotalOrderPrice(params);
}