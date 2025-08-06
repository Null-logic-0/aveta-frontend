import { useDeleteAccount } from "../../hooks/useDeleteAccount";
import Button from "../UI/Button";
import Modal from "../UI/Modal/Modal";

type DeleteAccountProps = {
  onClose: () => void;
};
function DeleteAccount({ onClose }: DeleteAccountProps) {
  const { mutate, isPending } = useDeleteAccount();
  return (
    <Modal onClose={onClose}>
      <p className="text-xl font-semibold mb-6 text-center text-white">
        Are you sure you want to delete this account?
      </p>
      <div className="flex justify-center gap-2 items-center">
        <Button
          isDisabled={isPending}
          buttonType="outline"
          onClick={onClose}
          className="text-white"
          type="button"
        >
          Cancel
        </Button>
        <Button
          className="text-white"
          onClick={() => mutate()}
          isDisabled={isPending}
          isPending={isPending}
        >
          {isPending ? "Deleting..." : "Delete"}
        </Button>
      </div>
    </Modal>
  );
}

export default DeleteAccount;
