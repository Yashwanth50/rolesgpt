// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import ToggleSwitch from './../sidebar/ToggleSwitch';

// // Define styles as inline objects for simplicity
// const styles = {
//   dashboardContainer: {
//     display: 'flex',
//     flexDirection: 'column',
//     height: '100vh',
//   } as React.CSSProperties,
//   navbar: {
//     height: '60px',
//     backgroundColor: '#333',
//     color: 'white',
//     display: 'flex',
//     alignItems: 'center',
//     padding: '0 1rem',
//   } as React.CSSProperties,
//   mainContent: {
//     display: 'flex',
//     flex: 1,
//   } as React.CSSProperties,
//   sidebar: {
//     width: '200px',
//     backgroundColor: '#f4f4f4',
//     padding: '1rem',
//   } as React.CSSProperties,
//   pageContent: {
//     flex: 1,
//     padding: '1rem',
//     overflowY: 'auto',
//   } as React.CSSProperties,
// };

// // Define pages to render in content area
// const Home: React.FC = () => <div>Welcome to the Dashboard!</div>;
// const Profile: React.FC = () => <div>Your Profile Information</div>;
// const Settings: React.FC = () => <div>Settings Page</div>;

// const Dashboard: React.FC = () => {
//   return (
//       <div style={styles.dashboardContainer}>
//         {/* Navbar */}
//         <nav style={styles.navbar}>
//           <div className="flex gap-2 mb-10 border h-11 border-gray-200 rounded-md p-1">
//       <button
//         // onClick={() => handleTabChange("Personal")}
//         className={`w-full h-9
//             bg-blue-100 text-text_primary rounded-md
//         flex justify-center items-center `}
//       >
//         Personal
//       </button>
//       <button
//         // onClick={() => handleTabChange("Enterprise")}
//         className={`w-full h-9
//             bg-blue-100 text-blue-400 rounded-md
//          flex justify-center items-center `}
//       >
//         Enterprise
//       </button>
//     </div>
//         </nav>

//         {/* Main Content Area */}
//         <div style={styles.mainContent}>
//           {/* Page Content */}
//           <div style={styles.pageContent}>
//             <Routes>
//               <Route path="/" element={<Home />} />
//               <Route path="/profile" element={<Profile />} />
//               <Route path="/settings" element={<Settings />} />
//             </Routes>
//           </div>
//         </div>
//       </div>
//   );
// };

// export default Dashboard;