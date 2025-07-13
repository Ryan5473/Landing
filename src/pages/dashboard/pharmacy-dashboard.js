

import Navbar from "../../components/navbar";
import Sidebarph from "../../components/sidebarph";

import AdminFooter from "../../components/dashboard/adminFooter";
import ScrollTop from "../../components/scrollTop";


export default function DashPh() {
  return (
    <>
      <Navbar navDark={true} manuClass="navigation-menu nav-left" containerClass="container-fluid" />
      <section className="bg-dashboard">
        <div className="container-fluid">
          <div className="row">
            <Sidebarph colClass="col-xl-3 col-lg-4 col-md-5 col-12" />

            {/* Main dashboard content area */}
            <main className="col-xl-9 col-lg-8 col-md-7 col-12">
              {/* You can add dashboard components here */}
              {/* Example: */}
              {/* <Chart /> */}
              {/* <ReviewOne /> */}
            </main>
          </div> {/* end div.row */}
        </div> {/* end div.container-fluid */}
      </section> {/* end section.bg-dashboard */}

      <AdminFooter />
      <ScrollTop />
    </>
  );
}
