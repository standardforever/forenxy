const { mySqlClient } = require('../utils/database')


/**
 * User - Table for user record
 */

const User = `
    CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(120) NOT NULL,
        email VARCHAR(255) NOT,
        password VARCHAR(255) NOT NULL,
        token VARCHAR(255) NOT NULL,
        firstName VARCHAR(255) NOT NULL DEFAULT 'N',
        lastName VARCHAR(255) NOT NULL  DEFAULT 'N',
        dateOfBirth VARCHAR(255) NOT NULL DEFAULT 'N',
        country VARCHAR(255) NOT NULL DEFAULT 'N',
        streetAdress VARCHAR(255) NOT NULL DEFAULT 'N',
        zipCode VARCHAR(255) NOT NULL DEFAULT 'N',
        state VARCHAR(255) NOT NULL DEFAULT 'N',
        city VARCHAR(255) NOT NULL DEFAULT 'N',
        aptUnit VARCHAR(255) NOT NULL DEFAULT 'N',
        phoneNumber VARCHAR(20) NOT NULL DEFAULT 'N',
        emailIsActivated BOOLEAN DEFAULT FALSE,
        phoneIsActivated BOOLEAN DEFAULT FALSE, 
        detailIsActivated BOOLEAN DEFAULT FALSE,
        createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        UNIQUE KEY (id)
    )
`;




// async () => (await mySqlClient('localhost', 'forenxy_user', 'forenxy_pwd', 'forenxy').create_table(User))