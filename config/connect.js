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
