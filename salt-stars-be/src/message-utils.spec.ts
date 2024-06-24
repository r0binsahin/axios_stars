import { getMessage } from './message-utils'

describe('getMessage()', () => {
  it('should return the correct message when called', () => {
    expect(getMessage()).toBe('Hello salt by Ahsan!')
  });
})
