const axios = require("axios");

const downloadUsersJson = async () => {
  const response = await axios.get("https://gitlab.crio.do/public_content/node-js-sessions/-/raw/master/users.json");
  return response.data.data
}

const getUsers = async (req, res) => {
  return res.json(await downloadUsersJson());
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const response = await downloadUsersJson()
  const reqUser = response.find((user) => user.login.uuid === id);
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

// const searchUser = async (req, res) => {
//   const { gender, age } = req.query;
//   if (!age && !gender) {
//     return res.status(422).json({
//       message: "Missing Search Parameters, search using age and/or gender",
//     });
//   }
//   const allowedGenders = ["female", "male"]
//   const response = await downloadUsersJson()
//   let filteredUsers = [];
//   if (gender && age) {
//     if(isNaN(parseInt(age))){
//       return res.status(422).send("Age parameter should be a number")
//     }
//     if(age<0 || age>100){
//       return res.status(422).send("Age out of bounds. It should be a number between 0 and 100")
//     }
//     filteredUsers = filterUsersByAge(response, parseInt(age));
//     if(!allowedGenders.includes(gender)){
//       return res.status(422).send("Gender to search can either be 'male' or 'female'")
//     }
//     filteredUsers = filterUsersByGender(filteredUsers, gender);
//   } else if (gender) {
//     if(!allowedGenders.includes(gender)){
//       return res.status(422).send("Gender to search can either be 'male' or 'female'")
//     }
//     filteredUsers = filterUsersByGender(response, gender);
//   } else if (age) {
//     if(isNaN(parseInt(age))){
//       return res.status(422).send("Age parameter should be a number")
//     }
//     if(age<0 || age>100){
//       return res.status(422).send("Age out of bounds. It should be a number between 0 and 100")
//     }
//     filteredUsers = filterUsersByAge(response, parseInt(age));
//   } else {
//     filteredUsers = response;
//   }
//   return res.json(filteredUsers);
// };

const searchUser = async (req, res) => {
  const { gender, age } = req.query;
  const response = await downloadUsersJson()

  let filteredUsers = [];
  if (gender && age) {
    filteredUsers = filterUsersByAge(response, parseInt(age));
    filteredUsers = filterUsersByGender(filteredUsers, gender);
  } else if (gender) {
    filteredUsers = filterUsersByGender(response, gender);
  } else if (age) {
    filteredUsers = filterUsersByAge(response, parseInt(age));
  } else {
    filteredUsers = response;
  }
  return res.json(filteredUsers);
};

module.exports = { getUsers, getUserById, searchUser };
