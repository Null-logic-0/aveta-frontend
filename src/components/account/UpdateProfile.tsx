import { useAuth } from "../../hooks/useAuth";
import defaultImage from "../../assets/default.jpg";
import Input from "../UI/Input";
import RoundedImagePicker from "../UI/RoundedImagePicker";
import SettingsForm from "./SettingsForm";
import { useUpdateProfile } from "../../hooks/useUpdateProfile";

function UpdateProfile({ onClose }: { onClose: () => void }) {
  const { data } = useAuth();
  const user = data?.data.data;
  const { mutate, isPending } = useUpdateProfile();

  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const file = formData.get("profileImage") as File;
    const userName = formData.get("userName");

    const data = {
      userName: typeof userName === "string" ? userName : "",
      profileImage: file,
    };

    mutate(data);
  }
  return (
    <SettingsForm
      onSubmit={submitHandler}
      onCancel={onClose}
      title="Update profile"
      buttonText={isPending ? "Updating..." : "Update"}
      isPending={isPending}
    >
      <RoundedImagePicker
        name="profileImage"
        defaultImage={user?.profileImage || defaultImage}
      />
      <Input
        name="userName"
        isLabel
        label="User Name"
        className="text-white"
        defaultValue={user?.userName}
      />
      <Input
        isLabel
        disabled
        label="Email"
        className="text-white/50 disabled:cursor-not-allowed"
        defaultValue={user?.email}
      />
    </SettingsForm>
  );
}

export default UpdateProfile;
