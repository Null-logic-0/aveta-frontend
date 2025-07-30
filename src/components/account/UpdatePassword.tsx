import Input from "../UI/Input";
import { TbLockPassword } from "react-icons/tb";
import { useUpdatePassword } from "../../hooks/useUpdatePassword";
import SettingsForm from "./SettingsForm";

function UpdatePassword({ onClose }: { onClose: () => void }) {
  const { mutate, isPending, formErrors } = useUpdatePassword();

  async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const rawData = Object.fromEntries(formData.entries());
    const data = {
      currentPassword: rawData.currentPassword as string,
      newPassword: rawData.newPassword as string,
      confirmPassword: rawData.confirmPassword as string,
    };
    mutate(data);
    onClose();
  }
  return (
    <SettingsForm
      buttonText={isPending ? "Updating..." : "Update"}
      title="Update Password"
      onSubmit={submitHandler}
      onCancel={onClose}
      isPending={isPending}
    >
      <Input
        label="Current Password"
        error={formErrors.currentPassword}
        isLabel
        name="currentPassword"
        className="text-white"
        isPassword
        hasIcon
        icon={<TbLockPassword className="text-2xl text-[#818DA2]" />}
      />
      <Input
        label="New Password"
        error={formErrors.newPassword}
        isLabel
        name="newPassword"
        className="text-white"
        isPassword
        hasIcon
        icon={<TbLockPassword className="text-2xl text-[#818DA2]" />}
      />
      <Input
        label="Confirm password"
        error={formErrors.confirmPassword}
        isPassword
        className="text-white"
        isLabel
        hasIcon
        name="confirmPassword"
        icon={<TbLockPassword className="text-2xl text-[#818DA2]" />}
      />
    </SettingsForm>
  );
}

export default UpdatePassword;
