import React, { useContext, useState } from 'react';
import { AppContext } from '../Context';


const UserList = () => {
    const {
        users,
        userLength,
        editMode,
        cancelEdit,
        updateUser,
        deleteUser,
    } = useContext(AppContext);

    const [newData, setNewData] = useState({});
    const [preview, setPreview] = useState(null);

    const saveBtn = () => {
        updateUser(newData);
    };

    const updateNewData = (e, key) => {
        if (key === "profile_picture") {
            if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.onloadend = () => {
                    setNewData(prevData => ({
                        ...prevData,
                        [key]: file, // เก็บไฟล์แทนที่จะเป็น Data URL
                    }));
                    setPreview(reader.result); // อัปเดตพรีวิว
                };
                reader.readAsDataURL(file);
            } else {
                // หากใช้ URL ของภาพ
                setNewData(prevData => ({
                    ...prevData,
                    [key]: e.target.value,
                }));
                setPreview(e.target.value); // อัปเดตพรีวิวจาก URL
            }
        } else {
            setNewData(prevData => ({
                ...prevData,
                [key]: e.target.value,
            }));
        }
    };

    const enableEdit = (id, profile_picture, student_ID, user_name, user_email , user_address) => {
        setNewData({ id, profile_picture, student_ID, user_name, user_email , user_address});
        // ตรวจสอบว่าเป็น URL หรือไม่
        const isUrl = profile_picture.startsWith('http');
        setPreview(isUrl ? profile_picture : `http://localhost/php-react/uploads/${profile_picture}`);
        editMode(id);
    };

    const deleteConfirm = (id) => {
        if (window.confirm("Are you sure?")) {
            deleteUser(id);
        }
    };

    return !userLength ? (
        <p style={{ textAlign: 'center', marginTop: '20px' }}>{userLength === null ? "Loading..." : "Please Insert Some Users"}</p>
    ) : (
        <table>
            <thead>
                <tr>
                    <th>Avatar</th>
                    <th>Student ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {users.map(({ id, profile_picture, student_ID, user_name, user_email,user_address, isEditing }) => (
                    isEditing ? (
                        <tr key={id}>
                            <td>
                                <input
                                    type="file"
                                    onChange={(e) => updateNewData(e, "profile_picture")}
                                />
                                {preview && (
                                    <img
                                        src={preview}
                                        alt="Profile Preview"
                                        style={{ width: '100px', height: '100px', marginTop: '10px' }}
                                    />
                                )}
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={newData.student_ID || student_ID}
                                    onChange={(e) => updateNewData(e, "student_ID")}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={newData.user_name || user_name}
                                    onChange={(e) => updateNewData(e, "user_name")}
                                />
                            </td>
                            <td>
                                <input
                                    type="email"
                                    value={newData.user_email || user_email}
                                    onChange={(e) => updateNewData(e, "user_email")}
                                />
                            </td>
                            <td>
                                <input
                                    type="address"
                                    value={newData.user_address || user_address}
                                    onChange={(e) => updateNewData(e, "user_address")}
                                />
                            </td>
                            <td>
                            <button className="btn btn-success" onClick={saveBtn}>
    Save
</button>
<button className="btn btn-warning" onClick={() => cancelEdit(id)}>
    Cancel
</button>

                            </td>
                        </tr>
                    ) : (
                        <tr key={id}>
                            <td>
                                {profile_picture ? (
                                   <img
                                   src={`http://localhost/php-react/uploads/${profile_picture}`}
                                   alt="User Profile"
                                   style={{
                                     width: '50px',
                                     height: '50px',
                                     borderRadius: '50%',
                                     objectFit: 'cover'
                                   }}
                                 />
                                 
                                ) : (
                                    "No Image"
                                )}
                            </td>
                            <td>{student_ID}</td>
                            <td>{user_name}</td>
                            <td>{user_email}</td>
                            <td>{user_address}</td>
                            <td>
                            <button
                                    className="btn btn-secondary edit-btn" // เปลี่ยนเป็น btn-secondary
                                     onClick={() =>
                                      enableEdit(id, profile_picture, student_ID, user_name, user_email, user_address)
    }
>
                                     Edit
</button>

                                <button
                                    className="btn  btn-danger delete-btn"
                                    onClick={() => deleteConfirm(id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    )
                ))}
            </tbody>
        </table>
    );
};

export default UserList;