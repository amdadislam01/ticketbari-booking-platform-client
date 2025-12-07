import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useTheme } from "../../../context/ThemeContext/ThemeContext";
import UseAuth from "../../../hooks/UseAuth";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddTicket = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();
  const { isDarkMode } = useTheme();
  const [imgPreview, setImgPreview] = useState("");
  const [photo, setPhoto] = useState(null);
  const [ticketAddedDate, setTicketAddedDate] = useState(null);
  const [ticketTime, setTicketTime] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handelAddedTicket = (data) => {
    if (!ticketAddedDate) {
      Swal.fire("Error", "Please select a valid date!", "error");
      return;
    }

    if (!ticketTime) {
      Swal.fire("Error", "Please select a valid time!", "error");
      return;
    }

    data.date = ticketAddedDate.toISOString();
    data.time = ticketTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

    const formData = new FormData();
    formData.append("image", photo);

    axios
      .post(
        `https://api.imgbb.com/1/upload?&key=${import.meta.env.VITE_IMAGE_HOST}`,
        formData
      )
      .then((res) => {
        const imageURL = res.data.data.display_url;
        const ticketData = { ...data, image: imageURL };
        axiosSecure.post("/added-ticket", ticketData).then((res) => {
          if (res.data.insertedId) {
            Swal.fire({
              title: "Ticket Added Successful!",
              icon: "success",
              draggable: true,
            });
            reset();
            setPhoto(null);
            setImgPreview("");
            setTicketAddedDate(null);
            setTicketTime(null);
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`max-w-4xl mx-auto rounded-xl shadow-xl p-8 my-10
        ${
          isDarkMode
            ? "bg-gray-900 border border-dashed text-gray-100"
            : "bg-white text-gray-800"
        }
      `}
    >
      <h2 className="text-3xl font-bold text-center text-orange-600 mb-8">
        Add a New Ticket
      </h2>

      <form
        onSubmit={handleSubmit(handelAddedTicket)}
        className="grid grid-cols-2 gap-6"
      >
        {/* Title */}
        <div className="col-span-2">
          <label className="font-semibold">Ticket Title</label>
          <input
            {...register("title", { required: "Title is required" })}
            placeholder="Enter ticket title"
            className="input-box"
          />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
        </div>

        {/* From */}
        <div>
          <label className="font-semibold">From (Location)</label>
          <input
            {...register("from", { required: true })}
            placeholder="Dhaka"
            className="input-box"
          />
        </div>

        {/* To */}
        <div>
          <label className="font-semibold">To (Location)</label>
          <input
            {...register("to", { required: true })}
            placeholder="Chittagong"
            className="input-box"
          />
        </div>

        {/* Transport */}
        <div>
          <label className="font-semibold">Transport Type</label>
          <select
            {...register("transport", { required: true })}
            className="input-box"
          >
            <option value="">Select Transport</option>
            <option>Bus</option>
            <option>Airplane</option>
            <option>Ship</option>
            <option>Train</option>
          </select>
        </div>

        {/* Price */}
        <div>
          <label className="font-semibold">Price (per unit)</label>
          <input
            type="number"
            {...register("price", { required: true })}
            placeholder="1200"
            className="input-box"
          />
        </div>

        {/* Quantity */}
        <div>
          <label className="font-semibold">Ticket Quantity</label>
          <input
            type="number"
            {...register("quantity", { required: true })}
            placeholder="50"
            className="input-box"
          />
        </div>

        {/* Date */}
        <div className="flex flex-col">
          <label className="font-semibold">Date</label>
          <DatePicker
            selected={ticketAddedDate}
            onChange={(date) => setTicketAddedDate(date)}
            minDate={new Date()}
            placeholderText="Select Ticket Date"
            className="input-box"
            dateFormat="yyyy-MM-dd"
          />
        </div>

        {/* Time */}
        <div className="flex flex-col">
          <label className="font-semibold">Time</label>
          <DatePicker
            selected={ticketTime}
            onChange={(date) => setTicketTime(date)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={1}
            timeCaption="Time"
            dateFormat="hh:mm:ss aa"
            placeholderText="Select Time"
            className="input-box"
          />
        </div>

        {/* Perks */}
        <div className="col-span-2">
          <label className="font-semibold block">Perks</label>
          <div className="flex gap-6 mt-2">
            <label>
              <input type="checkbox" {...register("perks")} value="AC" /> AC
            </label>
            <label>
              <input
                type="checkbox"
                {...register("perks")}
                value="Breakfast"
              />{" "}
              Breakfast
            </label>
            <label>
              <input type="checkbox" {...register("perks")} value="Wifi" /> Wifi
            </label>
          </div>
        </div>

        {/* Upload */}
        <div className="col-span-2">
          <label className="font-semibold">Upload Ticket Image</label>
          <label
            className={`upload-box border border-dashed rounded-xl p-5 text-center cursor-pointer block
      ${isDarkMode ? "border-gray-700 bg-gray-800" : "border-gray-300 bg-white"}
    `}
          >
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                setPhoto(e.target.files[0]);
                setImgPreview(URL.createObjectURL(e.target.files[0]));
              }}
            />

            <FaCloudUploadAlt className="text-5xl mx-auto mt-3" />

            <p className="mt-2">Click to upload image</p>

            {imgPreview && (
              <img
                src={imgPreview}
                className="w-28 h-28 object-cover rounded-xl mx-auto mt-4 shadow"
              />
            )}
          </label>
        </div>

        {/* Vendor info */}
        <div>
          <label className="font-semibold">Vendor Name</label>
          <input
            value={user?.displayName}
            {...register("vendorName", { required: true })}
            readOnly
            className="input-box bg-gray-200 dark:bg-gray-700"
          />
        </div>

        <div>
          <label className="font-semibold">Vendor Email</label>
          <input
            value={user?.email}
            {...register("vendorEmail", { required: true })}
            readOnly
            className="input-box bg-gray-200 dark:bg-gray-700"
          />
        </div>

        {/* Submit */}
        <div className="col-span-2">
          <button className="w-full py-3 text-lg font-semibold bg-orange-600 hover:bg-orange-700 text-white rounded-xl transition-all cursor-pointer">
            Add Ticket
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default AddTicket;
