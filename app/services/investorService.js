// app/services/investorService.js

import { getToken } from "../utils/tokenManager";
// app/services/investorService.js
import axios from "axios";

const API = "http://localhost:5000/api/investors";

// ======================
// HOLDINGS
// ======================

export const fetchHoldings = async (investorId) => {
  try {
    const response = await axios.get(`${API}/${investorId}/holdings`, {
      headers: {
        Authorization: getToken(),
      },
    });

    return response.data;
  } catch (error) {
    console.log(error.response?.data);

    return [];
  }
};

// ======================
// NETWORTH
// ======================

export const fetchNetworth = async (investorId) => {
  try {
    const response = await axios.get(`${API}/${investorId}/networth`, {
      headers: {
        Authorization: getToken(),
      },
    });

    return response.data;
  } catch (error) {
    console.log(error.response?.data);

    return {
      total_networth: 0,
    };
  }
};
export const fetchInvestors = async () => {
  try {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    console.log("TOKEN:", token);

    const response = await fetch("http://localhost:5000/api/investors/INV001", {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const data = await response.json();

    console.log(data);

    if (!response.ok) {
      throw new Error("Failed to fetch investors");
    }

    return data;
  } catch (error) {
    console.log(error);

    return null;
  }
};
