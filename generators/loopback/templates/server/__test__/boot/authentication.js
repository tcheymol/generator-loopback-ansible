const authentication = require('../../server/boot/authentication');

describe('authentication', () => {
  it('should enable server authentication', () => {
    const serverMock = {
      enableAuth: jest.fn()
    }
    authentication(serverMock);
    expect(serverMock.enableAuth).toHaveBeenCalled();
  });
});
