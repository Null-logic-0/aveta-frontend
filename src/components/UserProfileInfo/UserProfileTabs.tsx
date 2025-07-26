import UserProfileTabButton from "./UserProfileTabButton";

type UserProfileTabsProps = {
  navigate: string;
  setNavigate: (value: string) => void;
};

function UserProfileTabs({ navigate, setNavigate }: UserProfileTabsProps) {
  return (
    <div className="flex gap-6 items-center">
      <UserProfileTabButton
        isActive={navigate === "Characters"}
        title="Characters"
        onClick={() => {
          setNavigate("Characters");
        }}
      />
      <UserProfileTabButton
        title="Liked"
        isActive={navigate === "Liked"}
        onClick={() => {
          setNavigate("Liked");
        }}
      />
    </div>
  );
}

export default UserProfileTabs;
