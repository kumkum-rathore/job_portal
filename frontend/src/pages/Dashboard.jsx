import Navbar from "../components/Navbar";
import HeroSection from "./HeroSection";

function Dashboard() {

  // LocalStorage se user data nikalna
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <Navbar />
      <HeroSection user={user} />
      
    </div>
  );
}

export default Dashboard;