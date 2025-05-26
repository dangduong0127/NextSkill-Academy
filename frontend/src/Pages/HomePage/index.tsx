import { Typography, Container, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import type { RootState, AppDispatch } from "../../app/store";
import { fetchAllUsers, updateUserThunk } from "../../features/users/userSlice";
import type { IUser } from "../../utils/types";

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, users } = useSelector(
    (state: RootState) => state.users
  );

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  useEffect(() => {
    const testCheckAuth = fetch("http://localhost:3003/api/v1/auth/check-auth");
    testCheckAuth.then((res) => res.json()).then((data) => console.log(data));
  }, [users]);

  if (loading) return <div>Loading...</div>;
  if (error) return <p>Error occurred</p>;
  console.log(users);
  return (
    <>
      <Container>
        <Typography variant="h1" component="h1">
          Trang chủ
        </Typography>

        <ul>
          {users.map((user: IUser) => {
            return (
              <li key={user._id}>
                {user.name} {user._id}
              </li>
            );
          })}
        </ul>

        <Button
          onClick={() =>
            dispatch(
              updateUserThunk({
                userId: "682c491533989fa58d3c9909",
                data: {
                  name: "Danny Dang",
                  email: "jondang@gmail.com",
                },
              })
            )
          }
        >
          Update User
        </Button>
      </Container>
    </>
  );
};

export default HomePage;
