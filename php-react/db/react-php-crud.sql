-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 19, 2024 at 07:00 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `react-php-crud`
--

-- --------------------------------------------------------

--
-- Table structure for table `course_registration`
--

CREATE TABLE `course_registration` (
  `registration_id` int(11) NOT NULL,
  `id` int(11) NOT NULL,
  `course_code` varchar(20) DEFAULT NULL,
  `course_name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `course_registration`
--

INSERT INTO `course_registration` (`registration_id`, `id`, `course_code`, `course_name`) VALUES
(1, 2, '05-2', 'การพัฒนาเว็บแอปพลิเคชัน'),
(2, 14, '123', '123'),
(3, 4, '07-034-233', 'การพัฒนาเว็บแอปพลิเคชัน'),
(4, 5, '07-034-233', 'การพัฒนาเว็บแอปพลิเคชัน'),
(5, 6, '07-034-233', 'การพัฒนาเว็บแอปพลิเคชัน'),
(6, 7, '07-034-233', 'การพัฒนาเว็บแอปพลิเคชัน'),
(7, 9, '07-034-233', 'การพัฒนาเว็บแอปพลิเคชัน\r\n'),
(10, 10, '07-034-233', 'การพัฒนาเว็บแอปพลิเคชัน');

-- --------------------------------------------------------

--
-- Table structure for table `teachers`
--

CREATE TABLE `teachers` (
  `id` int(11) NOT NULL,
  `teacher_ID` varchar(50) NOT NULL,
  `teacher_email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `teachers`
--

INSERT INTO `teachers` (`id`, `teacher_ID`, `teacher_email`, `password`, `name`, `created_at`) VALUES
(1, '123321', 'teacher@pnu.ac.th', '123321', 'อาจารย์', '2024-10-19 07:37:37');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `student_ID` text NOT NULL,
  `user_name` text NOT NULL,
  `user_email` text NOT NULL,
  `user_address` text NOT NULL,
  `profile_picture` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `student_ID`, `user_name`, `user_email`, `user_address`, `profile_picture`) VALUES
(1, '6460506001', 'Test1', 't1@pnu.ac.th', 'Nara', '6713589d9aa5d.png'),
(2, '6460506002', 'Test2', 't2@pnu.ac.th', 'Nara', '671358b6464fc.png'),
(3, '6460506009', 'Tes3', 't3@pnu.ac.th', 'Yala', '671358dbb67fd.png'),
(4, '6460506012', 'Nikkamal', '6460506012@pnu.ac.th', 'Ba Cho', '6713591e58b4b.jpg'),
(5, '6460506015', 'Suriiina', '6460506015@pnu.ac.th', 'Yaring', '6713593bdbb59.png'),
(6, '6460506021', 'Fadil', '6460506021@pnu.ac.th', 'Cho-airong', '671359aec005b.jpg'),
(7, '6460506023', 'Saiful', '6460506023@pnu.ac.th', 'Yi-ngo', '671359e45d3cf.webp'),
(8, '6460506025', 'Test4', 't4@pnu.ac.th', 'Pattani', '67135a1479e9a.png'),
(9, '6460506031', 'Saruwal', '6460506031@pnu.ac.th', 'Jarang', '67135a3f458ed.png'),
(10, '6460506032', 'Faten', '6460506032@pnu.ac.th', 'Dusun-nyor', '67135a959307a.png');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `course_registration`
--
ALTER TABLE `course_registration`
  ADD PRIMARY KEY (`registration_id`);

--
-- Indexes for table `teachers`
--
ALTER TABLE `teachers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `teacher_ID` (`teacher_ID`),
  ADD UNIQUE KEY `teacher_email` (`teacher_email`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `course_registration`
--
ALTER TABLE `course_registration`
  MODIFY `registration_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `teachers`
--
ALTER TABLE `teachers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
