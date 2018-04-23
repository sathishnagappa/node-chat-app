const expect = require("expect");
const {isRealString} = require("./validation");

describe("String validation", () => {
    it("should reject non string values" , () => {
      expect(isRealString(10)).toBe(false);
    });
    it("should reject string with only spaces" , () => {
        expect(isRealString("    ")).toBe(false);
    });
    it("should generate correct message object" , () => {
        expect(isRealString("Yakozona")).toBe(true);
    });
});