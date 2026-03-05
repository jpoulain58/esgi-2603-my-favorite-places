import { getDistance } from "../../utils/getDistance";

describe("getDistance", () => {
  it("should calculate distance between two points (Paris to Lyon)", () => {
    // Paris coordinates
    const paris = { lat: 48.8566, lng: 2.3522 };
    // Lyon coordinates
    const lyon = { lat: 45.7642, lng: 4.8357 };

    const distance = getDistance(paris, lyon);

    // Expected distance is approximately 392 km
    // Allow small margin for floating point errors
    expect(distance).toBeGreaterThan(390);
    expect(distance).toBeLessThan(395);
  });

  it("should return 0 for the same point", () => {
    const point = { lat: 48.8566, lng: 2.3522 };
    const distance = getDistance(point, point);

    expect(distance).toBe(0);
  });

  it("should work with opposite points (equator edge case)", () => {
    const point1 = { lat: 0, lng: 0 };
    const point2 = { lat: 0, lng: 180 };

    const distance = getDistance(point1, point2);

    // Half the earth's circumference (~20,000 km)
    expect(distance).toBeGreaterThan(19900);
    expect(distance).toBeLessThan(20100);
  });

  it("should be symmetric (distance A->B equals B->A)", () => {
    const pointA = { lat: 51.5074, lng: -0.1278 }; // London
    const pointB = { lat: 48.8566, lng: 2.3522 }; // Paris

    const distanceAB = getDistance(pointA, pointB);
    const distanceBA = getDistance(pointB, pointA);

    expect(distanceAB).toBeCloseTo(distanceBA, 5);
  });
});
