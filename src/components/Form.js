import { useState, useContext } from "react";
import { AppContext } from "../Context";

const Form = () => {
  const { insertUser } = useContext(AppContext);
  const [newUser, setNewUser] = useState({});
  const [preview, setPreview] = useState(null);

  // Storing the Insert User Form Data.
  const addNewUser = (e, field) => {
    if (field === "profile_picture") {
      const file = e.target.files[0];
      setNewUser((prevState) => ({
        ...prevState,
        [field]: file,
      }));
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result); // ตั้งค่าพรีวิวของรูปภาพ
        };
        reader.readAsDataURL(file);
      } else {
        setPreview(null);
      }
    } else {
      setNewUser((prevState) => ({
        ...prevState,
        [field]: e.target.value,
      }));
    }
  };

  // Inserting a new user into the Database.
  const submitUser = (e) => {
    e.preventDefault();

    // ตรวจสอบว่าฟิลด์ทั้งหมดถูกกรอก
    if (!newUser.student_ID || !newUser.user_name || !newUser.user_email || !newUser.profile_picture) {
      alert("Please fill all the required fields!");
      return;
    }

    insertUser(newUser);
    e.target.reset();
    setPreview(null); // รีเซ็ตพรีวิวหลังจากส่งฟอร์ม
  };

  return (
    <form className="insertForm" onSubmit={submitUser}>
      <h2>Insert User</h2>

      <label htmlFor="_name">Student_ID</label>
      <input
        type="text"
        id="_name"
        onChange={(e) => addNewUser(e, "student_ID")}
        placeholder="Enter Student_ID"
        autoComplete="off"
        required
      />

      <label htmlFor="_name">Name</label>
      <input
        type="text"
        id="_name"
        onChange={(e) => addNewUser(e, "user_name")}
        placeholder="Enter name"
        autoComplete="off"
        required
      />

      <label htmlFor="_email">Email</label>
      <input
        type="email"
        id="_email"
        onChange={(e) => addNewUser(e, "user_email")}
        placeholder="Enter email"
        autoComplete="off"
        required
      />

<label htmlFor="_address">Address</label>
      <input
        type="address"
        id="_address"
        onChange={(e) => addNewUser(e, "user_address")}
        placeholder="Enter address"
        autoComplete="off"
        required
      />

      <label htmlFor="_profile-picture">Profile Image</label>
      <input
        type="file"
        id="_profile-picture"
        accept="image/*"
        onChange={(e) => addNewUser(e, "profile_picture")}
        required
      />
      {preview && (
        <img
        src={preview}
        alt="Profile Preview"
        style={{
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          marginTop: "10px",
          objectFit: "cover"
        }}
      />
      
      )}

      <input type="submit" value="Insert" />
    </form>
  );
};

export default Form;