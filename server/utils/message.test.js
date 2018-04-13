var expect = require("expect");
var {generateMessage} = require("./message");
describe("generateMessage", () => {
    it("should generate correct message object" , () => {
        var message = generateMessage("sathish@brillio.com", "This is for testing");
        expect(message.from).toBe("sathish@brillio.com");
        expect(message.text).toBe("This is for testing");
        expect(message.createdAt).toBeA("number");
    });
});