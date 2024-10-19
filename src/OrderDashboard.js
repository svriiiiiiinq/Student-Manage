import React, { useState, useEffect } from 'react';

const CourseRegistrationDashboard = () => {
  const [registrations, setRegistrations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetch('http://localhost/php-react/show-query.php') // URL ที่จะดึงข้อมูล
      .then(response => {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          return response.json();
        } else {
          throw new Error("Oops, we haven't got JSON!");
        }
      })
      .then(data => {
        // ตรวจสอบรูปแบบข้อมูลที่ได้รับ
        if (data.success === 1 && Array.isArray(data.registrations)) {
          setRegistrations(data.registrations);
        } else {
          throw new Error('Received data is not in expected format');
        }
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">นักศึกษาที่ลงทะเบียนเรียนรหัสรายวิชา 07-035-233</h2>
      {registrations.length > 0 ? (
        <table className="styled-table">
          <thead>
            <tr>
              <th>Profile Picture</th>
              <th>Student ID</th>
              <th>User Name</th>
              <th>Course Code</th>
              <th>Course Name</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((registration, index) => (
              <tr key={index} className="table-row">
                <td>
                  <img 
                    src={`http://localhost/php-react/uploads/${registration.profile_picture}`} 
                    alt="Profile" 
                    className="profile-pic"
                  />
                </td>
                <td>{registration.student_ID}</td>
                <td>{registration.user_name}</td>
                <td>{registration.course_code}</td>
                <td>{registration.course_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="no-data">No registrations found</div>
      )}
    </div>
  );
};

export default CourseRegistrationDashboard;
