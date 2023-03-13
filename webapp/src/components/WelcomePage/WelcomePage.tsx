import "./WelcomePage.css";
import WelcomeText from "./subcomponents/WelcomeText";
import WelcomeSolid from "./subcomponents/WelcomeSolid";

export default function WelcomePage() {
  return (
    <div className="welcome_page">
      <WelcomeText />
      <WelcomeSolid />
    </div>
  );
}
