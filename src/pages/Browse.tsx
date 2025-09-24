import Features from "../components/Features";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import BrowseCityWrapper from "../wrappers/BrowseCityWrapper";
import BrowseOfficeWrapper from "../wrappers/BrowseOfficeWrapper";

export default function Browse() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Header />
      <BrowseCityWrapper />
      <Features />
      <BrowseOfficeWrapper />
    </div>
  );
}
