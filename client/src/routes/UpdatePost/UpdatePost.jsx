import React, { useState, useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import apiRequest from "../../lib/apiRequest";
import UploadWidget from "../../components/UploadWidget/UploadWidget";
import "./UpdatePost.scss"; // Reuse the same SCSS

const UpdatePost = () => {
  const post = useLoaderData(); // Fetch existing post data
  const [value, setValue] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (post) {
      setValue(post.postDetail.desc);
      setImages(post.images);
    }
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputs = Object.fromEntries(formData.entries());

    try {
      await apiRequest.put(`/posts/${post.id}`, {
        postData: {
          title: inputs.title,
          price: parseInt(inputs.price),
          address: inputs.address,
          city: inputs.city,
          bedroom: parseInt(inputs.bedroom),
          bathroom: parseInt(inputs.bathroom),
          latitude: inputs.latitude,
          longitude: inputs.longitude,
          type: inputs.type,
          property: inputs.property,
          images: images,
        },
        postDetail: {
          desc: value,
          utilities: inputs.utilities,
          pet: inputs.pet,
          parking: inputs.parking,
          size: inputs.size ? parseInt(inputs.size) : undefined,
          bus: inputs.bus ? parseInt(inputs.bus) : undefined,
          airport: inputs.airport ? parseInt(inputs.airport) : undefined,
          train: inputs.train ? parseInt(inputs.train) : undefined,
        },
      });

      navigate(`/${post.id}`);
    } catch (err) {
      console.log(err);
      setError("All fields are required. " + err.message);
    }
  };

  return (
    <div className="UpdatePost">
      <div className="formContainer">
        <h1>Update Post</h1>
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            {/* Reuse form fields from NewPost */}
            <div className="item">
              <label htmlFor="title">Title</label>
              <input id="title" name="title" type="text" defaultValue={post.title} />
            </div>
            <div className="item">
              <label htmlFor="price">Price</label>
              <input id="price" name="price" type="number" defaultValue={post.price} />
            </div>
            <div className="item">
              <label htmlFor="address">Address</label>
              <input id="address" name="address" type="text" defaultValue={post.address} />
            </div>
            <div className="item description">
              <label htmlFor="desc">Description</label>
              <ReactQuill theme="snow" onChange={setValue} value={value} />
            </div>
            <div className="item">
              <label htmlFor="city">City</label>
              <input id="city" name="city" type="text" defaultValue={post.city} />
            </div>
            <div className="item">
              <label htmlFor="bedroom">Bedroom Number</label>
              <input min={1} id="bedroom" name="bedroom" type="number" defaultValue={post.bedroom} />
            </div>
            <div className="item">
              <label htmlFor="bathroom">Bathroom Number</label>
              <input min={1} id="bathroom" name="bathroom" type="number" defaultValue={post.bathroom} />
            </div>
            <div className="item">
              <label htmlFor="latitude">Latitude</label>
              <input id="latitude" name="latitude" type="text" defaultValue={post.latitude} />
            </div>
            <div className="item">
              <label htmlFor="longitude">Longitude</label>
              <input id="longitude" name="longitude" type="text" defaultValue={post.longitude} />
            </div>
            <div className="item">
              <label htmlFor="type">Type</label>
              <select name="type" defaultValue={post.type}>
                <option value="solo">Solo</option>
                <option value="team">Team</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="property">Property</label>
              <select name="property" defaultValue={post.property}>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="tentStay">Tent Stay</option>
                <option value="homeStay">Home Stay</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="utilities">Utilities Policy</label>
              <select name="utilities" defaultValue={post.utilities}>
                <option value="owner">Owner is responsible</option>
                <option value="tenant">Tenant is responsible</option>
                <option value="shared">Shared</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="pet">Pet Policy</label>
              <select name="pet" defaultValue={post.pet}>
                <option value="allowed">Allowed</option>
                <option value="not-allowed">Not Allowed</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="parking">Parking</label>
              <input id="parking" name="parking" type="text" defaultValue={post.parking} />
            </div>
            <div className="item">
              <label htmlFor="size">Total Size (sqft)</label>
              <input min={0} id="size" name="size" type="number" defaultValue={post.size} />
            </div>
            <div className="item">
              <label htmlFor="bus">Bus stop</label>
              <input min={0} id="bus" name="bus" type="number" placeholder="in km" defaultValue={post.bus} />
            </div>
            <div className="item">
              <label htmlFor="airport">Airport</label>
              <input min={0} id="airport" name="airport" type="number" placeholder="in km" defaultValue={post.airport} />
            </div>
            <div className="item">
              <label htmlFor="train">Train</label>
              <input min={0} id="train" name="train" type="number" placeholder="in km" defaultValue={post.train} />
            </div>
            <button className="sendButton">Update</button>
            {error && <span>{error}</span>}
          </form>
        </div>
      </div>
      <div className="sideContainer">
        {images.map((image, index) => (
          <img src={image} key={index} alt="" />
        ))}
        <UploadWidget
          uwConfig={{
            multiple: true,
            cloudName: "dx4twdohn",
            uploadPreset: "FindUs",
            folder: "posts",
          }}
          setState={setImages}
        />
      </div>
    </div>
  );
};

export default UpdatePost;
