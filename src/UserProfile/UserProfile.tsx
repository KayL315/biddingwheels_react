import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
// import { Post } from "../types"; 
// import { getPosts, currentLoggedInProfile, signOut } from "./client";
// import { useDispatch } from "react-redux";
// import { emptyUser } from "../../Reducers/userReducer";
// import { FaUser } from "react-icons/fa";
// import { findUserById } from "../../Clients/userclient";

interface User {
  _id: string;
  username: string;
  nickname: string;
  profilePicture: string;
  // posts: Post[];
  personalBio: string;
}

const UserProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  // const dispatch = useDispatch();
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  // const [posts, setPosts] = useState<Post[]>([]);

  const fetchProfile = async () => {
    // try {
    //   const response = await findUserById(id);
    //   setUser(response);
    // } catch (error) {
    //   setError(error.message);
    // }
  };

  const fetchCurrentProfile = async () => {
    // try {
    //   const current = await currentLoggedInProfile();
    //   current && setCurrentUser(current);
    // } catch (error) {
    //   console.log("Not Logged In || Failed to fetch logged in user info");
    // }
  };

  const logOut = async () => {
    // await signOut();
    // dispatch(emptyUser());
    // navigate("/home");
  };

  const fetchPosts = async () => {
    // try {
    //   if (id) {
    //     const response = await getPosts(id);
    //     setPosts(response.data);
    //   }
    // } catch (error) {
    //   setError(error.message);
    // }
  };

  const prepareData = async () => {
    // try {
    //   await fetchProfile();
    //   await fetchCurrentProfile();
    //   await fetchPosts();
    // } catch (error) {
    //   setError(error.message);
    // }
  };

  useEffect(() => {
    prepareData();
  }, []);

  let sameUser = false;
  try {
    sameUser =
      currentUser !== null ? user?.username === currentUser.username : false;
  } catch (err: any) {
    setError(err.message);
  }
  

  return (
    <div>
      {
      user !== null ? (
        <div className="et-main-wrapper row">
          {/* User Info Section */}
          <div className="col-sm-auto d-flex justify-content-center w-100">
            <div className="d-block">
              {/* All Users Button */}
              (
                <div className={"et-dropdown-btn"}>
                  <Link to="/profile/all-users" className={"btn"}>
                    {/*<FaUser/>*/} FaUser placeholder
                  </Link>
                </div>
              )

              {/* Profile Picture */}
              <img
                src={user.profilePicture}
                alt={`Profile picture for ${user.nickname}`}
                className="form-control et-profile-picture mb-4"
              />

              {/* Username */}
              <div className="justify-content-center d-flex mb-2">
                <div>
                  <strong className="h4">{user.nickname}</strong>
                  <p>@{user.username}</p>
                </div>
              </div>




              {/* User Bio */}
              <p className="mt-3">{user.personalBio}</p>

              {/* Actions Section */}
              {sameUser && (
                <div className="d-block float-end mt-5 w-100">
                  <div className={"d-flex justify-content-between"}>
                    <button
                      className={"btn btn-danger"}
                      onClick={logOut}
                    >
                      Log Out
                    </button>
                    <Link
                      to={`/profile/profile-setting/${user._id}`}
                      className="btn btn-outline-dark et-edit-profile-btn"
                    >
                      Edit Profile
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* User Posts Section */}
          <div className="col-lg-9 mt-3 d-flex justify-content-center w-100">
            <div className="d-flex flex-row flex-wrap justify-content-center">
              {/* Map through user posts and render PostCards */}
              {/* {posts.map((post) => (
                <PostCards key={post.id} {...post} author_name={user.nickname} />
              ))} */}
            </div>
          </div>
        </div>
      ) : (
        <div>
          {/* Display Error or Loader */}
          {error !== "" && (
            <div className={"alert alert-danger mt-2"} role={"alert"}>
              {error}
            </div>
          )}
          <div className="spinner-border" role="status">
            <span className="sr-only"></span>
          </div>
          <p className={"mt-2 h2"}>You are not logged in</p>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
