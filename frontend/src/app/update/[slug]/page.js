"use client";
import { useState, useEffect } from "react";
import style from "./update.module.css";
import { useParams } from "next/navigation";
import Cookies from "js-cookie";


const Update = () => {
  // Check if user is logged in
  useEffect(() => {
    const token = Cookies.get("userToken");
    if (!token) window.location.href = "/login";
  }, []);

  // State to store note and note title
  const [note, setNote] = useState({ content: "", background: "#ffffff" }); // default background
  const [noteTitle, setNoteTitle] = useState("");

  const { slug } = useParams();

  // Fetch the note from the server
  const fetchNote = async () => {
    try {
      const response = await fetch(`http://localhost:8000/note/${slug}`);
      if (!response.ok) {
        throw new Error("Error in server: " + response.statusText);
      }
      const data = await response.json();
      console.log(data);
      setNote({
        content: data.content || "",
        title: data.title || "",
        background: data.background || "#ffffff", // Set background color from fetched data
      });
      setNoteTitle(data.title); // Update the title
    } catch (error) {
      console.error("Fetch failed:", error.message);
    }
  };

  useEffect(() => {
    if (slug) {
      fetchNote();
    }
  }, [slug]);



  // Update noteTitle and content dynamically
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "title") {
      setNoteTitle(value);
    }
    setNote({
      ...note,
      [name]: value, // Dynamically update the note object
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const contentHTML = editor.getHTML();
    const body = {
      title: noteTitle,
      content: contentHTML,
      background: note.background,
    };

    try {
      const response = await fetch(`http://localhost:8000/update/${note._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Failed to send data");
      }

      const result = await response.json();
      if (result) {
        window.location.href = "/";
      } else {
        alert("Error while updating notes.");
      }
    } catch (error) {
      alert("Error while updating notes. Error ::: " + error);
    }
  };

  return (
    <div className="container">
      <div className={style.updateLayout} style={{ "--i": note.background }}>
        <h1>
          Update Note <span>[{note.title}]</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            onChange={handleChange}
            placeholder="Title"
            value={noteTitle}
          />

      
          <textarea
            name="content"
            onChange={handleChange}
            id="content"
            value={note.content || ""}
          ></textarea>

          <label htmlFor="color">Choose Theme :</label>
          <div className={style.themeSelection}>
            {[
              { id: "red", value: "#ff5d51" },
              { id: "yellow", value: "#ffa000" },
              { id: "yellow2", value: "#ffc700" },
              { id: "green", value: "#87ff00" },
              { id: "skyblue", value: "#5182ff" },
              { id: "purple", value: "#7800ff" },
              { id: "cyan", value: "#00ffb3" },
              { id: "pink", value: "#ff5aa0" },
            ].map((color) => (
              <div key={color.id}>
                <input
                  type="radio"
                  name="background"
                  id={color.id}
                  onChange={handleChange}
                  value={color.value}
                  hidden
                />
                <label htmlFor={color.id} style={{ "--i": color.value }}></label>
              </div>
            ))}
          </div>

          <button type="submit">Update Form</button>
        </form>
      </div>
    </div>
  );
};

export default Update;
