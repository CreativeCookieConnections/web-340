/**
 * Author: Aisha Keller
 * Date: 11/28/2025
 * File Name: server.spec.js
 * Description: Test suite for the fantasy game character creation server.
 */

const http = require('http');
const server = require('../src/server');

// Implementing the Tests

describe('Fantasy Game Character Creation Server', () => {
  afterAll((done) => {
    server.close(done);
  });

  describe('POST /create-character', () => {
    it('should create a new character with valid query parameters', (done) => {
      const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/create-character?class=Warrior&gender=Male&funFact=Loves%20dragons',
        method: 'POST'
      };

      const req = http.request(options, (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          expect(res.statusCode).toBe(201);
          const response = JSON.parse(data);
          expect(response).toHaveProperty('message');
          expect(response).toHaveProperty('character');
          expect(response.character.class).toBe('Warrior');
          expect(response.character.gender).toBe('Male');
          expect(response.character.funFact).toBe('Loves dragons');
          done();
        });
      });

      req.on('error', (error) => {
        done(error);
      });

      req.end();
    });

    it('should return 400 for missing query parameters', (done) => {
      const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/create-character?class=Warrior',
        method: 'POST',
      };

      const req = http.request(options, (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          expect(res.statusCode).toBe(400);
          const response = JSON.parse(data);
          expect(response).toHaveProperty('error');
          done();
        });
      });

      req.on('error', (error) => {
        done(error);
      });

      req.end();
    });

    it('should return 400 for invalid character class', (done) => {
      const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/create-character?class=Wizard&gender=Female&funFact=Test',
        method: 'POST',
      };

      const req = http.request(options, (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          expect(res.statusCode).toBe(400);
          const response = JSON.parse(data);
          expect(response).toHaveProperty('error');
          done();
        });
      });

      req.on('error', (error) => {
        done(error);
      });

      req.end();
    });
  });

  describe('POST /confirm-character', () => {
    beforeEach((done) => {
      // Create a character first
      const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/create-character?class=Rogue&gender=Other&funFact=Silent%20but%20deadly',
        method: 'POST',
      };

      const req = http.request(options, (res) => {
        res.on('data', () => { });
        res.on('end', () => {
          done();
        });
      });

      req.on('error', (error) => {
        done(error);
      });

      req.end();
    });

    it('should confirm the created character', (done) => {
      const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/confirm-character',
        method: 'POST',
      };

      const req = http.request(options, (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          expect(res.statusCode).toBe(200);
          const response = JSON.parse(data);
          expect(response).toHaveProperty('message');
          expect(response.message).toContain('confirmed');
          done();
        });
      });

      req.on('error', (error) => {
        done(error);
      });

      req.end();
    });

    it('should return 400 if no character exists', (done) => {
      // First, clear any existing character by creating and confirming
      const clearOptions = {
        hostname: 'localhost',
        port: 3000,
        path: '/confirm-character',
        method: 'POST',
      };

      const clearReq = http.request(clearOptions, (clearRes) => {
        clearRes.on('data', () => { });
        clearRes.on('end', () => {
          // Now try to confirm again when no character exists
          const options = {
            hostname: 'localhost',
            port: 3000,
            path: '/confirm-character',
            method: 'POST',
          };

          const req = http.request(options, (res) => {
            let data = '';

            res.on('data', (chunk) => {
              data += chunk;
            });

            res.on('end', () => {
              expect(res.statusCode).toBe(400);
              const response = JSON.parse(data);
              expect(response).toHaveProperty('error');
              done();
            });
          });

          req.on('error', (error) => {
            done(error);
          });

          req.end();
        });
      });

      clearReq.on('error', (error) => {
        done(error);
      });

      clearReq.end();
    });
  });

  describe('GET /view-character', () => {
    beforeEach((done) => {
      // Create a character first
      const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/create-character?class=Mage&gender=Female&funFact=Master%20of%20fire%20magic',
        method: 'POST',
      };

      const req = http.request(options, (res) => {
        res.on('data', () => { });
        res.on('end', () => {
          done();
        });
      });

      req.on('error', (error) => {
        done(error);
      });

      req.end();
    });

    it('should return the created character', (done) => {
      const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/view-character',
        method: 'GET',
      };

      const req = http.request(options, (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          expect(res.statusCode).toBe(200);
          const response = JSON.parse(data);
          expect(response).toHaveProperty('character');
          expect(response.character.class).toBe('Mage');
          expect(response.character.gender).toBe('Female');
          expect(response.character.funFact).toBe('Master of fire magic');
          done();
        });
      });

      req.on('error', (error) => {
        done(error);
      });

      req.end();
    });

    it('should return 404 if no character exists', (done) => {
      // First, confirm the character to clear it
      const confirmOptions = {
        hostname: 'localhost',
        port: 3000,
        path: '/confirm-character',
        method: 'POST',
      };

      const confirmReq = http.request(confirmOptions, (confirmRes) => {
        confirmRes.on('data', () => { });
        confirmRes.on('end', () => {
          // Now try to view the character when none exists
          const options = {
            hostname: 'localhost',
            port: 3000,
            path: '/view-character',
            method: 'GET',
          };

          const req = http.request(options, (res) => {
            let data = '';

            res.on('data', (chunk) => {
              data += chunk;
            });

            res.on('end', () => {
              expect(res.statusCode).toBe(404);
              const response = JSON.parse(data);
              expect(response).toHaveProperty('error');
              done();
            });
          });

          req.on('error', (error) => {
            done(error);
          });

          req.end();
        });
      });

      confirmReq.on('error', (error) => {
        done(error);
      });

      confirmReq.end();
    });
  });

  describe('Error handling', () => {
    it('should return 404 for unknown routes', (done) => {
      const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/unknown-route',
        method: 'GET',
      };

      const req = http.request(options, (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          expect(res.statusCode).toBe(404);
          const response = JSON.parse(data);
          expect(response).toHaveProperty('error');
          done();
        });
      });

      req.on('error', (error) => {
        done(error);
      });

      req.end();
    });
  });
});