// test/recentlyViewed.test.js
const request = require("supertest");
const app = require("../index"); //

describe("Recently Viewed API", () => {
  test("GET /api/v1/users/recentlyViewed/:userId", async () => {
    const userId = "0xAmkeMwPgJ6XyaRez1q";  //userId

    const res = await request(app).get(`/api/v1/users/recentlyViewed/${userId}`);

    expect(res.statusCode).toBe(200);

    expect(Array.isArray(res.body)).toBeTruthy();

    expect(res.body[0]).toHaveProperty('productId');
    expect(res.body[0]).toHaveProperty('title');
  });
});
