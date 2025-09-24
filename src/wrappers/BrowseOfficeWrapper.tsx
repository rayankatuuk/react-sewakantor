import { useEffect, useState } from "react";
import OfficeCard from "../components/OfficeCard";
import { Office } from "../types/type";
import axios from "axios";
import { Link } from "react-router-dom";
export default function BrowseOfficeWrapper() {
  const [offices, setOffices] = useState<Office[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("https://sewakantor.raystack.io/api/offices", {
        headers: {
          "X-API-KEY": import.meta.env.VITE_API_KEY,
        },
      })
      .then((response) => {
        setOffices(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading data: {error}</p>;
  }

  return (
    <section
      id="Fresh-Space"
      className="flex flex-col gap-[30px] w-full max-w-[1130px] mx-auto mt-[100px] mb-[120px] max-[639px]:mb-[60px] px-4 lg:px-0"
    >
      <h2 className="font-bold text-[32px] leading-[48px] text-nowrap text-center max-[639px]:text-[24px] max-[639px]:leading-[36px]">
        Browse Our Fresh Space.
        <br />
        For Your Better Productivity.
      </h2>
      <div className="grid grid-cols-3 gap-[30px] max-[639px]:grid-cols-1 max-[639px]:px-4">
        {offices.map((office) => (
          <Link key={office.id} to={`/office/${office.slug}`}>
            <OfficeCard office={office}></OfficeCard>
          </Link>
        ))}
      </div>
    </section>
  );
}
