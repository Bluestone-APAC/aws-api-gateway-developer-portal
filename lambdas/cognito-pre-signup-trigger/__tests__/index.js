const index = require('../index')

describe('Cognito pre-signup trigger', () => {
  test('should always confirm users with a DigiFi email', async () => {
    const event = {
      userName: 'username',
      request: { userAttributes: { email: 'brad@digifi.io' } }
    }
    const result = await index.handler(event)
    expect(result).toEqual(event)
  })

  test('should always confirm users with a bluestone email', async () => {
    const event = {
      userName: 'username',
      request: { userAttributes: { email: 'alex.brown@bluestone.com.au' } }
    }
    const result = await index.handler(event)
    expect(result).toEqual(event)
  })

  test('should reject users with no emails', async () => {
    const event = {
      userName: 'username',
      request: { userAttributes: {} }
    }
    expect(index.handler(event)).rejects.toThrow('Email is required.')
  })

  test('should reject users with invalid emails', async () => {
    const event = {
      userName: 'username',
      request: { userAttributes: { email: 'username' } }
    }
    expect(index.handler(event)).rejects.toThrow('Email is invalid.')
  })

  test('should reject users with non DigiFi, Bluestone emails', async () => {
    const event = {
      userName: 'username',
      request: { userAttributes: { email: 'username@example.com' } }
    }
    expect(index.handler(event)).rejects.toThrow('Email is invalid.')
  })
})
