# Active Directory Phone Book

Phone Book with information about employees base on Active Directory.
Using JavaScript, Node.js and MongoDB.

#### In progress! Not adaptive yet!
###### Work in combination with Active Directory!

# Config

You mast connect your AD using connect.js in folder connect.
#### Write your domain name, accaunt and password.
--------------

```js
module.exports = {
    url: 'ldap://dn.com',
    baseDN: 'ou=Staff,dc=dn,dc=com',
    username: 'dn.svc.pb',
    password: 'pass',
    attributes: {
        user: [
            'dn',
            'sAMAccountName', 'mail', 'cn', 'displayName',
            'telephoneNumber', 'physicalDeliveryOfficeName'
        ],
        group: [
            'dn', 'cn', 'description'
        ]
    }
};
```

# Home Page

You can create your own home page list. Fill people.json in folder config and start createDB.js.
####A person object must consider next field:
--------------

```js
{
	"displayName": "Name1",
	"physicalDeliveryOfficeName": "OfficeName1",
	"telephoneNumber": "+380623811648"
}
```
