import request from "request-promise";
import * as Provider from "../services/userrepoinfo/providers/userRepoBranchesProvider";

jest.mock("request-promise");

describe("userRepoBranchesProvider", () => {
  test("an empty query string", async () => {
    (request as any).mockImplementation(() => '[]');
    const result = await Provider.getUserRepoBranches("abhisheksinha86","test");
    expect(result).toEqual([]);
  });

  test("an invalid non-json response", async () => {
    (request as any).mockImplementation(() => "Service Unavailable.");
    expect(Provider.getUserRepoBranches("abhisheksinha86","test")).rejects.toThrow(SyntaxError);
  });
});
