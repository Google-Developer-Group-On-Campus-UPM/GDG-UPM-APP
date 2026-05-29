import { Event } from "@/constants/types/events.type";
import getGradientTextStyle from "./functions/util/getGradientTextStyle";

interface EventCardStatusProps {
  status: Event["status"];
}

export default function EventCardStatus({ status }: EventCardStatusProps) {
  return (
    <span
      className="font-normal text-[12px] leading-[140%] tracking-normal capitalize text-left"
      style={getGradientTextStyle(0.9)}
    >
      {status} Event
    </span>
  );
}
