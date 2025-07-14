import { RainbowButton } from "@/components/magicui/rainbow-button";
import { useNavigate } from "react-router-dom";

export function RainbowButtonDemo() {
  const navigate = useNavigate();
  return (
    <RainbowButton onClick={() => navigate("/dashboard")}>
      Dashboard View
    </RainbowButton>
  );
}
