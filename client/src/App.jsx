import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register';
import OwnerDashboard from './pages/Owner/Dashboard';
import TenantDashboard from './pages/Tenant/Dashboard';
import TenantAnnouncements from './pages/Tenant/Announcement';
import TenantComplaints from './pages/Tenant/Complaint';
import TenantRoomDetails from './pages/Tenant/RoomDetail';
import FoodPoll from './pages/Tenant/FoodPoll';
import ProfileSettings from './pages/Tenant/ProfileSetting';
import RaiseComplaint from './pages/Tenant/RaiseComplaint';
import OwnerRoomManagement from './pages/Owner/RoomManagement';
import OwnerAnnouncementManagement from './pages/Owner/Announcement';
import OwnerComplaintManagement from './pages/Owner/ComplaintManagement';
import OwnerProfileSettings from './pages/Owner/ProfileSetting';
import FoodPollResults from './pages/Owner/FoodPoll';
import OwnerTenantManagement from './pages/Owner/TenantManagement';
import FacilityManagement from './pages/Owner/Facility';
import StaffDashboard from './pages/Staff/Dashboard';
import UpdateFacilities from './pages/Staff/Facility';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login/>}/>
        <Route  path="/register" element={<Register/>}/>
        {/*Owner */}
        <Route path='/owner-dashboard' element={<OwnerDashboard/>}/>
        <Route path='/owner-dashboard/rooms' element={<OwnerRoomManagement/>}/>
        <Route path="/owner-dashboard/announcements" element={<OwnerAnnouncementManagement />} />
        <Route path="/owner-dashboard/complaints" element={<OwnerComplaintManagement />} />
        <Route path="/owner-dashboard/foodpoll" element={<FoodPollResults />} />
        <Route path="/owner-dashboard/profile" element={<OwnerProfileSettings />} />
        <Route path="/owner-dashboard/tenants" element={<OwnerTenantManagement/>}/>
        <Route path="/owner-dashboard/facilities" element={<FacilityManagement/>}/>
        {/*Tenant */}
        <Route path="/tenant-dashboard" element={<TenantDashboard/>}/>
        <Route path="/tenant-dashboard/room" element={<TenantRoomDetails />} />
        <Route path="/tenant-dashboard/complaints/:id" element={<TenantComplaints />} />
        <Route path="/tenant-dashboard/announcements" element={<TenantAnnouncements />} />
        <Route path="/tenant-dashboard/foodpoll" element={<FoodPoll />} />
        <Route path="/tenant-dashboard/profile/:id" element={<ProfileSettings />} />
        <Route path="/tenant-dashboard/newComplaint" element={<RaiseComplaint />} />        
        {/*Staff */}
        <Route path='/staff-dashboard/' element={<StaffDashboard/>}/>
        <Route path="/staff-dashboard/announcements" element={<TenantAnnouncements />} />
        <Route path='/staff-dashboard/facilities' element={<UpdateFacilities/>}/>
      </Routes>
    </Router>
  );
}

export default App;
