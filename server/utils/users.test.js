const expect = require("expect");

const {Users} = require("./users");



describe("Users", () => {
    var users;
    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: "12312",
            name : "Mike",
            room : "Node Course"
        }, {
            id: "453453",
            name : "Jen",
            room : "React"
        }, {
            id: "1276886312",
            name : "John",
            room : "Node Course"
        }];
    });
it("should add new user", () => {

    var users =new Users();
    var user = {
        id : "12312312",
        name : "Sathish",
        room : "Topaz"
    };
    var resUser = users.addUser(user.id,user.name,user.room);

    expect(users.users).toEqual([user]);
});

it("should remove a user", () => {
    var user = users.removeUser("12312");
    expect(user.id).toBe("12312");
    expect(users.users.length).toBe(2);
});

it("should not remove a user", () => {
    var user = users.removeUser("1231343");
    expect(user).toNotExist();
    expect(users.users.length).toBe(3);
});

it("should get a user", () => {
    var user = users.getUser("453453");
    expect(user.id).toBe("453453");
});

it("should not get a user", () => {
    var user = users.getUser("453453123");
    expect(user).toNotExist();
});
it("should return names of node course", () => {
   var userList = users.getUserList("Node Course");
   
   expect(userList).toEqual(["Mike","John"]);

}); 

it("should return names of React course", () => {
    var userList = users.getUserList("React");
    
    expect(userList).toEqual(["Jen"]);
 
 }); 

});