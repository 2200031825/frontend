import { getToken } from "../utils/tokenManager";

// GET ALL SIPS
export const fetchSips = async () => {

    try {

        const token = getToken();

        const response = await fetch(
            "http://localhost:5000/api/sips",
            {
                headers: {
                    Authorization: token,
                },
            }
        );

        return await response.json();

    } catch (error) {

        console.log(error);

        return [];
    }
};

// CREATE SIP
export const createSip = async (sipData) => {

    try {

        const token = getToken();

        const response = await fetch(
            "http://localhost:5000/api/sips",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },

                body: JSON.stringify(sipData),
            }
        );

        return await response.json();

    } catch (error) {

        console.log(error);

        return null;
    }
};

// GET SINGLE SIP
export const fetchSip = async (sipId) => {

    try {

        const token = getToken();

        const response = await fetch(
            `http://localhost:5000/api/sips/${sipId}`,
            {
                headers: {
                    Authorization: token,
                },
            }
        );

        return await response.json();

    } catch (error) {

        console.log(error);

        return null;
    }
};

export const processSip =
  async (sipId) => {

    try {

      const token =
        getToken();

      const response =
        await fetch(
          `http://localhost:5000/api/sips/${sipId}/process`,
          {
            method: "POST",

            headers: {
              Authorization:
                token,
            },
          }
        );

      return await response.json();

    } catch (error) {

      console.log(error);
    }
};

// SIP TRANSACTIONS
export const fetchTransactions = async (sipId) => {

    try {

        const token = getToken();

        const response = await fetch(
            `http://localhost:5000/api/sips/${sipId}/transactions`,
            {
                headers: {
                    Authorization: token,
                },
            }
        );

        return await response.json();

    } catch (error) {

        console.log(error);

        return [];
    }
};