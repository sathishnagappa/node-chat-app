var expect = require("expect");

var {generateMessage, generateLocationMessage} = require("./message");
describe("generateMessage", () => {
    it("should generate correct message object" , () => {
        var message = generateMessage("sathish@brillio.com", "This is for testing");
        expect(message.from).toBe("sathish@brillio.com");
        expect(message.text).toBe("This is for testing");
        expect(message.createdAt).toBeA("number");
    });
});

describe("generateLocationMessage", () => {
    it("should generate correct location object" , () => { 
        var url = "https://www.google.com/maps?q=12,77";
        var message = generateLocationMessage("sathish@brillio.com",12, 77);
        expect(message.from).toBe("sathish@brillio.com");
        expect(message.url).toBe(url);
        expect(message.createdAt).toBeA("number");

    });
}); 