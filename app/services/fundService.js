import { getToken } from "../utils/tokenManager";

export const fetchFunds =
  async () => {

    try {

      const token =
        getToken();

      const response =
        await fetch(
          "http://localhost:5000/api/funds",
          {
            headers: {
              Authorization:
                token,
            },
          }
        );

      return await response.json();

    } catch (error) {

      console.log(error);

      return [];
    }
};

export const createFund =
  async (data) => {

    try {

      const token =
        getToken();

      const response =
        await fetch(
          "http://localhost:5000/api/funds",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",

              Authorization:
                token,
            },

            body: JSON.stringify(
              data
            ),
          }
        );

      return await response.json();

    } catch (error) {

      console.log(error);
    }
};