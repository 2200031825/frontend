// services/authService.js

export const loginInvestor = async (
  email,
  password
) => {

  try {

    const response = await fetch(
      "http://localhost:5000/api/investors/login",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const data =
      await response.json();

    if (data.token) {

      document.cookie =
        `token=${data.token}; path=/`;
    }

    return data;

  } catch (error) {

    console.log(error);

    return null;
  }
};