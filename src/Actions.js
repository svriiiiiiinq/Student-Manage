import { useEffect, useState } from "react";

export const Actions = () => {
  const [users, setUsers] = useState([]);
  const [userLength, setUserLength] = useState(null);

  useEffect(() => {
    fetch("http://localhost/php-react/all-users.php")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUsers(data.users.reverse());
          setUserLength(true);
        } else {
          setUserLength(0);
        }
      })
      .catch((err) => {
        console.error(err);
        setUserLength(0); // Set to 0 on error
      });
  }, []);

  const insertUser = (newUser) => {
    // สร้าง FormData และเพิ่มข้อมูลลงไป
    const formData = new FormData();
    formData.append("student_ID", newUser.student_ID);
    formData.append("user_name", newUser.user_name);
    formData.append("user_email", newUser.user_email);
    formData.append("user_address", newUser.user_address);
    if (newUser.profile_picture) {
      formData.append("profile_picture", newUser.profile_picture);
    }

    fetch("http://localhost/php-react/add-user.php", {
      method: "POST",
      body: formData, // ส่ง FormData แทน JSON
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.id) {
          setUsers((prevUsers) => [
            { id: data.id, ...newUser, profile_picture_url: data.profile_picture_url }, // รับ URL จากเซิร์ฟเวอร์
            ...prevUsers,
          ]);
          setUserLength(true);
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const editMode = (id) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id
          ? { ...user, isEditing: true }
          : { ...user, isEditing: false }
      )
    );
  };

  const cancelEdit = (id) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, isEditing: false } : user
      )
    );
  };

  const updateUser = (userData) => {
    // สร้าง FormData สำหรับการอัปเดตข้อมูล
    const formData = new FormData();
    formData.append("id", userData.id);
    formData.append("student_ID", userData.student_ID);
    formData.append("user_name", userData.user_name);
    formData.append("user_email", userData.user_email);
    formData.append("user_address", userData.user_address);
    if (userData.profile_picture instanceof File) {
      formData.append("profile_picture", userData.profile_picture);
    }

    fetch("http://localhost/php-react/update-user.php", {
      method: "POST",
      body: formData, // ส่ง FormData แทน JSON
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user.id === userData.id
                ? {
                    ...user,
                    isEditing: false,
                    student_ID: userData.student_ID,
                    user_name: userData.user_name,
                    user_email: userData.user_email,
                    user_address: userData.user_address,
                    profile_picture_url: data.profile_picture_url || user.profile_picture_url, // รับ URL จากเซิร์ฟเวอร์
                  }
                : user
            )
          );
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const deleteUser = (theID) => {
    fetch("http://localhost/php-react/delete-user.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: theID }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUsers((prevUsers) =>
            prevUsers.filter((user) => user.id !== theID)
          );
          if (users.length === 1) {
            setUserLength(0);
          }
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return {
    users,
    editMode,
    cancelEdit,
    updateUser,
    insertUser,
    deleteUser,
    userLength,
  };
};