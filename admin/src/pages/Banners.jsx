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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 w-full py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">
          Banner Management
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT - Active Banners */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-3 border-b-4 border-red-400 pb-3">
                <span className="text-red-500">📋</span> Active Banners
              </h2>

              {banners.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <p className="text-lg">No banners yet. Add your first banner!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {banners?.map((banner, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-gradient-to-r from-gray-50 to-white border-2 border-gray-200 rounded-xl shadow-sm hover:shadow-lg hover:border-red-300 transition-all duration-300 p-5"
                    >
                      <img
                        src={banner.img}
                        alt=""
                        className="w-32 h-32 object-cover rounded-lg border-2 border-gray-300 shadow-md"
                      />
                      <div className="flex-1 ml-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-1">
                          {banner.title}
                        </h3>
                        <p className="text-gray-600 text-sm">{banner.subtitle}</p>
                      </div>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition-all duration-300 font-semibold shadow-md hover:shadow-lg transform hover:scale-105"
                        onClick={() => handleDelete(banner._id)}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT - Add New Banner */}
          <div className="lg:col-span-1">
            <div className="bg-white border-2 border-red-400 rounded-2xl shadow-xl p-8 sticky top-6">
              <h3 className="text-2xl font-bold mb-6 text-gray-800 border-b-2 border-red-300 pb-3 flex items-center gap-2">
                <span className="text-red-500">➕</span> Add New Banner
              </h3>

              <div className="flex flex-col gap-6">
                <div>
                  <label className="font-semibold text-gray-700 mb-2 block">
                    Banner Image:
                  </label>
                  <div className="border-2 border-dashed border-gray-300 h-[180px] w-full flex items-center justify-center rounded-xl mt-2 hover:border-red-400 transition bg-gray-50">
                    {!selectedImage ? (
                      <label htmlFor="file" className="cursor-pointer text-center">
                        <FaPlus className="text-gray-400 text-[40px] hover:text-red-500 transition mx-auto mb-2" />
                        <p className="text-gray-500 text-sm">Click to upload image</p>
                      </label>
                    ) : (
                      <img
                        src={URL.createObjectURL(selectedImage)}
                        alt=""
                        className="h-[170px] w-full object-cover rounded-lg border border-gray-200"
                      />
                    )}
                    <input
                      type="file"
                      id="file"
                      onChange={imageChange}
                      style={{ display: "none" }}
                    />
                  </div>
                  <span className="text-sm text-green-600 mt-2 block font-medium">
                    {uploading}
                  </span>
                </div>

                <div>
                  <label className="font-semibold text-gray-700 mb-2 block">
                    Title:
                  </label>
                  <input
                    type="text"
                    placeholder="Enter banner title"
                    className="w-full border-2 border-gray-300 focus:border-red-400 rounded-lg outline-none px-4 py-3 transition"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div>
                  <label className="font-semibold text-gray-700 mb-2 block">
                    Subtitle:
                  </label>
                  <input
                    type="text"
                    placeholder="Enter banner subtitle"
                    className="w-full border-2 border-gray-300 focus:border-red-400 rounded-lg outline-none px-4 py-3 transition"
                    onChange={(e) => setSubtitle(e.target.value)}
                  />
                </div>

                <button
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-3 rounded-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 mt-2"
                  onClick={handleUpload}
                >
                  Upload Banner
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banners;
