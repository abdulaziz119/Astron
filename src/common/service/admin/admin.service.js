const Admin = {
  phone_number: "996428268",
  password: "996428268",
};

export async function createAdminService(data) {
  try {
    const { phone_number, password } = Admin;
    if (data.phone_number === phone_number && data.password === password) {
      return Admin;
    } else {
      throw new Error("The administrator information is incorrect");
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}
