import { FormEvent } from "react";
import Button from "../UI/Button";

type SettingsFormProps = {
  onCancel: () => void;
  children: React.ReactNode;
  isPending: boolean;
  title: string;
  buttonText: string;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};
function SettingsForm({
  children,
  onCancel,
  onSubmit,
  isPending,
  title,
  buttonText,
}: SettingsFormProps) {
  return (
    <form
      className="w-full flex flex-col max-md:pt-6 gap-4"
      onSubmit={onSubmit}
    >
      <h1 className="text-white text-xl font-semibold">{title}</h1>
      {children}
      <div className="flex justify-end gap-2 items-center">
        <Button
          isDisabled={isPending}
          buttonType="outline"
          className="text-white"
          type="button"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          className="text-white"
          isPending={isPending}
          disabled={isPending}
        >
          {buttonText}
        </Button>
      </div>
    </form>
  );
}

export default SettingsForm;
