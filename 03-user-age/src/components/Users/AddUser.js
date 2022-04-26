import Card from "../UI/Card";

const AddUser = (props) => {
  const addUserHandler = (event) => {
    event.preventDefault();
  };

  return (
    <Card className="add-user">
      <form onSubmit={addUserHandler}>
        <label htmlFor="username">Username</label>
        <input id="username" type="text" />
        <label htmlFor="age">Age (Years)</label>
        <input id="age" type="number" />
        <label htmlFor=""></label>
        <button type="submit">Add User</button>
      </form>
    </Card>
  );
};

export default AddUser;
