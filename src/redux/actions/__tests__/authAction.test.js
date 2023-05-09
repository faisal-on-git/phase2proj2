import { login ,logout} from "../authAction";

describe("authAction", () => {
    it("should create an action to login", () => {
      const   expectedAction = {
            type: "LOGIN",
            payload: "John"
        };
        expect(login("John")).toEqual(expectedAction);
    }); 


    it("should create an action to logout",() =>{
        const expectedAction = {
            type: "LOGOUT",
        };
        expect(logout()).toEqual(expectedAction); 
    }
    );
});
