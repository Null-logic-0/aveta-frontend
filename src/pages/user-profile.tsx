import { Empty } from "antd";
import { useParams } from "react-router";
import { useState } from "react";
import { toNumericId } from "../helpers/toNumericId";
import { useFetchUser } from "../hooks/useFetchUser";
import Spinner from "../components/UI/spinner/Spinner";
import UserProfileInfo from "../components/user-profile-info/UserProfileInfo";
import UserProfileTabs from "../components/user-profile-info/UserProfileTabs";
import CreatedCharacters from "../components/user-profile-info/CreatedCharacters";
import LikedCharacters from "../components/user-profile-info/LikedCharacters";
import ReturnButton from "../components/UI/ReturnButton";
import { useAuth } from "../hooks/useAuth";
import { useDispatch } from "react-redux";
import { open } from "../store/UI-slice";

function UserProfile() {
  const { userId } = useParams();
  const numericId = toNumericId(userId);
  const [navigate, setNavigate] = useState("Characters");

  const { data: userData, isLoading } = useFetchUser({
    id: numericId as number,
  });
  const { data: currentUserData } = useAuth();
  const dispatch = useDispatch();

  const user = userData?.data;
  const currentUser = currentUserData?.data?.data;

  const isCurrentUser = currentUser?.id === numericId;

  if (!userId && !isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Empty description="Invalid user ID" />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }
  return (
    <>
      <ReturnButton />
      <div className="flex flex-col items-center gap-6 mt-6">
        <UserProfileInfo
          image={user?.profileImage}
          userName={user?.userName}
          onOpenSettings={() => dispatch(open(currentUser?.id))}
          isCurrentUser={isCurrentUser}
        />
        <UserProfileTabs setNavigate={setNavigate} navigate={navigate} />
        {navigate === "Characters" ? (
          <CreatedCharacters id={numericId} />
        ) : (
          <LikedCharacters id={numericId} />
        )}
      </div>
    </>
  );
}

export default UserProfile;
