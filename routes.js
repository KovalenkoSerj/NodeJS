const fs = require("fs");

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/users") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head>");
    res.write("<title>Enter Message</title>");
    res.write("</head>");
    res.write(
      '<body><ul><li>User1</li><li>User1</li><li>User1</li><a href="/">Back</a></ul></body>'
    );
    res.write("<html>");
    return res.end();
  }
  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head>");
    res.write("<title>My First Page</title>");
    res.write("</head>");
    res.write(
      '<body><h1>Hello from nodejs server</h1><form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">submit</button></form><a href="/users">User List</a></body>'
    );
    res.write("<html>");
    return res.end();
  }

  if (url === "/create-user" && method === 'POST') {
    const body = [];
    req.on("data", chunk => {
      body.push(chunk);
    });
     req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody)
      const message = parsedBody.split("=")[1];
      fs.writeFile("user.txt", message, err => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        console.log(message)
        return res.end();
      });
    });
  }
};

module.exports = requestHandler;
