const mysql = require("mysql");

const values = [
  ["John", "Highway 71"],
  ["Peter", "Lowstreet 4"],
  ["Amy", "Apple st 652"],
  ["Hannah", "Mountain 21"],
  ["Michael", "Valley 345"],
  ["Sandy", "Ocean blvd 2"],
  ["Betty", "Green Grass 1"],
  ["Richard", "Sky st 331"],
  ["Susan", "One way 98"],
  ["Vicky", "Yellow Garden 2"],
  ["Ben", "Park Lane 38"],
  ["William", "Central st 954"],
  ["Chuck", "Main Road 989"],
  ["Viola", "Sideway 1633"],
];

// create connection to db
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "nodedb",
});

//Handles db creation
function createDB(dbname) {
  //Connects to db
  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected");

    //Creates a new db
    con.query(`CREATE DATABASE ${dbname}`, function (err, result) {
      if (err) return;
      console.log("db created");
    });
  });
}

//Creates a new table
function createTable() {
  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected");

    //Creates a new db
    const sqlQuery =
      "CREATE TABLE customers (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), address VARCHAR(255))";
    con.query(sqlQuery, function (err, result) {
      if (err) return;
      console.log("table created");
    });
  });
}

// Inserting 1 record to db
function insertOne(name, address) {
  con.connect(function (err) {
    if (err) throw err;
    console.log(`Connected to db: ${con.config.database}`);

    const sqlQuery = "INSERT INTO customers (name, address) VALUES (?, ?)";
    con.query(sqlQuery, [name, address], function (err, result) {
      if (err) throw err;
      console.log(
        `Inserted ${result.affectedRows} row(s) to db with id ${result.insertId}`
      );
    });
  });
}

// insertOne("test2", "test2");

//Inert many records to db
function insertMany(values) {
  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected to db");

    const sqlQuery = "INSERT INTO customers (name, address) VALUES ?";
    con.query(sqlQuery, [values], function (err, result) {
      if (err) throw err;
      console.log("Number of records inserted: " + result.affectedRows);
    });
  });
}

// insertMany(values);

// Retrive all record from db
function selectFromDb() {
  con.connect(function (err) {
    if (err) throw err;
    console.log(`Connected to db: ${con.config.database}`);

    const sqlQuery = `SELECT * FROM customers`;
    con.query(sqlQuery, function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });
  });
}

// Select a record in db by name
function selectByName(name) {
  con.connect(function (err) {
    if (err) throw err;
    console.log(`Connected to db: ${con.config.database}`);

    const sqlQuery = `SELECT * FROM customers WHERE name = "${name}"`;
    con.query(sqlQuery, function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });
  });
}

// selectByName("Betty");

// Wildcard select

function wildCardSelect(wilcard) {
  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected to db");

    const sqlQuery = `SELECT * FROM customers WHERE name LIKE '%${wilcard}%'`;

    con.query(sqlQuery, function (err, result) {
      if (err) throw err;
      console.log(result);
    });
  });
}

// wildCardSelect("It");

//  ORDERING RESULT
function orderBy(param) {
  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected to db");

    const sqlQuery = `SELECT * FROM customers ORDER BY ${param}`;
    con.query(sqlQuery, function (err, result) {
      if (err) throw err;

      console.log(result);
    });
  });
}

// orderBy("address");

function orderByASCorDESC(param, order) {
  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected to db");

    const sqlQuery = `SELECT ${param} FROM customers ORDER BY ${param} ${order}`;
    con.query(sqlQuery, function (err, result) {
      if (err) throw err;

      console.log(result);
    });
  });
}

// orderByASCorDESC("name", "ASC");

// Deletes record in db
function deleteRecord(param) {
  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected to db");

    const sqlQuery = `DELETE FROM customers WHERE id = ${param}`;
    con.query(sqlQuery, function (err, result) {
      if (err) throw err;
      console.log(result);
    });
  });
}

// deleteRecord(5);

// Update a record in db
//Change name
function updateById(id, value) {
  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected to db");

    const sqlQuery = `UPDATE customers SET name = "${value}" WHERE id = ${id}`;
    con.query(sqlQuery, function (err, result) {
      if (err) throw err;
      console.log(result);
    });
  });
}

function limitResult(limit, offset) {
  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected to db");

    const sqlQuery = `SELECT * FROM customers LIMIT ${offset}, ${limit}`;
    con.query(sqlQuery, function (err, result) {
      if (err) throw err;
      console.log(result);
    });
  });
}

limitResult(5, 2);
