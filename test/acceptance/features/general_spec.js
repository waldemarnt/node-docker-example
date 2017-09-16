describe('NEO management', () => {
  let request;
  before(async function() {
    const app = await setupApp();
    request = supertest(app);
  });

  describe('route /', () => {
    describe('when a GET request is done to / endpoint', () => {
      it('should respond with Hello world', done => {

        request
          .get('/')
          .end((err, res) => {
            expect(res.body).to.eql({'hello':'world!'});
            done(err);
          });
      });
    });
  });

});
