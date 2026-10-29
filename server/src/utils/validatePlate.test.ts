import { describe, expect, it } from "vitest";
import { isValidPlate, normalizePlate } from "./validatePlate";

describe("validatePlate", () => {
  it("normaliserer mellomrom og små bokstaver", () => {
    expect(normalizePlate(" eb 11111 ")).toBe("EB11111");
  });

  it.each(["EB11111", "eb 11111", "AB1234", "KAI", "OL"])("godtar %s", (plate) => {
    expect(isValidPlate(plate)).toBe(true);
  });

  it.each(["", " ", "A", "AB123456", "EB-11111"])("avviser %j", (plate) => {
    expect(isValidPlate(plate)).toBe(false);
  });
});
