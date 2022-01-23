# Store API

[store-api](#) is a REST API built to serve [Peculiar stores](#). This is built with [express.js](#) (a lightweight [node.js](#) framework) and [mongoose](#) (a [MongoDB](#) ODM).

## Resources

There are three main resources:

-  Auth
-  Product
-  Cart

### Auth

The authentication resource has 2 main endpoints

-  Register <#/api/auth/register>
-  Login <#/api/auth/login>

#### Register

This is done by making a post request to <#/api/auth/register>. The request body can hold firstName, lastName, email, username, password, address, city, postalCode and country fields.
The firstName, lastName, email, username & password fields are required. If they are absent, a 400 error is returned.

```js
fetch("#/api/auth/register", {
   method: "POST",
   body: JSON.stringify({
      issue_title: "sample issue",
      issue_text: "sample issue text",
      created_by: "sample issue creator",
      assigned_to: "sample issue solver",
      status_text: "sample issue status",
      open: true,
   }),
})
   .then((res) => res.json())
   .then((json) => console.log(json));

/* will return
{
    "newIssue": {
        "issue_title": "sample issue",
        "issue_text": "sample issue text",
        "created_by": "sample issue creator",
        "open": true,
        "assigned_to": "sample issue solver",
        "status_text": "sample issue status",
        "project_name": "sample project",
        "_id": "sample issue id",
        "createdAt": "2021-10-30T20:42:36.420Z",
        "updatedAt": "2021-10-30T20:42:36.420Z",
        "__v": 0
    }
}

If any of all of the issue_title, issue_text or created_by fields are missing from the request body, a 400 error is returned with the following json object
{
    "error": "required field(s) missing"
}
*/
```
