import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import { userRequest } from "../requestMethods";

const Banners = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [banners, setBanners] = useState([]);
  const [uploading, setUploading] = useState("Uploading is 0%");

  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", selectedImage);
    data.append("upload_preset", "uploads");

    setUploading("Uploading ...");
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/datjymz90/image/upload",
        data
      );

      const { url } = uploadRes.data;
      setUploading("Uploaded 100%");
      await userRequest.post("/banners", { img: url, title, subtitle });
      window.location.reload();
    } catch (error) {
      console.log(error);
      setUploading("Uploading failed");
    }
  };

  useEffect(() => {
    const getBanners = async () => {
      try {
        const res = await userRequest.get("/banners");
        setBanners(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getBanners();
  }, []);

  const handleDelete = async (id) => {
    try {
      await userRequest.delete(`/banners/${id}`);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex justify-center py-16 px-8">
      {/* LEFT */}
      <div className="w-[50%] pr-10">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b-4 border-red-400 pb-2">
          Active Banners
        </h2>

        <div className="grid grid-cols-1 gap-6">
          {banners?.map((banner, index) => (
            <div
              key={index}
              className="flex items-center bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition p-4"
            >
              <img
                src={banner.img}
                alt=""
                className="w-28 h-28 object-cover rounded-md border border-gray-300"
              />
              <div className="flex-1 ml-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {banner.title}
                </h3>
                <p className="text-gray-500">{banner.subtitle}</p>
              </div>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition font-semibold"
                onClick={() => handleDelete(banner._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-[40%]">
        <div className="bg-white border-2 border-red-400 rounded-2xl shadow-lg p-8 transition">
          <h3 className="text-xl font-semibold mb-6 text-gray-800 border-b-2 border-red-300 pb-2">
            Add New Banner
          </h3>

          <div className="flex flex-col gap-5">
            <div>
              <label className="font-semibold text-gray-700">Image:</label>
              <div className="border-2 border-dashed border-gray-300 h-[120px] w-[120px] flex items-center justify-center rounded-lg mt-2 hover:border-red-400 transition">
                {!selectedImage ? (
                  <label htmlFor="file" className="cursor-pointer">
                    <FaPlus className="text-gray-500 text-[22px] hover:text-red-500 transition" />
                  </label>
                ) : (
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt=""
                    className="h-[120px] w-[120px] object-cover rounded-lg border border-gray-200"
                  />
                )}
                <input
                  type="file"
                  id="file"
                  onChange={imageChange}
                  style={{ display: "none" }}
                />
              </div>
              <span className="text-sm text-green-600 mt-1 block">
                {uploading}
              </span>
            </div>

            <div>
              <label className="font-semibold text-gray-700">Title:</label>
              <input
                type="text"
                className="w-full border-b-2 border-gray-300 focus:border-red-400 outline-none mt-1 py-1 transition"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label className="font-semibold text-gray-700">Subtitle:</label>
              <input
                type="text"
                className="w-full border-b-2 border-gray-300 focus:border-red-400 outline-none mt-1 py-1 transition"
                onChange={(e) => setSubtitle(e.target.value)}
              />
            </div>

            <button
              className="bg-red-500 hover:bg-red-600 text-white py-2 rounded-md font-semibold transition mt-2"
              onClick={handleUpload}
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banners;
