
'use client'

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type Inputs = {
  title: string;
  desc: string;
  price: number;
  catSlug: string;
};

type Option = {
  title: string;
  additionalPrice: number;
};

const AddPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [inputs, setInputs] = useState<Inputs>({
    title: "",
    desc: "",
    price: 0,
    catSlug: "",
  });

  const [option, setOption] = useState<Option>({
    title: "",
    additionalPrice: 0,
  });

  const [options, setOptions] = useState<Option[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ✅ Admin redirect
  useEffect(() => {
    if (status === "unauthenticated") router.push("/");
    if (status === "authenticated" && !session?.user?.isAdmin)
      router.push("/");
  }, [status, session, router]);

  if (status === "loading") return <p className="p-10">Loading...</p>;

  // Handle text inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setInputs((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  // Handle option change
  const changeOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setOption((prev) => ({
      ...prev,
      [name]:
        name === "additionalPrice" ? Number(value) : value,
    }));
  };

  // Handle image selection
  const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  // Upload image to Cloudinary
  const upload = async () => {
    if (!file) throw new Error("Please select an image");

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "restaurant");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/wajihawajid/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    if (!res.ok) throw new Error("Image upload failed");

    const resData = await res.json();
    return resData.secure_url;
  };

  // Submit handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      if (!file) throw new Error("Image is required");

      const imageUrl = await upload();

      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          img: imageUrl,
          ...inputs,
          options,
        }),
      });

      if (!res.ok) throw new Error("Failed to create product");

      setSuccess("Product created successfully!");

      // Reset form
      setInputs({ title: "", desc: "", price: 0, catSlug: "" });
      setOptions([]);
      setFile(null);
      setPreview(null);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addOption = () => {
    if (!option.title) return;
    setOptions((prev) => [...prev, option]);
    setOption({ title: "", additionalPrice: 0 });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-8 space-y-6"
      >
        <h1 className="text-3xl font-bold text-gray-800">
          Add New Product
        </h1>

        {/* IMAGE UPLOAD */}
        <div className="flex flex-col gap-2">
          <label className="font-medium">Product Image *</label>

          <label
            htmlFor="file"
            className="cursor-pointer border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center h-40 overflow-hidden"
          >
            {preview ? (
              <img
                src={preview}
                alt="Selected"
                className="object-cover w-full h-full"
              />
            ) : (
              <span className="text-gray-400">
                Click to Upload Image
              </span>
            )}
          </label>

          <input
            type="file"
            id="file"
            onChange={handleChangeImg}
            className="hidden"
          />
        </div>

        {/* TITLE */}
        <div className="flex flex-col gap-2">
          <label className="font-medium">Title *</label>
          <input
            type="text"
            name="title"
            value={inputs.title}
            onChange={handleChange}
            className="border rounded-md p-3"
            required
          />
        </div>

        {/* DESCRIPTION */}
        <div className="flex flex-col gap-2">
          <label className="font-medium">Description *</label>
          <textarea
            rows={3}
            name="desc"
            value={inputs.desc}
            onChange={handleChange}
            className="border rounded-md p-3"
            required
          />
        </div>

        {/* PRICE */}
        <div className="flex flex-col gap-2">
          <label className="font-medium">Price ($) *</label>
          <input
            type="number"
            name="price"
            value={inputs.price}
            onChange={handleChange}
            className="border rounded-md p-3"
            required
          />
        </div>

        {/* CATEGORY */}
        <div className="flex flex-col gap-2">
          <label className="font-medium">Category Slug *</label>
          <input
            type="text"
            name="catSlug"
            value={inputs.catSlug}
            onChange={handleChange}
            className="border rounded-md p-3"
            required
          />
        </div>

        {/* OPTIONS */}
        <div className="space-y-3">
          <label className="font-medium">Product Options</label>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Option Title"
              name="title"
              value={option.title}
              onChange={changeOption}
              className="border rounded-md p-3 w-full"
            />
            <input
              type="number"
              placeholder="Additional Price"
              name="additionalPrice"
              value={option.additionalPrice}
              onChange={changeOption}
              className="border rounded-md p-3 w-full"
            />
            <button
              type="button"
              onClick={addOption}
              className="bg-gray-700 text-white px-4 rounded-md"
            >
              Add
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {options.map((opt) => (
              <div
                key={opt.title}
                onClick={() =>
                  setOptions((prev) =>
                    prev.filter((item) => item.title !== opt.title)
                  )
                }
                className="bg-gray-200 px-3 py-1 rounded-md cursor-pointer text-sm"
              >
                {opt.title} (+${opt.additionalPrice})
              </div>
            ))}
          </div>
        </div>

        {/* STATUS */}
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-600">{success}</p>}

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={loading}
          className="bg-red-500 text-white py-3 rounded-md w-full disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Product"}
        </button>
      </form>
    </div>
  );
};

export default AddPage;