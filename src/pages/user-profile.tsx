import { Empty } from "antd";
import { useParams } from "react-router";
import { useState } from "react";
import { toNumericId } from "../helpers/toNumericId";
import { useFetchUser } from "../hooks/useFetchUser";
import Spinner from "../components/UI/Spinner/Spinner";
import UserProfileInfo from "../components/UserProfileInfo/UserProfileInfo";
import UserProfileTabs from "../components/UserProfileInfo/UserProfileTabs";
import CreatedCharacters from "../components/UserProfileInfo/CreatedCharacters";
import LikedCharacters from "../components/UserProfileInfo/LikedCharacters";
import ReturnButton from "../components/UI/ReturnButton";

function UserProfile() {
  const { userId } = useParams();
  const numericId = toNumericId(userId);
  const [navigate, setNavigate] = useState("Characters");

  const { data, isLoading } = useFetchUser({ id: numericId as number });

  const user = data?.data;

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
        <UserProfileInfo image={user?.profileImage} userName={user?.userName} />
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
