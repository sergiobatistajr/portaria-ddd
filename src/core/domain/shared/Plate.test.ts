import Apartment from "./Apartment"

describe("Apartment", () => {
  describe("validate", () => {
    it("should throw an error for an invalid apartment", () => {
      expect(() => Apartment.validate(4)).toThrow("Apartamento inválido")
    })
    it("should return the apartment for a valid apartment", () => {
      expect(Apartment.validate(1)).toBe(1)
    })
  })
})
