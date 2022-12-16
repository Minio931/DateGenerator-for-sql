const fs = require("fs");

const content = "Hello World";

const year = ["2019", "2020", "2021", "2022"];
const month = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];
const day = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "31",
];

const sqlQuieries = [];

const randomDate = () => {
  const randomYear = year[Math.floor(Math.random() * year.length)];
  const randomMonth = month[Math.floor(Math.random() * month.length)];
  let randomDay = day[Math.floor(Math.random() * day.length)];

  if (
    randomMonth === "02" &&
    day.indexOf(randomDay) >= 28 &&
    day.indexOf(randomDay) <= 30
  ) {
    randomDay = "28";
  }

  if (
    (randomMonth === "04" ||
      randomMonth === "06" ||
      randomMonth === "09" ||
      randomMonth === "11") &&
    randomDay === "31"
  ) {
    randomDay = "30";
  }
  const date = `${randomYear}-${randomMonth}-${randomDay}`;
  return date;
};

const createDates = (orderDate) => {
  const parsedOrder = new Date(orderDate);

  let newDate = new Date(
    parsedOrder.setDate(
      parsedOrder.getDate() + Math.floor(Math.random() * 7) + 1
    )
  );
  let month =
    newDate.getMonth() + 1 < 10
      ? `0${newDate.getMonth() + 1}`
      : newDate.getMonth() + 1;

  const realizationDate = `${newDate.getFullYear()}-${month}-${newDate.getDate()}`;

  newDate = new Date(
    newDate.setDate(newDate.getDate() + Math.floor(Math.random() * 7) + 1)
  );

  month =
    newDate.getMonth() + 1 < 10
      ? `0${newDate.getMonth() + 1}`
      : newDate.getMonth() + 1;

  const shippingDate = `${newDate.getFullYear()}-${month}-${newDate.getDate()}`;

  const dates = [orderDate, realizationDate, shippingDate];
  return dates;
};

for (let i = 1; i <= 450; i++) {
  const date = randomDate();
  const [orderDate, realizationDate, shippingDate] = createDates(date);

  const sql = `UPDATE Zamowienia_Sklep SET data_zlozenia_zamowienia='${orderDate}', data_przyjecia_zamowienia='${realizationDate}', data_wyslania_zamowienia='${shippingDate}' WHERE id_zamówienia=${i}`;
  sqlQuieries.push(sql);
}
console.log(sqlQuieries);

const file = fs.createWriteStream("sqlupdate2.txt");
file.on("error", (err) => {
  console.log(err);
});

sqlQuieries.forEach((item) => {
  file.write(item + "\n");
});

file.end();
