import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar - Fixed Width */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="pl-64">
        <Header />
        
        {/* Page Content - Adjusted for Header height */}
        <main className="pt-24 px-8 pb-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;