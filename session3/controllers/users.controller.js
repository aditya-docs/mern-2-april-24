const axios = require("axios");

const getUsers = async (req, res) => {
  const response = await axios.get(
    "https://gitlab.crio.do/public_content/node-js-sessions/-/raw/master/users.json"
  );
  res.json(response.data.data);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const response = await axios.get(
    "https://gitlab.crio.do/public_content/node-js-sessions/-/raw/master/users.json"
  );
  const reqUser = response.data.data.find((user) => user.login.uuid === id);
  reqUser
    ? res.json(reqUser)
    : res
        .status(404)
        .json({ message: `User with id: ${id} could not be found` });
};

const filterUsersByAge = (users, age) =>
  users.filter((user) => user.dob.age === age);
const filterUsersByGender = (users, gender) =>
  users.filter((user) => user.gender === gender);

const searchUser = async (req, res) => {
  const { gender, age } = req.query;
  const response = await axios.get(
    "https://gitlab.crio.do/public_content/node-js-sessions/-/raw/master/users.json"
  );

  let filteredUsers = [];
  if (gender && age) {
    filteredUsers = filterUsersByAge(response.data.data, parseInt(age));
    filteredUsers = filterUsersByGender(filteredUsers, gender);
  } else if (gender) {
    filteredUsers = filterUsersByGender(response.data.data, gender);
  } else if (age) {
    filteredUsers = filterUsersByAge(response.data.data, parseInt(age));
  } else {
    filteredUsers = response.data.data;
  }
  res.json(filteredUsers);
};

module.exports = { getUsers, getUserById, searchUser };
