import PricePlan from "../components/payments/PricePlan";
import PricePlanListItem from "../components/payments/PricePlanListItem";
import Heading from "../components/UI/Heading";
import ReturnButton from "../components/UI/ReturnButton";
import { UserPlan } from "../enums/user-plan.enum";
import { useStartCheckout } from "../hooks/useStartCheckout";

function Prices() {
  const { mutate, isPending } = useStartCheckout();

  return (
    <div className="flex flex-col w-full items-center">
      <ReturnButton />
      <main className="flex flex-col justify-center gap-8 mt-10 items-center">
        <Heading isTitle title="Unlock the Full AI Experience" />
        <div className="flex  justify-center items-center gap-6 flex-wrap">
          <PricePlan
            title="Free Plan"
            price="Free"
            buttonText="Free"
            onPay={() => {}}
            isFree
            isPending={isPending}
          >
            <PricePlanListItem
              listName={"Access to all available characters"}
            />
            <PricePlanListItem listName={"Unlimited character creation"} />
            <PricePlanListItem listName={"30 messages per day"} />
            <PricePlanListItem listName={"No credit card required"} />
          </PricePlan>
          <PricePlan
            title="Basic Plan"
            price="$4.99/Month"
            buttonText="Subscribe"
            onPay={() => {
              mutate({ plan: UserPlan.BASIC });
            }}
            isPending={isPending}
          >
            <PricePlanListItem
              listName={"Access to all available characters"}
            />
            <PricePlanListItem listName={"Unlimited character creation"} />
            <PricePlanListItem listName={"100 messages per day"} />
            <PricePlanListItem listName={"Personalized conversations"} />
          </PricePlan>
          <PricePlan
            title="Premium Plan"
            price="$9.99/Month"
            buttonText="Subscribe"
            onPay={() => {
              mutate({ plan: UserPlan.PREMIUM });
            }}
            isPending={isPending}
          >
            <PricePlanListItem
              listName={"Access to all available characters"}
            />
            <PricePlanListItem listName={"Unlimited character creation"} />
            <PricePlanListItem listName={"200 messages per day"} />
            <PricePlanListItem listName={"Early access to new features "} />
          </PricePlan>
        </div>
      </main>
    </div>
  );
}

export default Prices;
