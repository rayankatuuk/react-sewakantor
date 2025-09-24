import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { Office } from "../types/type";
import { bookingSchema } from "../types/validationBooking";

export default function BookOffice() {
  const { slug } = useParams<{ slug: string }>();

  const [office, setOffice] = useState<Office | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone_number: "",
    started_at: "",
    office_space_id: "",
    totalAmountWithUniqueCode: 0,
  });

  const [formErrors, setFormErrors] = useState<z.ZodIssue[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [uniqueCode, setUniqueCode] = useState<number>(0);
  const [totalAmountWithUniqueCode, setTotalAmountWithUniqueCode] =
    useState<number>(0);

  useEffect(() => {
    axios
      .get(`https://sewakantor.raystack.io/api/office/${slug}`, {
        headers: {
          "X-API-KEY": import.meta.env.VITE_API_KEY,
        },
      })
      .then((response) => {
        setOffice(response.data.data);

        const officeSpaceId = response.data.data.id;
        const generatedUniqueCode = Math.floor(100 + Math.random() * 900);
        const grandTotal = response.data.data.price - generatedUniqueCode;

        setUniqueCode(generatedUniqueCode);
        setTotalAmountWithUniqueCode(grandTotal);

        setFormData((prevData) => ({
          ...prevData,
          office_space_id: officeSpaceId,
          total_amount: grandTotal,
        }));

        setLoading(false);
      })
      .catch((error: unknown) => {
        if (axios.isAxiosError(error)) {
          setError(error.message);
        } else {
          setError("An unexpected error occurred.");
        }
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading data: {error}</p>;
  }

  if (!office) {
    return <p>Data not found</p>;
  }
  const baseUrl = import.meta.env.VITE_BASE_URL + "/storage";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = bookingSchema.safeParse(formData);

    if (!validation.success) {
      setFormErrors(validation.error.issues);
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://sewakantor.raystack.io/api/booking-transaction",
        {
          ...formData,
        },
        {
          headers: {
            "X-API-KEY": import.meta.env.VITE_API_KEY,
          },
        }
      );

      navigate("/success-booking", {
        state: {
          office,
          booking: response.data.data,
        },
      });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div
        id="Banner"
        className="relative w-full h-[240px] flex items-center shrink-0 overflow-hidden -mb-[50px] max-[639px]:h-[140px] max-[639px]:-mb-[30px]"
      >
        <h1 className="text-center mx-auto font-extrabold text-[40px] leading-[60px] text-white mb-5 z-20 max-[639px]:text-xl max-[639px]:leading-[32px] max-[639px]:mb-2">
          Start Booking Your Office
        </h1>
        <div className="absolute w-full h-full bg-[linear-gradient(180deg,_rgba(0,0,0,0)_0%,#000000_91.83%)] z-10" />
        <img
          src={`${baseUrl}/${office.thumbnail}`}
          className="absolute w-full h-full object-cover object-top"
          alt=""
        />
      </div>
      <form
        onSubmit={handleSubmit}
        action="booking-finished.html"
        className="relative flex justify-center max-w-[1130px] mx-auto gap-[30px] mb-20 z-20 max-[639px]:flex-col max-[639px]:px-2 max-[639px]:gap-4"
      >
        <div className="flex flex-col shrink-0 w-[500px] h-fit rounded-[20px] border border-[#E0DEF7] p-[30px] gap-[30px] bg-white max-[639px]:w-full max-[639px]:px-8 max-[639px]:py-5 max-[639px]:gap-4">
          <div className="flex items-center gap-4 max-[639px]:gap-2">
            <div className="flex shrink-0 w-[140px] h-[100px] rounded-[20px] overflow-hidden max-[639px]:w-[80px] max-[639px]:h-[60px]">
              <img
                src={`${baseUrl}/${office.thumbnail}`}
                className="w-full h-full object-cover"
                alt="thumbnail"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-bold text-xl leading-[30px] max-[639px]:text-base max-[639px]:leading-[22px]">
                {office.name}
              </p>
              <div className="flex items-center gap-[6px] max-[639px]:text-xs">
                <img
                  src="/assets/images/icons/location.svg"
                  className="w-6 h-6 max-[639px]:w-4 max-[639px]:h-4"
                  alt="icon"
                />
                <p className="font-semibold">{office.city.name}</p>
              </div>
            </div>
          </div>
          <hr className="border-[#F6F5FD]" />
          <div className="flex flex-col gap-4 max-[639px]:gap-2">
            <h2 className="font-bold max-[639px]:text-xs">
              Complete The Details
            </h2>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="name"
                className="font-semibold max-[639px]:text-xs"
              >
                Full Name
              </label>
              <div className="flex items-center rounded-full border border-[#000929] px-5 gap-[10px] transition-all duration-300 focus-within:ring-2 focus-within:ring-[#0D903A] max-[639px]:px-3 max-[639px]:gap-2">
                <img
                  src="/assets/images/icons/security-user-black.svg"
                  className="w-6 h-6 max-[639px]:w-4 max-[639px]:h-4"
                  alt="icon"
                />
                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  value={formData.name}
                  id="name"
                  className="appearance-none outline-none w-full py-3 font-semibold placeholder:font-normal placeholder:text-[#000929] max-[639px]:text-xs max-[639px]:py-2"
                  placeholder="Write your complete name"
                />
              </div>
              {formErrors.find((error) => error.path.includes("name")) && (
                <p className="text-red-500 max-[639px]:text-xs">
                  Name is required
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="phone"
                className="font-semibold max-[639px]:text-xs"
              >
                Phone Number
              </label>
              <div className="flex items-center rounded-full border border-[#000929] px-5 gap-[10px] transition-all duration-300 focus-within:ring-2 focus-within:ring-[#0D903A] max-[639px]:px-3 max-[639px]:gap-2">
                <img
                  src="/assets/images/icons/call-black.svg"
                  className="w-6 h-6 max-[639px]:w-4 max-[639px]:h-4"
                  alt="icon"
                />
                <input
                  type="tel"
                  name="phone_number"
                  onChange={handleChange}
                  value={formData.phone_number}
                  id="phone_number"
                  className="appearance-none outline-none w-full py-3 font-semibold placeholder:font-normal placeholder:text-[#000929] max-[639px]:text-xs max-[639px]:py-2"
                  placeholder="Write your valid number"
                />
              </div>
              {formErrors.find((error) =>
                error.path.includes("phone_number")
              ) && (
                <p className="text-red-500 max-[639px]:text-xs">
                  Phone Number is required
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="date"
                className="font-semibold max-[639px]:text-xs"
              >
                Started At
              </label>
              <div className="flex items-center rounded-full border border-[#000929] px-5 gap-[10px] transition-all duration-300 focus-within:ring-2 focus-within:ring-[#0D903A] overflow-hidden max-[639px]:px-3 max-[639px]:gap-2">
                <img
                  src="/assets/images/icons/calendar-black.svg"
                  className="w-6 h-6 max-[639px]:w-4 max-[639px]:h-4"
                  alt="icon"
                />
                <input
                  type="date"
                  name="started_at"
                  onChange={handleChange}
                  value={formData.started_at}
                  id="date"
                  className="relative appearance-none outline-none w-full py-3 font-semibold [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:opacity-0 max-[639px]:text-xs max-[639px]:py-2"
                />
              </div>
              {formErrors.find((error) =>
                error.path.includes("started_at")
              ) && (
                <p className="text-red-500 max-[639px]:text-xs">
                  Date is required
                </p>
              )}
            </div>
          </div>
          <hr className="border-[#F6F5FD]" />
          <div className="flex items-center gap-3 max-[639px]:gap-2">
            <img
              src="/assets/images/icons/shield-tick.svg"
              className="w-[30px] h-[30px] max-[639px]:w-5 max-[639px]:h-5"
              alt="icon"
            />
            <p className="font-semibold leading-[28px] max-[639px]:text-xs">
              Kami akan melindungi privasi Anda sebaik mungkin sehingga dapat
              fokus bekerja
            </p>
          </div>
          <hr className="border-[#F6F5FD]" />
          <div className="flex flex-col gap-[30px] max-[639px]:gap-4">
            <h2 className="font-bold max-[639px]:text-xs">
              Bonus Packages For You
            </h2>
            <div className="grid grid-cols-2 gap-[30px] max-[639px]:gap-2">
              <div className="flex items-center gap-4 max-[639px]:gap-2">
                <img
                  src="/assets/images/icons/coffee.svg"
                  className="w-[34px] h-[34px] max-[639px]:w-6 max-[639px]:h-6"
                  alt="icon"
                />
                <div className="flex flex-col gap-[2px]">
                  <p className="font-bold text-lg leading-[24px] max-[639px]:text-xs max-[639px]:leading-[18px]">
                    Extra Snacks
                  </p>
                  <p className="text-sm leading-[21px] max-[639px]:text-xs max-[639px]:leading-[16px]">
                    Work-Life Balance
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 max-[639px]:gap-2">
                <img
                  src="/assets/images/icons/group.svg"
                  className="w-[34px] h-[34px] max-[639px]:w-6 max-[639px]:h-6"
                  alt="icon"
                />
                <div className="flex flex-col gap-[2px]">
                  <p className="font-bold text-lg leading-[24px] max-[639px]:text-xs max-[639px]:leading-[18px]">
                    Free Move
                  </p>
                  <p className="text-sm leading-[21px] max-[639px]:text-xs max-[639px]:leading-[16px]">
                    Anytime 24/7
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col shrink-0 w-[400px] h-fit rounded-[20px] border border-[#E0DEF7] p-[30px] gap-[30px] bg-white max-[639px]:w-full max-[639px]:px-8 max-[639px]:py-5 max-[639px]:gap-4 max-[639px]:mt-4">
          <h2 className="font-bold max-[639px]:text-xs">Your Order Details</h2>
          <div className="flex flex-col gap-5 max-[639px]:gap-3">
            <div className="flex items-center justify-between">
              <p className="font-semibold max-[639px]:text-xs">Duration</p>
              <p className="font-bold max-[639px]:text-xs">
                {office.duration} Days Working
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-semibold max-[639px]:text-xs">Sub Total</p>
              <p className="font-bold max-[639px]:text-xs">
                Rp {office.price.toLocaleString("id-ID")}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-semibold max-[639px]:text-xs">Unique Code</p>
              <p className="font-bold text-[#FF2D2D] max-[639px]:text-xs">
                -Rp {uniqueCode}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-semibold max-[639px]:text-xs">Grand Total</p>
              <p className="font-bold text-[22px] leading-[33px] text-[#0D903A] max-[639px]:text-base max-[639px]:leading-[22px]">
                Rp{" "}
                {totalAmountWithUniqueCode.toLocaleString("id-ID", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </p>
            </div>
            <div className="relative rounded-xl p-[10px_20px] gap-[10px] bg-[#000929] text-white max-[639px]:p-2 max-[639px]:gap-2">
              <img
                src="/assets/images/icons/Polygon 1.svg"
                className="absolute -top-[15px] right-[10px] max-[639px]:w-4 max-[639px]:h-4"
                alt=""
              />
              <p className="font-semibold text-sm leading-[24px] z-10 max-[639px]:text-xs max-[639px]:leading-[16px]">
                Tolong perhatikan kode unik berikut ketika melakukan pembayaran
                kantor
              </p>
            </div>
          </div>
          <hr className="border-[#F6F5FD]" />
          <h2 className="font-bold max-[639px]:text-xs">Send Payment to</h2>
          <div className="flex flex-col gap-[30px] max-[639px]:gap-4">
            <div className="flex items-center gap-3 max-[639px]:gap-2">
              <div className="w-[71px] flex shrink-0 max-[639px]:w-10">
                <img
                  src="/assets/images/logos/bca.svg"
                  className="w-full object-contain"
                  alt="bank logo"
                />
              </div>
              <div className="flex flex-col gap-[2px]">
                <div className="flex items-center gap-1">
                  <p className="font-semibold max-[639px]:text-xs">
                    SewainKantor Rayan
                  </p>
                  <img
                    src="/assets/images/icons/verify.svg"
                    className="w-[18px] h-[18px] max-[639px]:w-4 max-[639px]:h-4"
                    alt="icon"
                  />
                </div>
                <p className="max-[639px]:text-xs">8008129839</p>
              </div>
            </div>
            <div className="flex items-center gap-3 max-[639px]:gap-2">
              <div className="w-[71px] flex shrink-0 max-[639px]:w-10">
                <img
                  src="/assets/images/logos/mandiri.svg"
                  className="w-full object-contain"
                  alt="bank logo"
                />
              </div>
              <div className="flex flex-col gap-[2px]">
                <div className="flex items-center gap-1">
                  <p className="font-semibold max-[639px]:text-xs">
                    SewainKantor Rayan
                  </p>
                  <img
                    src="/assets/images/icons/verify.svg"
                    className="w-[18px] h-[18px] max-[639px]:w-4 max-[639px]:h-4"
                    alt="icon"
                  />
                </div>
                <p className="max-[639px]:text-xs">12379834983281</p>
              </div>
            </div>
          </div>
          <hr className="border-[#F6F5FD]" />
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center justify-center w-full rounded-full p-[16px_26px] max-[639px]:p-[10px_16px] gap-3 bg-[#0D903A] font-bold text-[#F7F7FD] max-[639px]:text-xs"
          >
            <span>{isLoading ? "Loading..." : "I've already paid"}</span>
          </button>
        </div>
      </form>
    </>
  );
}
